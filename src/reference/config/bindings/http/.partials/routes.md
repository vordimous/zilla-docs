### routes\*

> `array` of `object`

Conditional `http` specific routes.

```yaml
routes:
  - when:
      - headers:
          ":scheme": https
          ":authority": example.com:443
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
      - headers:
          ":scheme": https
          ":authority": example.com:443
```

#### when[].headers

> `object` as map of named `string` properties

Header name value pairs (all match).

#### routes[].with

> `object`

HTTP parameters for matched route when `http` streams.

```yaml
routes:
  - with:
      headers:
        overrides:
          ":scheme": https
          ":authority": example.com:443
```

#### with.headers

> `object`

Options for headers when adapting a route.

#### headers.overrides

> `object` as map of named `string` properties

HTTP header name value pairs overrides.

#### routes[].exit

> `string`

Next binding when following this route.

```yaml
routes:
  - when:
    ...
    exit: echo_server
```
