#!/bin/bash

tmp_dir=tmp_quickstart;
endpoint=http://localhost:8080/;
timeout=30;
msg="Hello, world";

# Create tmp dir
mkdir $tmp_dir;
cp http_zilla.yaml $tmp_dir/zilla.yaml;
cd $tmp_dir;

# Run Zilla - Coppied to md file
docker pull ghcr.io/aklivity/zilla:latest && \
docker run -d -v ./zilla.yaml:/etc/zilla/zilla.yaml \
--name zilla-quickstart -p 8080:8080/tcp \
ghcr.io/aklivity/zilla:latest \
start -v;

# Wait for endpoint
result="";
count=0;
until [ "$result" == "$msg" ] || [ "$count" -eq "$timeout" ]; do
    result=$(curl -s -m 1 -d "$msg" -H "Content-Type: text/plain" -X "POST" $endpoint);
    echo "try:$((++count)), $result";
    sleep 1; 
done
docker logs zilla-quickstart;

# Test Zilla - Coppied to md file
curl -d "Hello, world" -H "Content-Type: text/plain" -X "POST" http://localhost:8080/;

# Cleanup
docker rm -f zilla-quickstart;
cd ../;
rm -rf $tmp_dir;

# Fail if results aren't correct
if [ "$result" != "$msg" ]; then echo "bad result: $result"; exit 0; fi
