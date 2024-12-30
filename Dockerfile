FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy and install server dependencies
COPY server/package*.json ./server/
RUN npm install --prefix ./server

# Copy and install client dependencies
COPY client/package*.json ./client/
RUN npm install --prefix ./client

# Copy the entire application
COPY . .

# Build client
RUN npm run build --prefix ./client

# Expose ports for server and client
EXPOSE 5000 5173

# Start both server and client
CMD ["sh", "-c", "npm start --prefix /app/server & npm run dev --prefix /app/client"]
