FROM node:12.9.1-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --prod

COPY . .

ENV LISTEN_PORT=8080

EXPOSE $LISTEN_PORT

ENTRYPOINT [ "npm", "start" ]