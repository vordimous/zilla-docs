---
description: Running these Zilla samples will introduce some REST features.
---

# REST Intro

Get started with Zilla by deploying our Docker Compose stack. Before proceeding, you should have [Docker Compose](https://docs.docker.com/compose/gettingstarted/) installed.

## CRUD on a Kafka event stream

Running this Zilla sample will create a simple API to create and list items. All of the data will be stored on a Kafka topic.

### Setup

Create these files, `zilla.yaml` and `docker-compose.yaml`, in the same directory.

::: code-tabs#yaml

@tab zilla.yaml

```yaml {28,32-33,35,39-40}
<!-- @include: ./zilla.yaml -->
```

@tab docker-compose.yaml

```yaml
<!-- @include: ./docker-compose.yaml -->
```

:::

### Run Zilla and Kafka

```bash:no-line-numbers
docker-compose up -d
```

### Use `curl` to send a greeting

```bash:no-line-numbers
curl -X POST http://localhost:7114/items -H 'Content-Type: application/json' -d '{"greeting":"Hello, world"}'
```

### Use `curl` to list all of the greetings

```bash:no-line-numbers
curl http://localhost:7114/items
```

```output:no-line-numbers
[{"greeting":"Hello, world"}]
```

### Remove the running containers

```bash:no-line-numbers
docker-compose down
```

::: tip See more of what Zilla can do
Go deeper into this concept with the [http.kafka.crud](https://github.com/aklivity/zilla-examples/tree/main/http.kafka.crud) example.
:::

## Going Deeper

Try out more HTTP examples:

- [http.echo](https://github.com/aklivity/zilla-examples/tree/main/http.echo)
- [http.echo.jwt](https://github.com/aklivity/zilla-examples/tree/main/http.echo.jwt)
- [http.proxy](https://github.com/aklivity/zilla-examples/tree/main/http.proxy)
- [http.filesystem](https://github.com/aklivity/zilla-examples/tree/main/http.filesystem)
- [http.filesystem.config.server](https://github.com/aklivity/zilla-examples/tree/main/http.filesystem.config.server)
- [http.kafka.async](https://github.com/aklivity/zilla-examples/tree/main/http.kafka.async)
- [http.kafka.cache](https://github.com/aklivity/zilla-examples/tree/main/http.kafka.cache)
- [http.kafka.crud](https://github.com/aklivity/zilla-examples/tree/main/http.kafka.crud)
- [http.kafka.oneway](https://github.com/aklivity/zilla-examples/tree/main/http.kafka.oneway)
- [http.kafka.sasl.scram](https://github.com/aklivity/zilla-examples/tree/main/http.kafka.sasl.scram)
- [http.kafka.sync](https://github.com/aklivity/zilla-examples/tree/main/http.kafka.sync)
