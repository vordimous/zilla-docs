### routes

> `array` of `object`

Conditional `sse` specific routes.

```yaml
routes:
  - guarded:
      my_guard:
        - read:items
    when:
      - path: /items
    exit: sse_kafka_proxy
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

List of conditions (any match) to match this route.
Read more: [When a route matches](../../../../../concepts/bindings.md#when-a-route-matches)

```yaml
routes:
  - when:
      - path: /items
```

#### when[].path

> `string`

Path pattern.

#### routes[].exit

> `string`

Next binding when following this route.

```yaml
routes:
  - when:
    ...
    exit: sse_kafka_proxy
```
