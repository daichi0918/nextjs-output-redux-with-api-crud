FROM node:16-alpine

RUN npm i -g @nestjs/cli

WORKDIR /backend

COPY package.json package-lock.json ./

RUN npm install --non-interactive --frozen-lockfile
