# http.kafka.sasl.scram

Listens on http port `7114` or https port `7143` and will produce messages to the `events` topic in `SASL/SCRAM` enabled Kafka, synchronously.

## Running locally

This cookbook runs using Docker compose.

### Setup

The `setup.sh` script will:

- installs Zilla, Kafka and Zookeeper to the Kubernetes cluster with helm and waits for the pods to start up
- creates the `events` topic in Kafka
- creates SCRAM credential `user` (the default implementation of SASL/SCRAM in Kafka stores SCRAM credentials in ZooKeeper)
- starts port forwarding

```bash
./setup.sh
```

### Verify behavior

Send a `POST` request with an event body.

```bash
curl -v \
       -X "POST" http://localhost:7114/events \
       -H "Content-Type: application/json" \
       -d "{\"greeting\":\"Hello, world\"}"
```

output:

```text
...
> POST /events HTTP/1.1
> Content-Type: application/json
...
< HTTP/1.1 204 No Content
```

Verify that the event has been produced to the `events` Kafka topic.

```bash
docker compose -p zilla-http-kafka-sync exec kafkacat \
kafkacat -C -b kafka:9092 -t events -J -u | jq .
```

output:

```json
{
  "topic": "events",
  "partition": 0,
  "offset": 0,
  "tstype": "create",
  "ts": 1652465273281,
  "broker": 1001,
  "headers": [
    "content-type",
    "application/json"
  ],
  "payload": "{\"greeting\":\"Hello, world\"}"
}
% Reached end of topic events [0] at offset 1
```

### Teardown

The `teardown.sh` script stops port forwarding, uninstalls Zilla, Kafka and Zookeeper and deletes the namespace.

```bash
./teardown.sh
```
