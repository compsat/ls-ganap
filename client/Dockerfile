# base image
FROM node:9.6.1

# set working directory
RUN mkdir /app/

ADD . /app/

WORKDIR /app/

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
RUN npm install
	
# start app
CMD ["npm", "start"]