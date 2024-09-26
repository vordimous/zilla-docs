### routes

> `array` of `object`

Conditional `amqp` specific routes.

```yaml
routes:
  - when:
      - address: echo
        capabilities: send_and_receive
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
      - address: echo
        capabilities: send_and_receive
```

#### when[].address

> `string`

Link address.

#### when[].capabilities

> `enum` [ `send_only`, `receive_only`, `send_and_receive` ] | Default: `send_and_receive`

Send or receive, or both.

#### routes[].exit

> `string`

Next binding when following this route.

```yaml
routes:
  - when:
    ...
    exit: echo_server
```
