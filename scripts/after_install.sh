#!/bin/bash
cd /home/ec2-user/server
# install dependencies
npm install

# install create-react-app and react-scripts
# without react-scripts application cannot be started
npm install --save react react-dom react-scripts react-particles-js

# install pm2 process manage
npm install pm2 -g
