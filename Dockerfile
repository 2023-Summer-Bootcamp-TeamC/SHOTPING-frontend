FROM node:16-alpine3.11 as build

WORKDIR /shotping-frontend
COPY . /shotping-frontend

COPY ./package.json ./
COPY ./package-lock.json ./

COPY . ./

RUN npm run build

EXPOSE 3000 