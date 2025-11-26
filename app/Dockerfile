FROM node:20-alpine

WORKDIR /app

RUN npm install -g @ionic/cli@latest

COPY my-games/package*.json ./
RUN npm install

COPY my-games/ .

EXPOSE 8100

CMD ["ionic", "serve", "--host=0.0.0.0", "--port=8100", "--no-open"]