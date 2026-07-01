# Container Deployment

This project runs as a single Node service. Put your public frontend domain in
front of the container port, and keep all upstream origins in environment
variables on the server.

Large public media files are not stored in this repository or copied into the
container. Configure `ASSET_PROXY_ORIGIN` so `/public/*` and `/__asset/static/*`
can be served through your resource reverse proxy.

## Build

```bash
docker build -t frontend-proxy .
```

## Run

```bash
docker run -d --name frontend-proxy \
  -p 3000:3000 \
  -e PORT=3000 \
  -e APP_TITLE="工作台" \
  -e PUBLIC_ENTRY_PATH="/workspace" \
  -e TARGET_API_ORIGIN="https://your-api-origin.example" \
  -e TARGET_UPLOAD_ORIGIN="https://your-upload-origin.example" \
  -e ASSET_PROXY_ORIGIN="https://your-asset-proxy.example" \
  -e MEDIA_PROXY_ORIGIN="https://your-media-origin.example" \
  -e MEDIA_REWRITE_ORIGINS="https://your-media-origin.example" \
  -e LOGIN_PASSWORD_ORIGIN="https://your-sso-login-origin.example" \
  -e LOGIN_TOKEN_ORIGIN="https://your-api-origin.example" \
  -e LOGIN_SSO_REDIRECT_PATH="/pod-permission" \
  -e LOGIN_SSO_STATE="redirectUri=/home" \
  frontend-proxy
```

## Public Routes

- `/login`: local login page.
- `/workspace`: public dashboard entry.
- `/api/*`: proxied API requests.
- `/upload/*`: proxied upload requests.
- `/__media/static/*`: proxied media resources.

The frontend domain should reverse proxy to the container port. Browsers should
only see the frontend domain plus same-origin paths.
