FROM node:16-alpine3.11 as build

WORKDIR /shotping-frontend
COPY . /shotping-frontend

COPY ./package.json ./
COPY ./package-lock.json ./

COPY . ./

EXPOSE 80

CMD npm ci && npm run build && npm run serve