# A basic Dockerfile for the Lume project
FROM node

RUN mkdir /home/node/lume
ADD ./ /home/node/lume
WORKDIR /home/node/lume/app
RUN yarn install --verbose