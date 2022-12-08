# CONFIGURE

FROM node:18

WORKDIR /app

COPY package.json ./

COPY package-lock.json ./

# RUN npm ci ?
RUN npm i

COPY ./ ./

# BUILD

RUN npm run build:prod

EXPOSE 3000

CMD ["npx", "serve", "build"]