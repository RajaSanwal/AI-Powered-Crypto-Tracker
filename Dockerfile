## Development Dockerfile

# Use Node.js official image as base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all project files
COPY . .

# Expose the development server port
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev", "--", "--host"]