FROM node:12
EXPOSE 8080
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run-script build
