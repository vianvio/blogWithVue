#!/usr/bash

echo "remote connected"
sudo -s
cd /home/ubuntu/blogWithVueBackend
npm run clean
cd /home/ubuntu/blogWithVue
git pull origin master
npm run deploy