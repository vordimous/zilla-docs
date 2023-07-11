#!/bin/bash

tmp_dir=tmp_quickstart;
endpoint=localhost:12345;
timeout=30;
msg="Hello, world";

# Create tmp dir
mkdir $tmp_dir;
cp tcp_zilla.yaml $tmp_dir/zilla.yaml;
cd $tmp_dir;

# Run Zilla - Coppied to md file
docker pull ghcr.io/aklivity/zilla:latest && \
docker run -d -v ./zilla.yaml:/etc/zilla/zilla.yaml \
--name zilla-quickstart -p 12345:12345/tcp \
ghcr.io/aklivity/zilla:latest \
start -v;

# Wait for endpoint
result="";
count=0;
until [ "$result" == "$msg" ] || [ "$count" -eq "$timeout" ]; do
    result=$(echo "$msg" | nc -w 1 localhost 12345);
    echo "try:$((++count)), $result";
    sleep 1; 
done
docker logs zilla-quickstart;

# Test Zilla - Coppied to md file
echo "Hello, world" | nc -w 1 localhost 12345;

# Cleanup
docker rm -f zilla-quickstart;
cd ../;
rm -rf $tmp_dir;

# Fail if results aren't correct
if [ "$result" != "$msg" ]; then echo "bad result: $result, count: $count"; exit 0; fi
