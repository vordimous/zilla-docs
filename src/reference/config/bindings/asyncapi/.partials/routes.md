### routes

> `array` of `object`

Conditional `asyncapi` specific routes.

```yaml
    routes:
      - when:
          - api-id: my-mqtt-api-spec
            operation-id: sendEvents
        exit: asyncapi_client
        with:
          api-id: my-kafka-api-spec
          operation-id: toSensorData
      - when:
          - api-id: my-mqtt-api-spec
            operation-id: receiveEvents
        exit: asyncapi_client
        with:
          api-id: my-kafka-api-spec
          operation-id: onSensorData
```

#### routes[].guarded

> `object` as map of named `array` of `string`

List of roles required by each named guard to authorize this route.

```yaml
routes:
  - guarded:
      my_guard:
        - read:items
```

#### routes[].when

> `array` of `object`

List of conditions to match this route when adapting `asyncapi` MQTT streams to `asyncapi` Kafka streams.
Read more: [When a route matches](../../../../../concepts/bindings.md#when-a-route-matches)

#### when[].api-id

> `string`

AsyncAPI spec identifier that matches from `asyncapi` binding MQTT stream.

#### when[].operation-id

> `string`

AsyncAPI OperationId that can be mapped between AsyncAPI MQTT and AsyncAPI Kafka spec

#### routes[].with

> `object`

Defines the route with the AsyncAPI spec identifier and OperationId.

```yaml
with:
  api-id: my-asyncapi-spec
```

#### with.api-id

> `string`

AsyncAPI spec identifier that the route exits with to the next binding.

#### with.operation-id

> `string`

AsyncAPI OperationId that the route exits with to the next binding.
