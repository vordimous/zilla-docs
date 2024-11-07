### routes\*

> `array` of `object`

Conditional `kafka-grpc` specific routes.

```yaml
routes:
  - guarded:
      my_guard:
        - echo:messages
    when:
      - topic: requests
        reply-to: responses
        method: example.EchoService/*
    exit: grpc
    with:
      scheme: http
      authority: localhost:7151
```

#### routes[].guarded

> `object` as map of named `array` of `string`

Roles required by named guard.

```yaml
routes:
  - guarded:
      my_guard:
        - echo:messages
```

#### routes[].when

> `array` of `object`

List of conditions (any match) to match this route when adapting `kafka` topic streams to `grpc` request-response streams.
Read more: [When a route matches](../../../../../concepts/bindings.md#when-a-route-matches)

```yaml
routes:
  - when:
      - topic: requests
        reply-to: responses
        method: example.EchoService/*
```

#### when[].topic\*

> `string`

The name of a Kafka topic for requests.

#### when[].key

> `string`

The name of a Kafka topic for requests.

#### when[].headers

> `object` as map of named `string` properties

Header name value pairs (all match).

#### when[].reply-to\*

> `string`

The name of the Kafka topic for correlated responses.

#### when[].method

> `string` | Pattern: `^(?<Service>[^/]+)/(?<Method>[^/]+)`

Pattern matching the fully qualified name of a `grpc` service method, in the format `<service>/<method>` allowing wildcard `*` for the method to indicate any method.

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

Kafka parameters for matched route when adapting `grpc` request-response streams to `kafka` topic fetch streams.

```yaml
with:
  scheme: http
  authority: localhost:7151
```

#### with.scheme\*

> `string`

The `grpc` request scheme.

#### with.authority\*

> `string`

The `grpc` request authority.
