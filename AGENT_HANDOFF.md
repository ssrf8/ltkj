# Agent Handoff Guide

本文档给后续接手的 agent 使用。目标是让新窗口 agent 读完后能理解项目状态、约束、风险点和推荐工作流。

## 1. 项目目标

本项目是一个已经清理过的前端静态包代理部署项目。核心目标：

- 用一个 Node 服务同时承载 SPA 页面、静态 JS/CSS、登录页、API 代理和上传代理。
- 浏览器只访问公开前端域名和同源路径。
- 真实 API、上传、资源、媒体等上游地址只配置在服务端环境变量中。
- 前端公开入口统一为 `/workspace`。
- 内部 SPA 原始入口和路由通过 `page.html` 的映射脚本桥接到原包需要的内部路径。
- 逐步清理打包 JS 中的可见品牌、外链、资源 hash、移动端冗余入口和不需要的页面入口。

## 2. 当前重要文件

### `server.js`

Express 主服务。包含：

- 静态资源服务：
  - `/assets/*`
  - `/iconfonts-v4.8.1/*`
  - `/npm/*`
  - `/favicon.ico`
  - `/favicon.svg`
- 页面服务：
  - `/login`
  - `/workspace`
  - SPA fallback
- 动态配置：
  - `/app-config.js`
- 代理：
  - `/api/*`
  - `/upload/*`
  - `/__media/static/*`
  - `/public/*`
  - `/__asset/static/*`
- 登录桥接：
  - `POST /__auth/login/password`
- 响应处理：
  - 删除部分暴露上游信息的响应头。
  - 改写 redirect location。
  - 改写 JSON/text/javascript 中的媒体 URL。

### `page.html`

SPA HTML 模板。关键逻辑：

- 加载 `/app-config.js`。
- 设置 favicon 为 `/favicon.svg`。
- 设置 `window.__PUBLIC_ROUTE_TO_INTERNAL__`。
- 把公开路径 `/workspace` 映射到内部 `/aiad/batch/dashboard`。
- 把 `/workspace/<suffix>` 映射到内部 `/aiad/batch/<suffix>`。
- 拦截 `history.pushState` 和 `history.replaceState`，把内部地址重新显示为公开地址。
- 无 token 时跳转 `/login?redirect=...`。

注意：这个路由映射只影响浏览器地址栏和运行时路由解析，不会删除主 JS 包中的原始路由字符串。

### `login.html`

本地登录页。调用 `POST /__auth/login/password`，成功后把 token JSON 写入 `localStorage.token`，然后跳转到配置的公开入口。

不要把真实账号、密码、token 写进仓库。

### `assets/index.24626119.js`

主前端包。包含 Vue、路由表、公共 store、运行时初始化等大量逻辑。

已知事实：

- 该文件仍包含大量前端路由字符串。
- 曾做过局部静态修改，需谨慎。
- 修改后必须跑 `node --check assets/index.24626119.js`。

### `assets/Exception.f9d43104.js`

404 页面 chunk。当前状态：

- 只渲染 `404` 和 `返回` 按钮。
- 挂载时给 `body` 加 `simple-404-page`。
- 使用通用 DOM 清理逻辑，只保留 `.simple-404` 节点到 `#app` 的祖先链。
- 使用 `MutationObserver` 持续清理后续异步插入的移动端 header/footer/tabbar。
- 不再包含移动端 header/footer/tabbar 的具体 class、备案文案、图片 hash。

### `assets/Exception.3468cdc2.css`

404 页面样式。当前状态：

- 只包含通用 404 页面样式。
- 不包含原始 Ant Result 图标、品牌插图、备案文案、移动端布局类名。

### `favicon.svg`

本地图标，用于浏览器标签页。不依赖外部资源。

### `Dockerfile`

容器构建：

- `node:20-alpine`
- `npm ci --omit=dev`
- 复制 `server.js`、`page.html`、`login.html`、`favicon.svg`
- 复制 `assets/`、`iconfonts-v4.8.1/`、`npm/`

### `.dockerignore`

当前排除了：

- `node_modules`
- 开发日志
- 抓取和分析中间文件
- 文档类 `*.md`

注意：`*.md` 不进入镜像，但仍会进入 Git 仓库。

## 3. 当前公开路由策略

公开入口：

```text
/workspace
```

内部映射：

```text
/workspace                  -> /aiad/batch/dashboard
/workspace/upscale          -> /aiad/batch/upscale
/workspace/image-search     -> /aiad/batch/image-search
/workspace/<suffix>         -> /aiad/batch/<suffix>
```

服务端阻断：

- 直接访问 `/aiad*` 返回 `410` 或重定向，不作为公开入口。
- 非公开路径无扩展名时重定向到 `/workspace`。
- 带扩展名且非允许运行资源时返回 `404`。

## 4. 当前静态包路由暴露状态

重要：只做 `page.html` 映射时，别人下载 JS 包仍能看到原始路由。

最近一次提取到主包中约 196 个 `path`，包括：

```text
/batch
/batch/dashboard
/batch/upscale
/batch/image-search
/batch/crawling
/batch/tk-video
/discovery
/creation
/mine
/login
...
```

如果目标是“下载 JS 后也看不到原始路由”，需要静态修改主路由表，而不是只做运行时映射。

