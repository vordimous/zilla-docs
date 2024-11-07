### routes\*

> `array` of `object`

Conditional `tls` specific routes.

```yaml
routes:
  - when:
      - alpn: echo
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
      - alpn: echo
```

#### when[].authority

> `string`

Associated authority.

#### when[].alpn

> `string`

Application protocol.

#### when[].port

> `integer`, `string`, `array`

Port number(s), including port number ranges.

#### routes[].exit

> `string`

Next binding when following this route.

```yaml
routes:
  - when:
    ...
    exit: echo_server
```
