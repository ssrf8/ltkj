FROM node:20-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY server.js page.html login.html favicon.svg ./
COPY assets ./assets
COPY iconfonts-v4.8.1 ./iconfonts-v4.8.1
COPY npm ./npm

EXPOSE 3000
CMD ["npm", "start"]
