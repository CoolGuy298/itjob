# Dockerfile for React Vite client
FROM node:14-alpine

WORKDIR /app

COPY COPY package.json /usr/src/app/
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
