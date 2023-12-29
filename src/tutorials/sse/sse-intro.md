---
description: Running these Zilla samples will introduce some SSE features.
---

# Stream SSE messages from Kafka

Get started with Zilla by deploying our Docker Compose stack. Before proceeding, you should have [Docker Compose](https://docs.docker.com/compose/gettingstarted/) installed.


Running this Zilla sample will fanout `Hello, World` from a Kafka topic acting as a SSE server

## Setup SSE Kafka Proxy

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

## Run Zilla and Kafka

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