推荐路线：

1. 先导出完整路由表。
2. 制定公开路由到内部 chunk 的映射表。
3. 批量替换主包中的 `path:"/batch/..."` 为中性路径。
4. 同步更新 `page.html` 中的 public/internal 映射。
5. 检查动态 import chunk 路径是否仍可加载。
6. 测试核心页面：
   - `/workspace`
   - `/workspace/upscale`
   - `/workspace/image-search`
   - `/workspace/crawling`
   - 404 页面
   - 登录流程

## 5. 移动端相关静态位置

最近一次扫描命中：

```text
assets/index.01d9f5df.js
  - 移动端 footer
  - 备案链接和备案文案

assets/index.052909a4.js
  - 移动端 header
  - 移动端 tabbar
  - mobile-header
  - 首页/创作/我的
  - 若干移动端图标资源 hash

assets/index.0c08461a.css
  - 移动端 tabbar class

assets/index.986e2e77.css
  - FooterMobile class

assets/index.24626119.js
  - safe-area-inset-bottom

assets/index.484c8fe4.css
  - safe-area-inset-bottom
```

处理方案：

### 方案 A：只处理 404

当前已实施。风险最低，不影响正常移动端页面。

### 方案 B：全局删除移动端 header/footer/tabbar

可把对应组件的 render/setup 输出改为空值或空数组。

优点：

- 下载 JS 包后相关文案、链接和资源 hash 可减少。
- 移动端页面不会显示头部、底部导航和备案 footer。

风险：

- 移动端正常工作台可能失去导航。
- 可能影响用户菜单、页面切换和某些布局高度。

### 方案 C：保留组件空壳，清空敏感内容

只替换文字、链接、图片 hash 为空字符串或中性资源。

优点：

- 比全删风险低。
- 页面结构仍在。

风险：

- JS 包里仍可看到组件结构和部分 class。
- 仍需逐个静态扫描确认。

## 6. 环境变量语义

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

不要把真实值写入文档或提交。真实域名只放服务端部署环境变量。
排查个别电脑登录后循环刷新时，可以临时设置 `AUTH_DEBUG=1`，它会在浏览器控制台输出脱敏登录态诊断信息，不输出 token 原文；排查结束后改回 `0`。

## 7. 常用验证命令

语法检查：

```powershell
node --check server.js
node --check assets\Exception.f9d43104.js
node --check assets\index.24626119.js
```

静态扫描敏感词：

```powershell
rg -n "ipoddy|lingvisions|static\.lingvisions|sso\.lingvisions|shruil|feishu|chromewebstore|闽公网|网信算备|合作货盘|购买套餐|智能客服" . -g "*.js" -g "*.html" -g "*.css" -g "*.json" -g "!node_modules/**"
```

移动端相关扫描：

```powershell
rg -n "FooterMobile|mobile-header|safe-area-inset-bottom|首页|创作|我的|闽公网|网信算备|beian" assets -g "*.js" -g "*.css"
```

路由提取：

```powershell
@'
const fs = require('fs');
const text = fs.readFileSync('assets/index.24626119.js','utf8');
const paths = [...new Set([...text.matchAll(/path:\"([^\"]+)\"/g)].map(m => m[1]))];
console.log(paths.join('\n'));
'@ | node -
```

本地启动：

```powershell
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

## 8. 修改静态 JS 的规则

- 先定位，后替换。
- 每次只改少量 chunk。
- 改完必须跑 `node --check`。
- 对路由表、公共 store、登录逻辑、API 包装器要非常谨慎。
- 不要做全局中文替换，之前大范围替换中文曾导致 chunk 语法损坏。
- 不要把测试 token 写入文件。
- 不要提交本地日志、抓取原始 HTML、分析中间文件。
- 不要长期打开 `AUTH_DEBUG=1`，它只用于临时排查浏览器本地登录态问题。

## 9. Git 状态

当前主分支为 `main`，远端为：

```text
https://github.com/ssrf8/ltkj.git
```

最近重要提交：

- `4983c44 Keep 404 page stripped after mobile layout render`
- `4e9c965 Make 404 layout cleanup generic`
- `2cd2622 Strip layout chrome from 404 page`
- `e610d84 Simplify 404 page`
- `7a0bf01 Prevent visible internal route during startup`
- `9303875 Expose workspace entry path`

## 10. 建议后续任务顺序

1. 先决定是否全局删除移动端 header/footer/tabbar。
2. 如果删除，优先处理 `assets/index.01d9f5df.js` 和 `assets/index.052909a4.js`。
3. 再处理 CSS 中残留的移动端 class。
4. 决定是否静态重写主路由表。
5. 路由重写后必须浏览器验证核心页面。
6. 最后再做全仓敏感词扫描。

## 11. 当前风险和限制

- 原始前端源码不存在，当前是在打包产物上做定点修改。
- 静态包中仍可能有未访问页面的旧文案或 class。
- 只依靠路由映射不能隐藏下载 JS 后的路由字符串。
- API 响应体中若出现新媒体域名，需要补充 `MEDIA_REWRITE_ORIGINS`。
- 完整登录态 Cookie Domain/SameSite 闭环未做，只做账号密码登录桥接和 token 写入。
