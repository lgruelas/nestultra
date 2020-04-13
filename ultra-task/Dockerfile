FROM node:alpine

WORKDIR /usr/src/ultra

COPY package.json /usr/src/ultra

RUN npm install

COPY . /usr/src/ultra

EXPOSE 3700

CMD ["npm", "start"]