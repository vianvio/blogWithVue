#!/usr/bash

HOST=54.238.160.217
remote_cmd="sh /home/ubuntu/blogWithVue/remote_server.sh"

ssh -t -i ~/.ssh/VianTokyo.pem root@$HOST $remote_cmd