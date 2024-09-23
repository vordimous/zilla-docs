### routes\*

> `array` of `object`

Conditional `grpc-kafka` specific routes.

```yaml
routes:
  - guarded:
      my_guard:
        - read:messages
    when:
      - service: example.FanoutService
        metadata:
          custom-text: custom value
          custom-binary:
            base64: Y3VzdG9tIHZhbHVl
    exit: kafka_cache_client
    with:
      capability: fetch
      topic: messages
      filters:
        key: custom-key
        headers:
          custom-text: custom-value
  - guarded:
      my_guard:
        - echo:messages
    when:
      - method: example.EchoService/*
        metadata:
          custom-text: custom value
          custom-binary:
            base64: Y3VzdG9tIHZhbHVl
    exit: kafka_cache_client
    with:
      capability: produce
      topic: requests
      acks: leader_only
      key: custom-key
      overrides:
        custom-text: custom-value
      reply-to: responses
```

#### routes[].guarded

> `object` as map of named `array` of `string`

Roles required by named guard.

```yaml
routes:
  - guarded:
      my_guard:
        - read:messages
```

#### routes[].when

> `array` of `object`

List of conditions (any match) to match this route when adapting `grpc` request-response streams to `kafka` topic streams.
Read more: [When a route matches](../../../../../concepts/bindings.md#when-a-route-matches)

```yaml
routes:
  - when:
      - method: example.EchoService/*
        metadata:
          custom-text: custom value
          custom-binary:
            base64: Y3VzdG9tIHZhbHVl
```

#### when[].method

> `string` | Pattern: `^(?<Service>[^/]+)/(?<Method>[^/]+)`

Pattern matching the fully qualified name of a `grpc` service method, in the format `<service>/<method>` allowing wildcard `*` for the method to indicate any method.

#### when[].metadata

> `object` as map of named `string` or `object` properties

Metadata header name value pairs (all match).

Each metadata header value can be `string` or `object` with `base64` property.

#### metadata.base64

> `string`

Base64 encoded value for binary metadata header.

#### routes[].exit

> `string`

Next binding when following this route.

```yaml
routes:
  - when:
    ...
    exit: kafka_cache_client
```

#### routes[].with\*

> `object`

Defines the route with the [fetch](#with-capability-fetch) capability.

```yaml
with:
  capability: fetch
```

Defines the route with the [produce](#with-capability-produce) capability.

```yaml
with:
  capability: produce
```

#### with.capability: fetch\*

> `const`

Kafka parameters for matched route when adapting `grpc` request-response streams to `kafka` topic fetch streams.

Routes with `fetch` capability map `grpc` `Empty` requests to a `kafka` topic, supporting filtered retrieval of messages with a specific key or headers, or unfiltered retrieval of all messages in the topic merged into a unified response.

Filtering can be performed by `kafka` message key, message headers, or a combination of both message key and headers.

Reliable message delivery is achieved by capturing the value of the `reliability` `field` injected into each response stream message at the `grpc` client, and replaying the value via the `reliability` `metadata` header when reestablishing the stream with a new `grpc` request.

```yaml
with:
  capability: fetch
  topic: messages
  filters:
    key: custom-key
    headers:
      custom-text: custom-value
```

#### with.topic\*

> `string`

The name of a Kafka topic.

#### with.filters

> `array` of `object`

List of criteria (any match) to this filter. Kafka filters for matched route when adapting `grpc` request-response streams to `kafka` topic fetch streams. All specified headers and key must match for the combined criteria to match.

#### filters[].key

> `string`

The filter criteria for the Kafka message key.

#### filters[].headers

> `object` as map of named `string` properties

The filter criteria for the Kafka message headers.

#### with.capability: produce\*

> `const`

Kafka parameters for matched route when adapting `grpc` request-response streams to `kafka` topic produce streams.

Routes with `produce` capability map any `grpc` request-response to a correlated stream of `kafka` messages. The `grpc` request message(s) are sent to a `requests` topic, with a `zilla:correlation-id` header. When the request message(s) are received and processed by the `kafka` `requests` topic consumer, it produces response message(s) to the `responses` topic, with the same `zilla:correlation-id` header to correlate the response.

Requests including an `idempotency-key` `grpc` metadata header can be replayed and safely receive the same response. This requires the `kafka` consumer to detect and ignore the duplicate request with the same `idempotency-key` and `zilla:correlation-id`.

```yaml
with:
  capability: produce
  topic: requests
  acks: leader_only
  key: custom-key
  overrides:
    custom-text: custom-value
  reply-to: responses
```

<!-- markdownlint-disable MD024 -->
#### with.topic\*

> `string`

The name of a Kafka topic for requests.
<!-- markdownlint-enable MD024 -->

#### with.acks

> `enum` [ `none`, `leader_only`, `in_sync_replicas` ] | Default: `in_sync_replicas`

Kafka acknowledgment mode

#### with.key

> `string`

The Kafka message key to include with each message.

#### with.overrides

> `object` as map of named `string` properties

The Kafka message headers to inject with each message.

#### with.reply-to\*

> `string`

The name of the Kafka topic for correlated responses.
