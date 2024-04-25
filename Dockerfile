# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle your app's source code inside the Docker image
COPY . .

# Build your app
RUN npm run build

# The command to run your application
CMD ["node", "dist/main"]

# Expose the port the app runs on
EXPOSE 3000
