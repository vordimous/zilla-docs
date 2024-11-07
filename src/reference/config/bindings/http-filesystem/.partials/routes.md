### routes

> `array` of `object`

Conditional `http-kafka` specific routes.

```yaml
routes:
  - when:
      - path: /{path}
    exit: filesystem_server
    with:
      path: ${params.path}
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

List of conditions (any match) to match this route when adapting `http` data streams into `filesystem` data streams.
Read more: [When a route matches](../../../../../concepts/bindings.md#when-a-route-matches)

```yaml
routes:
  - when:
      - path: /{path}
```

#### when[].path

> `string`

Path with optional embedded parameter names, such as `/{path}`.

#### routes[].exit

> `string`

Next binding when following this route.

```yaml
routes:
  - when:
    ...
    exit: filesystem_server
```

#### routes[].with

> `object`

Filesystem parameters used when adapting `http` data streams into `filesystem` data streams.

#### with.path\*

> `string`

Topic name, optionally referencing path parameter such as `${params.path}`.
