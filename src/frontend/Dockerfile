# syntax=docker/dockerfile:1.4

FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install --frozen-lockfile
COPY . /app/
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist .
COPY .nginx/nginx.conf /etc/nginx/conf.d/default.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]
