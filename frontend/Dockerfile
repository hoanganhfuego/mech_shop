# Build the frontend
FROM node:19.6.1-alpine as frontend-build

WORKDIR /app

COPY /package.json .

RUN yarn

COPY . .

CMD [ "npm", "start" ]
