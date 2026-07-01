const fs = require('node:fs');
const path = require('node:path');
const express = require('express');
const { createProxyMiddleware, responseInterceptor } = require('http-proxy-middleware');

const rootDir = __dirname;
const app = express();
const staticOptions = {
  etag: false,
  maxAge: 0,
  setHeaders(res) {
    res.setHeader('Cache-Control', 'no-store');
  },
};

const port = Number(process.env.PORT || 3000);
const appTitle = process.env.APP_TITLE || '工作台';
const appDesc = process.env.APP_DESC || '';
const publicAssetOrigin = normalizeOrigin(process.env.PUBLIC_ASSET_ORIGIN || '');
const assetProxyOrigin = normalizeOrigin(process.env.ASSET_PROXY_ORIGIN || process.env.PUBLIC_ASSET_ORIGIN || '');
const mediaProxyOrigin = normalizeOrigin(process.env.MEDIA_PROXY_ORIGIN || '');
const mediaRewriteOrigins = parseOriginList(process.env.MEDIA_REWRITE_ORIGINS || mediaProxyOrigin);
const targetApiOrigin = normalizeOrigin(process.env.TARGET_API_ORIGIN || '');
const targetUploadOrigin = normalizeOrigin(process.env.TARGET_UPLOAD_ORIGIN || targetApiOrigin);
const loginPasswordOrigin = normalizeOrigin(process.env.LOGIN_PASSWORD_ORIGIN || '');
const loginTokenOrigin = normalizeOrigin(process.env.LOGIN_TOKEN_ORIGIN || targetApiOrigin);
const loginClientId = process.env.LOGIN_CLIENT_ID || 'pod';
const publicEntryPath = normalizePath(process.env.PUBLIC_ENTRY_PATH || '/workspace');
const internalDashboardPath = '/aiad/batch/dashboard';
const internalBatchPrefix = '/aiad/batch';
const loginRedirectPath = process.env.LOGIN_REDIRECT_PATH || publicEntryPath;
const loginSsoRedirectPath = process.env.LOGIN_SSO_REDIRECT_PATH || '/pod-permission';
const loginSsoState = process.env.LOGIN_SSO_STATE || 'redirectUri=/home';
const mediaProxyPath = '/__media/static';

const pageTemplate = fs.readFileSync(path.join(rootDir, 'page.html'), 'utf8');
const loginTemplate = fs.readFileSync(path.join(rootDir, 'login.html'), 'utf8');

app.disable('x-powered-by');
app.set('trust proxy', true);

app.get('/healthz', (_req, res) => {
  res.json({ ok: true });
});

app.get('/login', (_req, res) => {
  res.type('html').send(renderLogin());
});

app.use((req, res, next) => {
  if (!['GET', 'HEAD'].includes(req.method)) {
    next();
    return;
  }

  if (req.path === '/' || req.path === '') {
    res.redirect(302, publicEntryPath);
    return;
  }

  if (!req.path.startsWith('/aiad') && isPublicRuntimeRequest(req.path)) {
    next();
    return;
  }

  if (isPublicEntryRequest(req.path)) {
    next();
    return;
  }

  if (!req.path.startsWith('/aiad')) {
    if (req.path.includes('.')) {
      res.status(404).end();
      return;
    }

    res.redirect(302, publicEntryPath);
    return;
  }

  res.status(410).end();
});

function isPublicRuntimeRequest(requestPath) {
  return (
    requestPath === '/favicon.ico' ||
    requestPath === '/login' ||
    requestPath.startsWith('/__local/') ||
    requestPath === '/healthz' ||
    requestPath === '/app-config.js' ||
    requestPath.startsWith('/assets/') ||
    requestPath.startsWith('/iconfonts-v4.8.1/') ||
    requestPath.startsWith('/npm/') ||
    requestPath.startsWith('/public/') ||
    requestPath.startsWith('/__asset/static/') ||
    requestPath.startsWith('/__asset/static-dev/') ||
    requestPath.startsWith('/__media/static/') ||
    requestPath.startsWith('/api/') ||
    requestPath === '/api' ||
    requestPath.startsWith('/upload/') ||
    requestPath === '/upload'
  );
}

function isPublicEntryRequest(requestPath) {
  return requestPath === publicEntryPath || requestPath.startsWith(`${publicEntryPath}/`);
}

