#!/bin/bash
cd /home/ec2-user/client/src
pm2 start npm --name "slack-clone" -- start
pm2 startup
pm2 save
pm2 restart all
