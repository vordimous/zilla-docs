
### routes\*

> `array` of `object`

Conditional `grpc` specific routes.

```yaml
routes:
  - guarded:
      my_guard:
        - echo:messages
    when:
      - method: example.EchoService/*
        metadata:
          custom-text: custom value
          custom-binary:
            base64: Y3VzdG9tIHZhbHVl
    exit: echo_server
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

List of conditions (any match) to match this route.
Read more: [When a route matches](../../../../../concepts/bindings.md#when-a-route-matches)

```yaml
routes:
    when:
      - method: example.EchoService/*
        metadata:
          custom-text: custom value
          custom-binary:
            base64: Y3VzdG9tIHZhbHVl
```

#### when[].method

> `string`

gRPC service method name, such as `example.EchoService/EchoUnary`, or service method pattern such as `example.EchoService/*`.

#### when[].metadata

> `object` as map of named `string` or `object` properties

Metadata header name value pairs (all match).

Each metadata header value can be `string` or `object` with `base64` property.

#### metadata.base64

> `string`

Base64 encoded value for binary metadata header.

#### routes[].exit

> `string`

Routed exit binding when conditional route matches.

```yaml
routes:
  - when:
    ...
    exit: echo_server
```
