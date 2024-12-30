FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy and install server dependencies
COPY server/package*.json ./server/
WORKDIR /app/server
RUN npm install

# Copy and install client dependencies
WORKDIR /app
COPY client/package*.json ./client/
WORKDIR /app/client
RUN npm install

# Copy the entire application
WORKDIR /app
COPY . .

# Build client
WORKDIR /app/client
RUN npm run build

# Expose ports for server and client
EXPOSE 5000
EXPOSE 5173

# Start both server and client
CMD ["sh", "-c", "npm start --prefix /app/server & npm run dev --prefix /app/client"]
