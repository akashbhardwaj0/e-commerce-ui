# Stage 1: Build
FROM node:alpine3.18 AS build

# Build App
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:1.23-alpine

# Serve the app with Nginx
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/build ./
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
