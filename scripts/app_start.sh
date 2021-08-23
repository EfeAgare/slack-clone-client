cd /home/ec2-user/server
sudo npm run-script build
pm2 start npm --name "slack-clone" -- start

# auto restart server if shut down
pm2 startup

# freeze process list for automatic respawn
pm2 save

# restart all processes - necessary to do this again?
pm2 restart all
