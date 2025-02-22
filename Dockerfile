# Stage 1: Build the Angular app
FROM node:18 AS build
WORKDIR /app

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY . ./

# Ensure correct build output (explicitly setting the output path)
RUN ng build --configuration=production --output-path=/app/dist

# Stage 2: Serve with Nginx
FROM nginx:latest
COPY --from=build /app/dist/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