app.get('/app-config.js', (_req, res) => {
  const config = {
    VITE_GLOB_APP_TITLE: appTitle,
    VITE_GLOB_APP_SHORT_NAME: 'aiad_view',
    VITE_GLOB_API_URL: '/api',
    VITE_GLOB_UPLOAD_URL: '/upload',
    VITE_GLOB_API_URL_PREFIX: '',
  };

  res.type('application/javascript').send(
    `window.__PRODUCTION__AIAD_VIEW__CONF__=${JSON.stringify(config)};` +
      'Object.freeze(window.__PRODUCTION__AIAD_VIEW__CONF__);' +
      'Object.defineProperty(window,"__PRODUCTION__AIAD_VIEW__CONF__",{configurable:false,writable:false});'
  );
});

if (process.env.ENABLE_LOCAL_TOKEN_SETTER === '1') {
  app.get('/__local/set-token', (req, res) => {
    const token = typeof req.query.value === 'string' ? req.query.value : '';
    const redirect = typeof req.query.redirect === 'string' ? req.query.redirect : publicEntryPath;

    res.type('html').send(`<!doctype html>
<html>
  <head><meta charset="utf-8"><title>Setting token</title></head>
  <body>
    <script>
      localStorage.setItem('token', ${JSON.stringify(token)});
      localStorage.removeItem('__DEMO_AUTH_BYPASS__');
      location.replace(${JSON.stringify(redirect)});
    </script>
  </body>
</html>`);
  });
}

app.use(
  '/assets',
  express.static(path.join(rootDir, 'assets'), {
    ...staticOptions,
    fallthrough: false,
  })
);

app.get('/favicon.ico', (_req, res) => {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.status(204).end();
});
app.use('/iconfonts-v4.8.1', express.static(path.join(rootDir, 'iconfonts-v4.8.1'), { immutable: true, maxAge: '1y', fallthrough: true }));
app.use('/npm', express.static(path.join(rootDir, 'npm'), { immutable: true, maxAge: '1y', fallthrough: true }));
app.use('/public', express.static(path.join(rootDir, '__asset', 'static', 'public'), { immutable: true, maxAge: '1y', fallthrough: true }));
app.use('/__asset/static', express.static(path.join(rootDir, '__asset', 'static'), { immutable: true, maxAge: '1y', fallthrough: true }));
app.use('/__asset/static-dev', express.static(path.join(rootDir, '__asset', 'static-dev'), { immutable: true, maxAge: '1y', fallthrough: true }));

app.post('/__auth/login/password', express.json({ limit: '1mb' }), handlePasswordLogin);

if (mediaProxyOrigin) {
  app.use(
    mediaProxyPath,
    createProxyMiddleware({
      target: mediaProxyOrigin,
      changeOrigin: true,
      xfwd: true,
      secure: true,
      ws: false,
      preserveHeaderKeyCase: true,
      pathRewrite(path) {
        return path.replace(new RegExp(`^${escapeRegExp(mediaProxyPath)}`), '') || '/';
      },
      onProxyReq(proxyReq, req) {
        logProxyReq('media', req);
        setUpstreamBrowserHeaders(proxyReq, mediaProxyOrigin);
      },
      onProxyRes(proxyRes, req) {
        logProxyRes('media', proxyRes, req);
        onProxyRes(proxyRes);
      },
      onError: onProxyError('media'),
    })
  );
}

if (targetApiOrigin) {
  app.use('/api', createUpstreamProxy(targetApiOrigin, '/api'));
} else {
  app.use('/api', missingProxyTarget('TARGET_API_ORIGIN'));
}

if (targetUploadOrigin) {
  app.use('/upload', createUpstreamProxy(targetUploadOrigin, '/upload'));
} else {
  app.use('/upload', missingProxyTarget('TARGET_UPLOAD_ORIGIN'));
}

if (assetProxyOrigin) {
  app.use(
    ['/public', '/__asset/static', '/npm'],
    createProxyMiddleware({
      target: assetProxyOrigin,
      changeOrigin: true,
      xfwd: true,
      secure: true,
      ws: true,
      preserveHeaderKeyCase: true,
      onProxyReq(proxyReq, req) {
        logProxyReq('asset', req);
        setUpstreamBrowserHeaders(proxyReq, assetProxyOrigin);
      },
      pathRewrite(path) {
        return path.replace(/^\/__asset\/static/, '') || '/';
      },
      onProxyRes(proxyRes, req) {
        logProxyRes('asset', proxyRes, req);
        onProxyRes(proxyRes);
      },
      onError: onProxyError('asset'),
    })
  );
} else {
  app.use(['/public', '/__asset/static', '/npm'], missingProxyTarget('PUBLIC_ASSET_ORIGIN'));
}

