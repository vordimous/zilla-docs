---
description: Running this Zilla quickstart will create a simple API to create and list items. All of the data will be stored on a Kafka topic.
---

# REST Quickstarts

Get started using Zilla by deploying our Docker container. Before proceeding, you need to run these quickstarts in an environment [with Docker Compose](https://docs.docker.com/compose/gettingstarted/).

## REST on a Kafka event stream

Running this Zilla quickstart will create a simple API to create and list items. All of the data will be stored on a Kafka topic.

::: code-tabs#yaml

@tab zilla.yaml

```yaml
name: example
bindings:
  api_tcp_server:
    type: tcp
    kind: server
    options:
      host: 0.0.0.0
      port: 8080
    exit: http_api_server
  http_api_server:
    type: http
    kind: server
    routes:
      - when:
          - headers:
              :scheme: http
              :authority: localhost:8080
        exit: http_api_kafka_proxy
  http_api_kafka_proxy:
    type: http-kafka
    kind: proxy
    routes:
      - when:
          - method: POST
            path: /items
        exit: kafka_cache_client
        with:
          capability: produce
          topic: items-snapshots
      - when:
          - method: GET
            path: /items
        exit: kafka_cache_client
        with:
          capability: fetch
          topic: items-snapshots
          merge:
            content-type: application/json
  kafka_cache_client:
    type: kafka
    kind: cache_client
    options:
      bootstrap:
        - items-snapshots
    exit: kafka_cache_server
  kafka_cache_server:
    type: kafka
    kind: cache_server
    exit: kafka_client
  kafka_client:
    type: kafka
    kind: client
    exit: kafka_tcp_client
  kafka_tcp_client:
    type: tcp
    kind: client
    options:
      host: kafka
      port: 9092
    routes:
      - when:
          - cidr: 0.0.0.0/0

```

@tab docker-compose.yaml

```yaml
version: '3'
services:
  kafka:
    image: docker.io/bitnami/kafka:latest
    container_name: kafka
    ports:
      - "9092:9092"
    environment:
      ALLOW_PLAINTEXT_LISTENER: "yes"

  kafka-init:
    image: docker.io/bitnami/kafka:latest
    command: 
      - "/bin/bash"
      - "-c"
      - "/opt/bitnami/kafka/bin/kafka-topics.sh --bootstrap-server kafka:9092 --create --if-not-exists --topic items-snapshots"
    depends_on:
      - kafka
    init: true

  zilla:
    image: ghcr.io/aklivity/zilla:latest
    container_name: zilla
    depends_on:
      - kafka
    ports:
      - "8080:8080"
    volumes:
      - ./zilla.yaml:/etc/zilla/zilla.yaml
    command: start -v

networks:
  default:
    name: zilla-network
    driver: bridge

```

:::

### Run Zilla and Kafka with the `docker-compose.yaml` and `zilla.yaml` file in the same directory

```bash:no-line-numbers
docker-compose up -d
```

### Use `curl` to send a greeting

```bash:no-line-numbers
curl -X POST http://localhost:8080/items -H 'Content-Type: application/json' -d '{"greeting":"Hello, world"}'
```

::: note Wait for the services to start
if you get this response `curl: (52) Empty reply from server`, the likely cause is Zilla and Kafka are still starting up.
:::

### Use `curl` to list all of the greetings

```bash:no-line-numbers
curl http://localhost:8080/items
```

output:

```bash:no-line-numbers
[{"greeting":"Hello, world"}]
```

### Remove the running containers

```bash:no-line-numbers
docker-compose down
```

Go deeper into this concept with this [http.kafka.crud](https://github.com/aklivity/zilla-examples/tree/main/http.kafka.crud) example.
