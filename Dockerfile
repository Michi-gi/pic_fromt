FROM node:lts-alpine as base

RUN npm install -g @angular/cli

WORKDIR /pic_front
COPY ./package*.json ./
RUN rm -rf node_modules && npm install


FROM base as build

COPY angular.json ./
COPY e2e ./e2e/
COPY karma.conf.js ./
COPY src ./src/
RUN ls -lR src
COPY tsconfig*.json ./
COPY tslint.json ./

RUN ng build --configuration production --output-path=./dist/build-by-docker


FROM nginx:alpine as prod

COPY --from=build /pic_front/dist/build-by-docker /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
