---
description: Running these Zilla samples will introduce some SSE features.
---

# SSE Intro

Get started with Zilla by deploying our Docker Compose stack. Before proceeding, you should have [Docker Compose](https://docs.docker.com/compose/gettingstarted/) installed.

## Hello, World with SSE

Running this Zilla sample will create a simple SSE server that sends a `Hello, World` message.

### Setup SSE proxy server

Create these files, `zilla.yaml`, `docker-compose.yaml` and `index.html`, in the same directory.

::: code-tabs#yaml

@tab zilla.yaml

```yaml{19-24}
 <!-- @include: ./proxy/zilla.yaml -->
```

@tab docker-compose.yaml

```yaml
 <!-- @include: ./proxy/docker-compose.yaml -->
```

@tab index.html

```html
 <!-- @include: ./proxy/index.html -->
```

:::

### Run Zilla and the SSE server

Fist build the local `sse-server`.

```bash:no-line-numbers
docker build -t zilla-examples/sse-server:local https://github.com/aklivity/zilla-examples.git#v2:sse.proxy.jwt
```

Start the example.

```bash:no-line-numbers
docker-compose up -d
```

- Open the browser

Navigate to the browser [http://localhost:7114/index.html](http://localhost:7114/index.html).

- Click `Go`

With the location input set to `http://localhost:7114/events` you can click the `Go` button to connect to the SSE server. Messages will stream in as long as you have the `messenger` service running in docker. The stream of messages will render on the page.

```output:no-line-numbers
...
message: Hello, world Wed May 10 14:25:45 UTC 2023

message: Hello, world Wed May 10 14:25:40 UTC 2023

open:
```

You can also send a message yourself using `netcat`:

```bash:no-line-numbers
echo '{ "data": "Hello, world '`date`'" }' | nc -c localhost 7001
```

- Remove the running containers

```bash:no-line-numbers
docker-compose down
```

::: tip See more of what Zilla can do
Go deeper into this concept with the [sse.proxy.jwt](https://github.com/aklivity/zilla-examples/tree/main/sse.proxy.jwt) example.
:::

## SSE messages from Kafka

Running this Zilla sample will fanout `Hello, World` from a Kafka topic acting as a SSE server

### Setup SSE Kafka Proxy

Create these files, `zilla.yaml`, `docker-compose.yaml` and `index.html`, in the same directory.

::: code-tabs#yaml

@tab zilla.yaml

```yaml{19-24,56-60}
<!-- @include: ./kafka.fanout/zilla.yaml -->
```

@tab docker-compose.yaml

```yaml
<!-- @include: ./kafka.fanout/docker-compose.yaml -->
```

@tab index.html

```html
<!-- @include: ./kafka.fanout/index.html -->
```

:::

### Run Zilla and Kafka

```bash:no-line-numbers
docker-compose up -d
```

- Open the browser

Navigate to the browser [http://localhost:7114/index.html](http://localhost:7114/index.html).

- Click `Go`

With the location input set to `http://localhost:7114/events` you can click the `Go` button to connect to the SSE server. Messages will stream in as long as you have the `messenger` service running in docker.The stream of messages will render on the page.

```output:no-line-numbers
...
message: Hello, world Wed May 10 14:25:45 UTC 2023

message: Hello, world Wed May 10 14:25:40 UTC 2023

open:
```

- Remove the running containers

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
