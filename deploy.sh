#!/usr/bash

HOST=54.238.160.217
remote_cmd="/home/ubuntu/blogWithVue/remote_server.sh"

ssh -i ~/.ssh/VianTokyo.pem ubuntu@$HOST "remote_cmd"