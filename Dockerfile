# Stage 1: Build
FROM node:alpine3.18 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package.json .
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve
FROM nginx:1.23-alpine

# Set the working directory for Nginx
WORKDIR /usr/share/nginx/html

# Remove default Nginx contents
RUN rm -rf *

# Copy the built application from the build stage
COPY --from=build /app/build .

# Expose port 80 for the application
EXPOSE 80

# Start Nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]
