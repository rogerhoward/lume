# specify the node base image with your desired version node:<version>
FROM node

RUN mkdir /home/node/lume
ADD ./ /home/node/lume
WORKDIR /home/node/lume/app
RUN yarn install --verbose