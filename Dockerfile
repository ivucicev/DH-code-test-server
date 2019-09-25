FROM node:alpine

WORKDIR /usr/src/app

COPY *.lock package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]