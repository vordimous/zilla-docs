---
description: Running these Zilla quickstarts will introduce some SSE features.
---

# SSE Quickstart

Get started using Zilla by deploying our Docker container. Before proceeding, you need to run these quickstarts in an environment [with Docker Compose](https://docs.docker.com/compose/gettingstarted/).

## Hello, World with SSE

Running this Zilla quickstart will create a simple SSE server that sends a `Hello, World` message.

### Setup

Create these files, `zilla.yaml`, `docker-compose.yaml` and `index.html`, in the same directory.

::: code-tabs#yaml

@tab zilla.yaml

```yaml{19-24}
name: SSE-example
bindings:

# Gateway ingress config
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
    options:
      access-control:
        policy: cross-origin
    routes:
      - when:
          - headers:
              :scheme: http
              :authority: localhost:8080
              :path: /events
        exit: sse_server
      - when:
          - headers:
              :scheme: http
              :authority: localhost:8080
        exit: http_filesystem_proxy

# UI html file server
  http_filesystem_proxy:
    type: http-filesystem
    kind: proxy
    routes:
      - when:
          - path: /{path}
        with:
          path: ${params.path}
        exit: filesystem_server
  filesystem_server:
    type: filesystem
    kind: server
    options:
      location: /var/www/

# SSE Server
  sse_server:
    type: sse
    kind: server
    routes:
      - exit: sse_client
  sse_client:
    type: sse
    kind: client
    exit: http_client
  http_client:
    type: http
    kind: client
    options:
      versions:
        - http/1.1
    exit: tcp_client
  tcp_client:
    type: tcp
    kind: client
    options:
      host: sse-server
      port: 8001

```

@tab docker-compose.yaml

```yaml
version: '3'
services:
  zilla:
    image: ghcr.io/aklivity/zilla:latest
    container_name: zilla
    ports:
      - "8080:8080"
    volumes:
      - ./zilla.yaml:/etc/zilla/zilla.yaml
      - ./index.html:/var/www/index.html
    command: start -v -e

  sse-server:
    image: zilla-examples/sse-server:latest
    container_name: sse-server
    tty: true
    ports:
      - "8001:8001"
      - "7001:7001"
    command: -v -p 8001 -i 7001

  messenger:
    image: busybox:latest
    container_name: sse_messenger
    depends_on:
      - sse-server
    command: 
      - "/bin/sh"
      - "-c"
      - 'while true; do echo "{ \"data\": \"Hello, world $(date)\" }" | nc sse-server 7001; echo "message sent, waiting 5 sec"; sleep 5; done'

networks:
  default:
    name: zilla-network
    driver: bridge

```

@tab index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Welcome to Zilla!</title>
    <style type="text/css">
      .row {
        overflow: hidden;
        padding: 10px;
        width: 300px;
      }
      .col {
        float: left;
        width: 50%;
      }
    </style>
  </head>

  <body>
    <div class="col">
      <h3>Event Source</h3>

      <div class="row">
        <label for="location">Location</label>
        <input id="location" value="http://localhost:8080/events" style="width: 200px" />
      </div>
      <div class="row">
        <button onclick="javascript:attachEventSource()">Go</button>
      </div>

      <h3>Messages</h3>
      <div id="messages"></div>
    </div>
    <script>
        async function attachEventSource() {
          const location = document.getElementById("location");
          const messages = document.getElementById("messages");
  
          const es = new EventSource(`${location.value}`);
          const handleEvent = (event) => {
              var text = document.createTextNode(`${event.type}: ${event.data ? event.data : ""}`);
              var line = document.createElement("p");
              line.appendChild(text);
    
              messages.insertBefore(line, messages.firstChild);
            };
          es.onmessage = handleEvent;
          es.onopen = handleEvent;
          es.onerror = handleEvent;
        }
      </script>
  </body>
</html>

```

:::

### Run Zilla and the SSE server

```bash:no-line-numbers
docker-compose up -d
```

### Open the browser

Navigate to the browser [http://localhost:8080/index.html](http://localhost:8080/index.html).

::: note Wait for the services to start
If the page won't load the likely cause is Zilla and the SSE server are still starting up.
:::

### Click `Go`

With the location input set to `http://localhost:8080/events` you can click the `Go` button to connect to the SSE server. Messages will stream in as long as you have the `messenger` service running in docker.

output:

```bash:no-line-numbers
...
message: Hello, world Wed May 10 14:25:45 UTC 2023

message: Hello, world Wed May 10 14:25:40 UTC 2023

open:
```

Alternatively, you can send a message yourself using `netcat`:

```bash:no-line-numbers
echo '{ "data": "Hello, world '`date`'" }' | nc -c localhost 7001
```

### Remove the running containers

```bash:no-line-numbers
docker-compose down
```

::: tip See more of what Zilla can do
Go deeper into this concept with the [sse.proxy.jwt](https://github.com/aklivity/zilla-examples/tree/main/sse.proxy.jwt) example.
:::

## SSE messages from Kafka

Running this Zilla quickstart will fanout `Hello, World` from a Kafka topic acting as a SSE server

### Setup

Create these files, `zilla.yaml`, `docker-compose.yaml` and `index.html`, in the same directory.

::: code-tabs#yaml

@tab zilla.yaml

```yaml{19-24,56-60}
name: SSE-example
bindings:

# Gateway ingress config
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
    options:
      access-control:
        policy: cross-origin
    routes:
      - when:
          - headers:
              :scheme: http
              :authority: localhost:8080
              :path: /events
        exit: sse_server
      - when:
          - headers:
              :scheme: http
              :authority: localhost:8080
        exit: http_filesystem_proxy

# UI html file server
  http_filesystem_proxy:
    type: http-filesystem
    kind: proxy
    routes:
      - when:
          - path: /{path}
        with:
          path: ${params.path}
        exit: filesystem_server
  filesystem_server:
    type: filesystem
    kind: server
    options:
      location: /var/www/

# SSE Server With an exit to Kafka
  sse_server:
    type: sse
    kind: server
    exit: sse_kafka_proxy
  sse_kafka_proxy:
    type: sse-kafka
    kind: proxy
    routes:
      - when:
          - path: /events
        exit: kafka_cache_client
        with:
          topic: events

# Kafka caching layer
  kafka_cache_client:
    type: kafka
    kind: cache_client
    exit: kafka_cache_server
  kafka_cache_server:
    type: kafka
    kind: cache_server
    options:
      bootstrap:
        - events
    exit: kafka_client

# Connect to local Kafka
  kafka_client:
    type: kafka
    kind: client
    exit: tcp_client
  tcp_client:
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
      - "/opt/bitnami/kafka/bin/kafka-topics.sh --bootstrap-server kafka:9092 --create --if-not-exists --topic events"
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
      - ./index.html:/var/www/index.html
    command: start -v -e

  messenger:
    image: confluentinc/cp-kafkacat:latest.amd64
    container_name: kafka_messenger
    depends_on:
      - kafka
    command: 
      - "/bin/sh"
      - "-c"
      - 'while true; do echo "{ \"data\": \"Hello, world $(date)\" }" | kafkacat -P -b kafka:9092 -t events -k 1; echo "message sent, waiting 5 sec"; sleep 5; done'

networks:
  default:
    name: zilla-network
    driver: bridge

```

@tab index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Welcome to Zilla!</title>
    <style type="text/css">
      .row {
        overflow: hidden;
        padding: 10px;
        width: 300px;
      }
      .col {
        float: left;
        width: 50%;
      }
    </style>
  </head>

  <body>
    <div class="col">
      <h3>Event Source</h3>

      <div class="row">
        <label for="location">Location</label>
        <input id="location" value="http://localhost:8080/events" style="width: 200px" />
      </div>
      <div class="row">
        <button onclick="javascript:attachEventSource()">Go</button>
      </div>

      <h3>Messages</h3>
      <div id="messages"></div>
    </div>
    <script>
        async function attachEventSource() {
          const location = document.getElementById("location");
          const messages = document.getElementById("messages");
  
          const es = new EventSource(`${location.value}`);
          const handleEvent = (event) => {
              var text = document.createTextNode(`${event.type}: ${event.data ? event.data : ""}`);
              var line = document.createElement("p");
              line.appendChild(text);
    
              messages.insertBefore(line, messages.firstChild);
            };
          es.onmessage = handleEvent;
          es.onopen = handleEvent;
          es.onerror = handleEvent;
        }
      </script>
  </body>
</html>

```

:::

### Run Zilla and Kafka

```bash:no-line-numbers
docker-compose up -d
```

### Open the browser

Navigate to the browser [http://localhost:8080/index.html](http://localhost:8080/index.html).

::: note Wait for the services to start
If the page won't load the likely cause is Zilla and Kafka are still starting up.
:::

### Click `Go`

With the location input set to `http://localhost:8080/events` you can click the `Go` button to connect to the SSE server. Messages will stream in as long as you have the `messenger` service running in docker.

output:

```bash:no-line-numbers
...
message: Hello, world Wed May 10 14:25:45 UTC 2023

message: Hello, world Wed May 10 14:25:40 UTC 2023

open:
```

### Remove the running containers

```bash:no-line-numbers
docker-compose down
```

::: tip See more of what Zilla can do
Go deeper into this concept with the [sse.kafka.fanout](https://github.com/aklivity/zilla-examples/tree/main/sse.kafka.fanout) example.
:::

## Going Deeper

Try out the other SSE examples:

- [sse.kafka.fanout](https://github.com/aklivity/zilla-examples/tree/main/sse.kafka.fanout)
- [sse.proxy.jwt](https://github.com/aklivity/zilla-examples/tree/main/sse.proxy.jwt)
