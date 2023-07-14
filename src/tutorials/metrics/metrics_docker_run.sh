#!/bin/bash

tmp_dir=tmp_sample;
endpoint=http://localhost:8080/;
timeout=30;
msg="Hello, world";

# Create tmp dir
mkdir $tmp_dir;
cp metrics_zilla.yaml $tmp_dir/zilla.yaml;
cd $tmp_dir;

# Run Zilla - Coppied to md file
docker pull ghcr.io/aklivity/zilla:latest && \
docker run -d -v ./zilla.yaml:/etc/zilla/zilla.yaml \
--name zilla-sample -p 8080:8080/tcp -p 9090:9090/tcp \
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
docker logs zilla-sample;

# Test Zilla - Coppied to md file
curl -d "Hello, world" -H "Content-Type: text/plain" -X "POST" http://localhost:8080/;
curl http://localhost:9090/metrics;

# Cleanup
docker rm -f zilla-sample;
cd ../;
rm -rf $tmp_dir;

# Fail if results aren't correct
if [ "$result" != "$msg" ]; then echo "bad result: $result"; exit 0; fi
if [ "$(curl -o /dev/null -Isw '%{http_code}\n' http://localhost:9090/metrics)" -eq 200 ]; then echo "no metrics"; exit 0; fi
