FROM node:18.16.1-alpine
WORKDIR /app
COPY . .
COPY .env ./env/development.env
RUN npm install
CMD ["npm", "run", "dev"]
