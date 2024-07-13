---
description: Running these Zilla samples will implement a simple CRUD API features.
---

# CRUD API on Kafka

Get started with Zilla by deploying our Docker Compose stack. Before proceeding, you should have [Docker Compose](https://docs.docker.com/compose/gettingstarted/) installed.

Running this Zilla sample will create a simple API using the [Zilla REST Kafka proxy](../../concepts/kafka-proxies/http-proxy.md) to expose common entity CRUD endpoints with the entity data being stored on Kafka topics. Leveraging Kafka's `cleanup.policy=compact` feature, Zilla enables a standard REST backend architecture with Kafka as the storage layer. Adding an `Idempotency-Key` header during creation will set the message `key` and act as the `ID` for the record. A UUID is generated if no key is sent.

- **GET** - Fetches all items on the topic or Fetch one item by its key using `/:key`.
- **POST** - Create a new item with the `Idempotency-Key` header setting the key.
- **PUT** - Update an item based on its key using `/:key`.
- **DELETE** - Delete an item based on its key using `/:key`.

## Setup

Create these files, `zilla.yaml` and `docker-compose.yaml`, in the same directory.

::: code-tabs#yaml

@tab zilla.yaml

```yaml {27,31-33,35,39-40}
<!-- @include: ./zilla.yaml -->
```

@tab docker-compose.yaml

```yaml
<!-- @include: ./docker-compose.yaml -->
```

:::

## Run Zilla and Kafka

```bash:no-line-numbers
docker-compose up --detach
```

## Use `curl` to send a greeting

```bash:no-line-numbers
curl -X POST http://localhost:7114/items -H 'Content-Type: application/json' -H 'Idempotency-Key: 1234' -d '{"greeting":"Hello, world"}'
```

## Use `curl` to list all of the greetings

```bash:no-line-numbers
curl http://localhost:7114/items
```

```output:no-line-numbers
[{"greeting":"Hello, world"}]
```

## Remove the running containers

```bash:no-line-numbers
docker-compose down
```

::: tip See more of what Zilla can do
Go deeper into this concept with the [http.kafka.crud](https://github.com/aklivity/zilla-examples/tree/main/http.kafka.crud) example.
:::

## Going Deeper

Try out more HTTP Kafka examples:

- [http.kafka.async](https://github.com/aklivity/zilla-examples/tree/main/http.kafka.async)
- [http.kafka.cache](https://github.com/aklivity/zilla-examples/tree/main/http.kafka.cache)
- [http.kafka.crud](https://github.com/aklivity/zilla-examples/tree/main/http.kafka.crud)
- [http.kafka.oneway](https://github.com/aklivity/zilla-examples/tree/main/http.kafka.oneway)
- [http.kafka.sasl.scram](https://github.com/aklivity/zilla-examples/tree/main/http.kafka.sasl.scram)
- [http.kafka.sync](https://github.com/aklivity/zilla-examples/tree/main/http.kafka.sync)
