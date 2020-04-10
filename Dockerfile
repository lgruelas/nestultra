FROM node:alpine

WORKDIR /usr/src/ultra

COPY /ultra-task/package.json /usr/src/ultra

RUN npm install

COPY /ultra-task /usr/src/ultra

CMD ["npm", "start"]