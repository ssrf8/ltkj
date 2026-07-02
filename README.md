# Frontend Proxy Workspace

这是一个单端口 Node 前端代理项目，用于承载已经打包好的 SPA 静态文件，并把浏览器侧的业务请求代理到服务端配置的上游地址。

## 功能概览

- Node/Express 单服务部署，不依赖容器内 Nginx。
- `/workspace` 是公开访问入口。
- `/login` 是本地登录页。
- `/api/*` 和 `/upload/*` 由 Node 转发到环境变量中的上游服务。
- `/__media/static/*` 用于代理接口返回的媒体资源地址。
- `/assets/*`、`/iconfonts-v4.8.1/*`、`/npm/*` 提供本地静态产物。
- `/app-config.js` 动态输出前端运行配置，把 API 和上传地址固定为同源路径。
- `/favicon.ico` 和 `/favicon.svg` 使用本地 SVG 图标。

## 目录结构

```text
.
├── assets/                 # 前端打包后的 JS/CSS chunk
├── iconfonts-v4.8.1/       # 图标字体资源
├── npm/                    # ONNX runtime 等前端运行依赖
├── server.js               # Express 服务、代理、登录桥接、响应改写
├── page.html               # SPA HTML 模板和公开路由映射脚本
├── login.html              # 本地登录页
├── favicon.svg             # 本地浏览器标签图标
├── Dockerfile              # 容器构建文件
├── DEPLOYMENT.md           # 部署示例
├── .env.example            # 环境变量模板
└── AGENT_HANDOFF.md        # 后续 agent 接手说明
```

## 环境变量

```env
PORT=3000
APP_TITLE=工作台
APP_DESC=
PUBLIC_ENTRY_PATH=/workspace
PUBLIC_ASSET_ORIGIN=
ASSET_PROXY_ORIGIN=https://your-asset-proxy.example
MEDIA_PROXY_ORIGIN=https://your-media-origin.example
MEDIA_REWRITE_ORIGINS=https://your-media-origin.example
TARGET_API_ORIGIN=https://your-api-origin.example
TARGET_UPLOAD_ORIGIN=https://your-upload-origin.example
LOGIN_PASSWORD_ORIGIN=https://your-sso-login-origin.example
LOGIN_TOKEN_ORIGIN=https://your-api-origin.example
LOGIN_CLIENT_ID=pod
LOGIN_REDIRECT_PATH=/workspace
LOGIN_SSO_REDIRECT_PATH=/pod-permission
LOGIN_SSO_STATE=redirectUri=/home
AUTH_DEBUG=0
```

说明：

- `PUBLIC_ENTRY_PATH` 是对外可见入口，默认 `/workspace`。
- `TARGET_API_ORIGIN` 是 `/api/*` 的上游目标。
- `TARGET_UPLOAD_ORIGIN` 是 `/upload/*` 的上游目标，默认可与 API 相同。
- `ASSET_PROXY_ORIGIN` 负责代理公开静态资源。
- `MEDIA_PROXY_ORIGIN` 和 `MEDIA_REWRITE_ORIGINS` 负责把接口返回里的媒体源地址改写为同源代理路径。
- `LOGIN_PASSWORD_ORIGIN` 是账号密码登录接口上游。
- `LOGIN_TOKEN_ORIGIN` 是授权码换 token 的接口上游。
- `AUTH_DEBUG=1` 会在登录页和工作台页的浏览器控制台输出登录态诊断信息。它只输出 token 是否存在、长度、过期剩余时间、当前路径和 localStorage 可写状态，不输出 token 原文。生产排查完建议恢复为 `0`。

## 本地运行

```powershell
npm install
$env:PORT="4317"
$env:PUBLIC_ENTRY_PATH="/workspace"
$env:TARGET_API_ORIGIN="https://your-api-origin.example"
$env:TARGET_UPLOAD_ORIGIN="https://your-upload-origin.example"
$env:ASSET_PROXY_ORIGIN="https://your-asset-proxy.example"
$env:MEDIA_PROXY_ORIGIN="https://your-media-origin.example"
$env:MEDIA_REWRITE_ORIGINS="https://your-media-origin.example"
$env:LOGIN_PASSWORD_ORIGIN="https://your-sso-login-origin.example"
$env:LOGIN_TOKEN_ORIGIN="https://your-api-origin.example"
npm start
```

访问：

- `http://127.0.0.1:4317/login`
- `http://127.0.0.1:4317/workspace`
- `http://127.0.0.1:4317/healthz`

## 容器部署

```bash
docker build -t frontend-proxy .
docker run -d --name frontend-proxy --env-file .env -p 3000:3000 frontend-proxy
```

把你的前端域名反向代理到容器端口即可。浏览器侧应该只看到前端域名下的 `/workspace`、`/api/*`、`/upload/*`、`/__media/static/*` 等路径。

## 注意事项

- 不要提交真实 token、账号、密码、上游密钥。
- `assets/` 是打包产物，不是源码；修改时要小范围、先备份、再做语法检查。
- 只做路由映射不能隐藏 JS 包里的原始路由字符串；如果需要下载 JS 后也不可见，需要静态修改主路由表。
- 404 页面已做简化，加载后会清理外层移动端布局，只保留 `404` 和 `返回` 按钮。
