#!/usr/bash

echo "remote connected"
cd /home/ubuntu/blogWithVueBackend
npm run clean
echo "first finish"
cd /home/ubuntu/blogWithVue
git pull origin master
echo "pull finish"
npm run deploy
echo "all finish"