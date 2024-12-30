# Dockerfile for MERN Stack
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY server/package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]