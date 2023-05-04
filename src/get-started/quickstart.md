# Quickstart

Get started using Zilla by deploying our Docker containers. Before proceeding, you need to run these quickstarts in an evironment [with Docker](https://docs.docker.com/get-docker/)

## Simple TCP connection

Running this zilla setup will simply echo back any text sent to the server at port `12345`.


::: code-tabs#yaml

@tab zilla.yaml

```yaml
name: example
bindings:
  tcp_server:
    type: tcp
    kind: server
    options:
      host: 0.0.0.0
      port: 12345
    exit: echo_server
  echo_server:
    type: echo
    kind: server
```

:::

Run the zilla docker image as a deamon with the `zilla.yaml` file volume mounted.

::: code-tabs#yaml

@tab Docker 23

```bash:no-line-numbers
docker run -d -v ./zilla.yaml:/etc/zilla/zilla.yaml --name zilla-quickstart -p 12345:12345/tcp ghcr.io/aklivity/zilla:latest start -v
```

@tab Docker 20

```bash:no-line-numbers
docker run -d -v $(pwd)/zilla.yaml:/etc/zilla/zilla.yaml --name zilla-quickstart -p 12345:12345/tcp ghcr.io/aklivity/zilla:latest start -v
```

:::


Try it out using `netcat`.
<!-- Todo: fix this command since it doesn't output hello world -->
```bash:no-line-numbers
nc localhost 12345
```

output:

```bash:no-line-numbers
Hello, world
Hello, world
```

Remove the running container.

```bash:no-line-numbers
docker rm -f zilla-quickstart
```

## Simple HTTP Echo

Running this zilla quickstart will simply echo back any text sent to the server at port `8080`.


::: code-tabs#yaml

@tab zilla.yaml

```yaml
name: example
bindings:
  tcp_server:
    type: tcp
    kind: server
    options:
      host: 0.0.0.0
      port: 8080
    exit: http_server
  http_server:
    type: http
    kind: server
    routes:
      - when:
          - headers:
              :scheme: http
              :authority: localhost:8080
        exit: echo_server
  echo_server:
    type: echo
    kind: server
```

:::

Run the zilla docker image as a deamon with the `zilla.yaml` file volume mounted.

::: code-tabs#yaml

@tab Docker 23

```bash:no-line-numbers
docker run -d -v ./zilla.yaml:/etc/zilla/zilla.yaml --name zilla-quickstart -p 8080:8080 ghcr.io/aklivity/zilla:latest start -v
```

@tab Docker 20

```bash:no-line-numbers
docker run -d -v $(pwd)/zilla.yaml:/etc/zilla/zilla.yaml --name zilla-quickstart -p 8080:8080 ghcr.io/aklivity/zilla:latest start -v
```

:::

`curl` the zilla server to hear your echo.
<!-- Todo: fix this command as it results in curl: (52) Empty reply from server-->
```bash:no-line-numbers
curl -d "Hello, world" -H "Content-Type: text/plain" -X "POST" http://localhost:8080/
```

output:
<!-- todo update with actual output -->
```bash:no-line-numbers
Hello, world
Hello, world
```

Remove the running container.

```bash:no-line-numbers
docker rm -f zilla-quickstart
```

## HTTP to Kafka event stream

Running this zilla quickstart will create a simple api to create and list items. All of the data will be stored in `kafka`.

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
      host: broker
      port: 29092
    routes:
      - when:
          - cidr: 0.0.0.0/0
```

@tab docker-compose.yaml

```yaml
version: '3'
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:7.3.2
    container_name: zookeeper
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000

  broker:
    image: confluentinc/cp-kafka:7.3.2
    container_name: broker
    depends_on:
      - zookeeper
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: 'zookeeper:2181'
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_INTERNAL:PLAINTEXT
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092,PLAINTEXT_INTERNAL://broker:29092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: 1
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 1
  
  zilla:
    image: ghcr.io/aklivity/zilla:latest
    container_name: zilla
    depends_on:
      - broker
    ports:
      - "8080:8080"
    volumes:
      - ./zilla.yaml:/etc/zilla/zilla.yaml
    command: start -v
```

Run zilla and kafka with the `docker-compose` and `zilla.yaml` file in the same directory.

```bash:no-line-numbers
docker-compose up
```

`curl` the zilla server send a greeting.
<!-- Todo: fix this command as it results in curl: (52) Empty reply from server-->
```bash:no-line-numbers
curl -k -v -X POST https://localhost:8080/items -H 'Content-Type: application/json' -d '{"greeting":"Hello, world"}'
```

`curl` the zilla server to list all of the greetings.
<!-- Todo: fix this command as it results in curl: (52) Empty reply from server-->
```bash:no-line-numbers
curl -k -v https://localhost:8080/items
```

output:

```bash:no-line-numbers
[{"greeting":"Hello, world"}]
```

Remove the running containers.

```bash:no-line-numbers
docker-compose down
```

Go deeper into this concept with this [http.kafka.crud](https://github.com/aklivity/zilla-examples/tree/main/http.kafka.crud) example.
