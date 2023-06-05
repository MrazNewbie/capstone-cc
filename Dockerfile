FROM node:alpine3.14

WORKDIR /app

COPY *.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD node server.js
