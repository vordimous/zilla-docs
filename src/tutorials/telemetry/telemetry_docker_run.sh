#!/bin/bash

tmp_dir=tmp_sample;
endpoint=http://localhost:7114/;
timeout=30;
msg="Hello, world";

# Create tmp dir
mkdir $tmp_dir;
cp telemetry_zilla.yaml $tmp_dir/zilla.yaml;
cd $tmp_dir;

#region run_command
docker run -d -v ./zilla.yaml:/etc/zilla/zilla.yaml \
--name zilla-sample -p 7114:7114 -p 7190:7190 \
ghcr.io/aklivity/zilla:latest \
start
#endregion run_command

# Wait for endpoint
result="";
count=0;
until [ "$result" == "$msg" ] || [ "$count" -eq "$timeout" ]; do
    result=$(curl -s -m 1 -d "$msg" -H "Content-Type: text/plain" -X "POST" $endpoint);
    echo "try:$((++count)), $result";
    sleep 1;
done
docker logs zilla-sample;

#region test_zilla
curl -d "Hello, world" -H "Content-Type: text/plain" -X "POST" http://localhost:7114/
#endregion test_zilla

#region see_logs
docker logs zilla-sample
#endregion see_logs

#region see_metrics
curl http://localhost:7190/metrics
#endregion see_metrics

#region teardown
docker rm -f zilla-sample
#endregion teardown

cd ../;
rm -rf $tmp_dir;

# Fail if results aren't correct
if [ "$result" != "$msg" ]; then echo "bad result: $result"; exit 0; fi
if [ "$(curl -o /dev/null -Isw '%{http_code}\n' http://localhost:7190/metrics)" -eq 200 ]; then echo "no metrics"; exit 0; fi
