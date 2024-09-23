### options

> `object`

The `tcp` specific options.

```yaml
options:
  host: 0.0.0.0
  port: 12345
```

#### options.host

> `string`

Hostname or IP address.

#### options.port

> `integer`, `string`, `array`

Port number(s), including port number ranges with the pattern: `^\\d+(-\\d+)?$`.

```yaml
options:
  port: 12345
```

```yaml
options:
  port:
    - 12345
    - "54320-54330"
```
