FROM node:23-slim

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY . /app/

RUN npx tsc

CMD ["node", "dist/index.js"]
