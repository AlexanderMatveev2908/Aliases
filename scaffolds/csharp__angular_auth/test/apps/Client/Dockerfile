FROM node:22 AS build

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build

EXPOSE 3001

CMD ["yarn", "start"]