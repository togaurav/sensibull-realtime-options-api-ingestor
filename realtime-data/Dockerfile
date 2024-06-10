FROM node:alpine

RUN apk add --no-cache tzdata
ENV TZ=Asia/Calcutta
#Install some dependencies

WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install


CMD [ "npm", "start" ]