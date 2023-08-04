FROM node:14-alpine

WORKDIR /app

COPY ./server/*.json ./

RUN npm install

COPY ./server .

RUN npm run build

CMD ["node", "dist/main" ]


