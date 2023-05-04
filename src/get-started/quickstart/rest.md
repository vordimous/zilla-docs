# REST Quickstarts

Get started using Zilla by deploying our Docker containers. Before proceeding, you need to run these quickstarts in an environment [with Docker Compose](https://docs.docker.com/compose/gettingstarted/)

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
        exit: kafka_cache_client0
        with:
          capability: produce
          topic: items-snapshots
          key: ${idempotencyKey}
      - when:
          - method: GET
            path: /items
        exit: kafka_cache_client0
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
      port: 29092
    routes:
      - when:
          - cidr: 0.0.0.0/0
```

@tab docker-compose.yaml

```yaml
version: '3'
services:
  kafka:
    image: docker.io/bitnami/kafka:3.4
    container_name: kafka
    ports:
      - "9092:9092"
    environment:
      ALLOW_PLAINTEXT_LISTENER: "yes"

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
    external: true
    name: zilla-network

```

:::

### Run Zilla and Kafka with the `docker-compose` and `zilla.yaml` file in the same directory

```bash:no-line-numbers
docker-compose up
```

Once the Kafka service has started you will need to create the topic for Zilla to proxy the to. You will find the topic `items-snapshots` defined at `http_api_kafka_proxy.routes.with.topic`.

### Use `curl` to send a greeting

```bash:no-line-numbers
curl -X POST http://zilla:8080/items -H 'Content-Type: application/json' -d '{"greeting":"Hello, world"}'
```

### Use `curl` to list all of the greetings

```bash:no-line-numbers
curl http://zilla:8080/items
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
