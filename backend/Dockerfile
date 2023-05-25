# Build the backend
FROM node:19.6.1-alpine as backend-build

RUN npm install -g nodemon

WORKDIR /app

COPY /package.json .

RUN yarn

COPY . .

CMD [ "npm", "run", "server" ]