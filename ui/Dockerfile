# Stage 1: Build the React application
FROM node:14 AS build

# Set working directory
WORKDIR /app

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Create ssl using mkcert
RUN wget https://dl.filippo.io/mkcert/latest?for=linux/amd64 -O mkcert
RUN chmod +x mkcert
RUN mv mkcert /usr/local/bin/
RUN mkcert -install
RUN mkcert -key-file key.pem -cert-file cert.pem localhost 127.0.0.1

# Copy the built React files from the previous stage
COPY ./dist/index.html /usr/share/nginx/html/index.html
COPY ./dist/assets /usr/share/nginx/html/assets

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80(http), 443(https)
EXPOSE 80
EXPOSE 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]