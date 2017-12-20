#!/usr/bin/env bash

rm -rf dist/
npm run build
docker rm -fv game | true
docker rmi game:1.0.0 | true
docker build -t game:1.0.0 .
docker rmi $(docker images -qa -f 'dangling=true')
docker run -d --restart unless-stopped -p 80:80 --name game game:1.0.0