app.get('*', (req, res, next) => {
  if (req.path.includes('.')) {
    next();
    return;
  }

  res.type('html').send(renderPage());
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found', path: req.path });
});

app.listen(port, () => {
  console.log(`frontend proxy listening on 0.0.0.0:${port}`);
});

function renderPage() {
  const assetOriginForHtml = publicAssetOrigin || '';
  return pageTemplate
    .replaceAll('__PUBLIC_ASSET_ORIGIN__', assetOriginForHtml)
    .replaceAll('__PUBLIC_ENTRY_PATH__', publicEntryPath)
    .replaceAll('__APP_TITLE__', escapeHtml(appTitle))
    .replaceAll('__APP_DESC__', escapeHtml(appDesc));
}

function renderLogin() {
  return loginTemplate
    .replaceAll('__PUBLIC_ENTRY_PATH__', publicEntryPath)
    .replaceAll('__APP_TITLE__', escapeHtml(appTitle));
}

function createUpstreamProxy(target, mountPath) {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    xfwd: true,
    secure: true,
    ws: true,
    selfHandleResponse: true,
    preserveHeaderKeyCase: true,
    pathRewrite: (_path, req) => req.originalUrl,
    onProxyReq(proxyReq, req) {
      logProxyReq('api', req);
      proxyReq.setHeader('x-forwarded-host', req.headers.host || '');
      setUpstreamBrowserHeaders(proxyReq, target);
    },
    onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
      logProxyRes('api', proxyRes, req);
      onProxyRes(proxyRes);
      rewriteRedirectLocation(proxyRes, target, mountPath);

      if (!shouldRewriteBody(proxyRes)) {
        return responseBuffer;
      }

      const body = responseBuffer.toString('utf8');
      const rewritten = rewriteMediaUrls(body);
      if (rewritten !== body) {
        res.setHeader('content-length', Buffer.byteLength(rewritten));
      }
      return rewritten;
    }),
    onError: onProxyError('api'),
  });
}

async function handlePasswordLogin(req, res) {
  if (!loginPasswordOrigin || !loginTokenOrigin) {
    res.status(502).json({ ok: false, message: 'Login upstream is not configured' });
    return;
  }

  const account = String(req.body?.account || '').trim();
  const password = String(req.body?.password || '');
  const mobileAreaCode = String(req.body?.mobileAreaCode || '86').trim();

  if (!account || !password) {
    res.status(400).json({ ok: false, message: 'account/password required' });
    return;
  }

  try {
    const authorizationCode = await requestAuthorizationCode({
      account,
      password,
      mobileAreaCode,
    });
    const token = await requestLoginToken(authorizationCode);

    res.json({
      ok: true,
      token: {
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        accessTokenExpireIn: token.accessTokenExpireIn,
        refreshTokenExpireIn: token.refreshTokenExpireIn,
        createdAt: Date.now(),
      },
    });
  } catch (error) {
    console.error(`[auth:error] ${error.message}`);
    res.status(error.statusCode || 502).json({
      ok: false,
      step: error.step || 'login',
      message: error.exposeMessage || 'Login upstream unavailable',
    });
  }
}

async function requestAuthorizationCode({ account, password, mobileAreaCode }) {
  const loginUrl = `${loginPasswordOrigin}/api/login/password`;
  const referer = buildLoginReferer();
  const result = await postJson(loginUrl, {
    clientId: loginClientId,
    mobileAreaCode,
    account,
    password,
  }, {
    origin: loginPasswordOrigin,
    referer,
    priority: 'u=1, i',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
  });

  const authorizationCode = result.json?.result?.authorizationCode;
  if (!authorizationCode) {
    throw createUpstreamError('sso-login', result);
  }
  return authorizationCode;
}

async function requestLoginToken(authorizationCode) {
  const result = await postJson(`${loginTokenOrigin}/api/uc/login/token`, {
    authorizationCode,
    clientId: loginClientId,
  }, {
    origin: loginTokenOrigin,
    referer: buildTokenReferer(),
    priority: 'u=1, i',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
  });

  const token = result.json?.result;
  if (!token?.accessToken || !token?.refreshToken) {
    throw createUpstreamError('token', result);
  }
  return token;
}

