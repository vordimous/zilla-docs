### routes\*

> `array` of `object`

Conditional `ws` specific routes.

```yaml
routes:
  - when:
      - protocol: echo
  exit: echo_server
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
      - protocol: echo
```

#### when[].protocol

> `string`

Subprotocol pattern.

#### when[].scheme

> `string`

Scheme pattern.

#### when[].authority

> `string`

Authority pattern.

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
    exit: echo_server
```
