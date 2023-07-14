---
description: Running this Zilla quickstart will introduce some of Zilla's main features.
category:
  - Kafka Proxies
tag:
  - REST
  - SSE
  - gRPC
---

# Zilla Kafka Proxy Quickstart

Get started with Zilla by deploying our Docker Compose stack. Before proceeding, you should have [Docker Compose](https://docs.docker.com/compose/gettingstarted/) installed.

## Postman Collections

This quickstart is designed to use Aklivity’s public [Postman Workspace](https://www.postman.com/aklivity-zilla/workspace/aklivity-zilla-quickstart/overview) to give you fast and easy way to try out Zilla’s multi-protocol Kafka proxying capabilities.

::: note App or Desktop Agent
Once the collections are forked you can run them against the local stack if you have either the [Postman App](https://www.postman.com/downloads/) or [Postman Desktop Agent](https://www.postman.com/downloads/postman-agent/) installed.
:::

Fork each of these collections into your own workspace.

- [Zilla - REST Kafka proxy](https://www.postman.com/aklivity-zilla/workspace/aklivity-zilla-quickstart/collection/28401168-6941d1fa-698c-4da1-9789-2f806acf9fbb?action=share&creator=28401168)
- [Zilla - SSE Kafka proxy](https://www.postman.com/aklivity-zilla/workspace/aklivity-zilla-quickstart/collection/28401168-09c165b3-6e68-45c2-aedb-494f130bc354?action=share&creator=28401168)
- [Zilla - gRPC Kafka proxy](https://www.postman.com/aklivity-zilla/workspace/aklivity-zilla-quickstart/collection/64a85751808733dd197c599f?action=share&creator=28401168)

![Collection header > View more actions > Create a Fork](./create-fork.png)


## Zilla Docker Compose Stack

Download the [zilla.quickstart](https://github.com/aklivity/zilla-examples/tree/main/zilla.quickstart) folder from the zilla-examples repo. The docker compose file will create everything you need for this quickstart. The `setup.sh` script will start and restart the backend. The `teardown.sh` script stops and destroys all of the containers. 

The key components this script will setup:

- Configured Zilla instance
- Kafka instance and topics
- [Kafka UI](http://localhost/ui/clusters/local/all-topics) for browsing topics & messages
- gRPC Route Guide server

::: code-tabs#bash

@tab Start and Restart

```bash
./setup.sh
```

@tab Shutdown

```bash
./teardown.sh
```

:::

### Kafka topics

This Zilla quickstart hosts a UI for the Kafka cluster. Go to the [topics page](http://localhost/ui/clusters/local/all-topics) to browse the data.

- **items-crud** - REST CRUD messages
- **events-sse** - SSE event messages
- **echo-service-messages** - gRPC echo messages
- **route-guide-requests** - gRPC RouteGuide requests
- **route-guide-responses** - gRPC RouteGuide responses

## REST Kafka proxy

Zilla can expose common entity CRUD endpoints with the entity data being stored on Kafka topics. Leveraging the `cleanup.policy=compact` feature of Kafka, Zilla enables a standard REST backend architecture with Kafka as the storage layer. Adding a `Idempotency-Key` header during creation will set the message `key` and acts as the `ID` for the record. A UUID is generated if no key is sent.

- **GET** - Fetches all items on the topic or Fetch one item by its key using `/:key`.
- **POST** - Create a new item with the `Idempotency-Key` header setting the key. 
- **PUT** - Update an item based on its key using `/:key`.
- **DELETE** - Delete an item based on its key using `/:key`.

::: note Going Deeper
Zilla can be configured for request-response over Kafka topics both synchronously and asynchronously, and more that we aren't able to cover in this quickstart. Here are some other resources you will want to check out.

- [REST proxy guide](../../concepts/kafka-proxies/rest-proxy.md)
- [HTTP proxy example](https://github.com/aklivity/zilla-examples/tree/main/http.proxy)
- [JWT example](https://github.com/aklivity/zilla-examples/tree/main/http.echo.jwt)
- [Kafka cache example](https://github.com/aklivity/zilla-examples/tree/main/http.kafka.cache)
- [Kafka sync example](https://github.com/aklivity/zilla-examples/tree/main/http.kafka.sync)
- [Kafka async example](https://github.com/aklivity/zilla-examples/tree/main/http.kafka.async)
:::

## SSE Kafka proxy

Zilla can expose a Kafka topic as a Server-sent Events (SSE) stream, enabling a resilient event-driven architecture to be exposed over HTTP. This quickstart will demonstrate streaming data to one session while posting data from another using Zilla and Kafka as the backend.

- **POST** - Push a new event.
- **GET:SSE** - Stream all of the events published on the `event-sse` Kafka topic.

::: note Going Deeper
Zilla can be configured for more use cases that we aren't able to cover in this quickstart. Here are some other interesting examples you will want to check out.

- [REST proxy guide](../../concepts/kafka-proxies/sse-proxy.md)
- [Kafka fanout example](https://github.com/aklivity/zilla-examples/tree/main/sse.kafka.fanout)
- [JWT example](https://github.com/aklivity/zilla-examples/tree/main/sse.proxy.jwt)
:::

## gRPC Kafka proxy

Zilla maps the service method's request and response messages directly to Kafka topics. This can include simple RPC request-response messages, but this quickstart demonstrates `Simple-RPC`, `Server-side`, `Client-side`, and `Bidirectional` streaming RPC to a running gRPC server through the `GetFeature`, `ListFeature`, `RecordRoute`, and `RouteChat`, respectively. Zilla is routing all of the messages from the client to the server through Kafka. You can match the individual service calls on the [topics](#kafka-topics) by the matching `key` UUIDs which come from the `zilla:correlation-id` header.

- **RouteGuide** - Proxy messages through Kafka to a running gRPC server.
- **EchoService** - Zilla implements a simple message echo service.

::: note Going Deeper
Zilla can be configured for more use cases that we aren't able to cover in this quickstart. Here are some other interesting examples you will want to check out.

- [gRPC proxy guide](../../concepts/kafka-proxies/grpc-proxy.md)
- [gRPC proxy example](https://github.com/aklivity/zilla-examples/tree/main/grpc.proxy)
- [Kafka fanout example](https://github.com/aklivity/zilla-examples/tree/main/grpc.kafka.fanout)
- [Kafka proxy example](https://github.com/aklivity/zilla-examples/tree/main/grpc.kafka.proxy)
:::

## Metrics

This Zilla quickstart collects basic metrics for the [streaming](../../reference/config/telemetry/metrics/metric-stream.md), [HTTP](../../reference/config/telemetry/metrics/metric-http.md), and [gRPC](../../reference/config/telemetry/metrics/metric-grpc.md) services. Go to [http://localhost:9090/metrics](http://localhost:9090/metrics) to see the the [Prometheus](../../reference/config/telemetry/exporter/exporter-prometheus.md) exported data.
