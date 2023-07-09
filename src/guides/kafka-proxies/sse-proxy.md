# SSE Proxy

There is an increasing rise in integrating the event stream into front ends where companies are starting to adopt Server-sent Events (SSE) standards. `SSE` naturally fits into the event-driven architecture and you will be able to take advantage of all the benefits it provides such as SDK-free and the ability to auto-reconnect in case of an unstable connection(Be resilient to faults). Zilla supports SSE protocol that you can easily configure the frontend SSE with Kafka topic.

A brief explanation of replaceable values from the config examples below:

- `ENDPOINT_PATH`: HTTP path for example `/tasks`
- `KAFKA_TOPIC`: The Kafka topic that you want to stream from

### Configure Endpoint

Configuring `Zilla` with SSE endpoint  and Kafka binding is as simple as it is shown below:

::: code-tabs#yaml

@tab zilla.yaml

```yaml
sse_server0:
  type: sse
  kind: server
  exit: sse_kafka_proxy0
sse_kafka_proxy0:
  type: sse-kafka
  kind: proxy
  routes:
    - when:
        - path: ENDPOINT_PATH
      with:
        topic: KAFKA_TOPIC
        event:
          id: '["${base64(key)}","${etag}"]'
      exit: kafka_cache_client0

```

:::

As shown above you can describe your event id in case you want to retrieve the message `key` or `etag`.

### Authorization

Similar to [REST Proxy](../../guides/kafka-proxies/rest-proxy.md) you can secure the `SSE` endpoints as well which allows you to continuously authorize the stream which unlike `HTTP` request, `SSE` is a long-lived connection.

### More

For the full capability of `SSE` configure you can check out Zilla Runtime Configuration Reference: [SSE Binding](../../reference/config/bindings/binding-sse.md), [SSE-Kafka Binding](../../reference/config/bindings/binding-sse-kafka.md).