async function postJson(url, payload, headers = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      accept: 'application/json, text/plain, */*',
      'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-US;q=0.7',
      'content-type': 'application/json;charset=UTF-8',
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36',
      ...headers,
    },
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text.slice(0, 1000) };
  }

  return {
    ok: response.ok,
    status: response.status,
    json,
  };
}

function buildLoginReferer() {
  const redirectUri = `${loginTokenOrigin}${loginSsoRedirectPath}`;
  return `${loginPasswordOrigin}/?clientId=${encodeURIComponent(loginClientId)}&redirectUri=${encodeURIComponent(redirectUri)}&state=${encodeURIComponent(loginSsoState)}`;
}

function buildTokenReferer() {
  return `${loginTokenOrigin}${loginSsoRedirectPath}?state=${encodeURIComponent(loginSsoState)}`;
}

function normalizePath(value) {
  const input = String(value || '').trim();
  if (!input || input === '/') {
    return '/';
  }
  return `/${input.replace(/^\/+/, '').replace(/\/+$/, '')}`;
}

function createUpstreamError(step, result) {
  const error = new Error(`${step} failed with status ${result.status}`);
  error.step = step;
  error.statusCode = 502;
  error.exposeMessage = result.json?.message || result.json?.msg || 'Login upstream rejected the request';
  return error;
}

function setUpstreamBrowserHeaders(proxyReq, target) {
  proxyReq.setHeader('origin', target);
  proxyReq.setHeader('referer', `${target}/aiad/`);
}

function logProxyReq(kind, req) {
  console.log(`[proxy:req:${kind}] ${req.method} ${req.originalUrl}`);
}

function logProxyRes(kind, proxyRes, req) {
  console.log(`[proxy:res:${kind}] ${proxyRes.statusCode} ${req.method} ${req.originalUrl}`);
}

function onProxyError(kind) {
  return (err, req, res) => {
    console.error(`[proxy:error:${kind}] ${req.method} ${req.originalUrl} ${err.code || ''} ${err.message}`);
    if (!res.headersSent) {
      res.status(502).json({ error: 'Proxy upstream unavailable' });
    }
  };
}

function onProxyRes(proxyRes) {
  delete proxyRes.headers['x-powered-by'];
  delete proxyRes.headers.server;
  delete proxyRes.headers['x-aspnet-version'];
}

function rewriteRedirectLocation(proxyRes, target, mountPath) {
  const location = proxyRes.headers.location;
  if (!location || !location.startsWith(target)) {
    return;
  }

  proxyRes.headers.location = location.replace(target, mountPath);
}

function shouldRewriteBody(proxyRes) {
  const contentType = String(proxyRes.headers['content-type'] || '').toLowerCase();
  if (!contentType) {
    return false;
  }

  return (
    contentType.includes('application/json') ||
    contentType.includes('text/') ||
    contentType.includes('application/javascript')
  );
}

function rewriteMediaUrls(value) {
  let rewritten = String(value);
  for (const origin of mediaRewriteOrigins) {
    const normalized = normalizeOrigin(origin);
    if (!normalized) {
      continue;
    }

    rewritten = rewritten
      .replaceAll(`${normalized}/`, `${mediaProxyPath}/`)
      .replaceAll(`${normalized.replace(/^https:/, 'http:')}/`, `${mediaProxyPath}/`)
      .replaceAll(`${escapeJsonSlashes(normalized)}\\/`, `${mediaProxyPath}/`)
      .replaceAll(`${escapeJsonSlashes(normalized.replace(/^https:/, 'http:'))}\\/`, `${mediaProxyPath}/`)
      .replaceAll(`${escapeJsonSlashes(normalized, 2)}\\\\/`, `${mediaProxyPath}/`)
      .replaceAll(`${escapeJsonSlashes(normalized.replace(/^https:/, 'http:'), 2)}\\\\/`, `${mediaProxyPath}/`);
  }
  return rewritten;
}

function missingProxyTarget(envName) {
  return (_req, res) => {
    res.status(502).json({ error: `${envName} is not configured` });
  };
}

function normalizeOrigin(value) {
  return String(value || '').trim().replace(/\/+$/, '');
}

function parseOriginList(value) {
  return String(value || '')
    .split(',')
    .map(normalizeOrigin)
    .filter(Boolean);
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeJsonSlashes(value, depth = 1) {
  const slash = '\\'.repeat(depth) + '/';
  return String(value).replaceAll('/', slash);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
