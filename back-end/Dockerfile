FROM node:18

WORKDIR /app

COPY package.json ./

COPY package-lock.json ./

RUN npm i

COPY ./ ./

EXPOSE 9000

CMD ["npm", "run", "start"]
