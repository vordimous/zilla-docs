### routes

> `array` of `object`

Conditional `openapi-asyncapi` specific routes.

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

List of conditions to match this route when adapting `openapi` request-response streams to `asyncapi` streams.
Read more: [When a route matches](../../../../../concepts/bindings.md#when-a-route-matches)

#### when[].api-id

> `string`

OpenAPI spec identifier that matches from the `openapi` binding request stream.

#### when[].operation-id

> `string`

OpenAPI OperationId that can be mapped between OpenAPI and AsyncAPI spec

#### routes[].exit

> `string`

Next binding when following this route.

```yaml
routes:
  - when:
    ...
    exit: asyncapi_client
```

#### routes[].with\*

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
