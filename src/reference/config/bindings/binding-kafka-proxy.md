---
shortTitle: kafka-proxy 
description: Zilla runtime kafka-proxy binding
icon: plus
category:
  - Binding
tag:
  - Proxy
---

# kafka-proxy Binding

[Zilla Plus](https://www.aklivity.io/products/zilla-plus)
{.zilla-plus-badge .hint-container .info}

Zilla runtime kafka-proxy binding.

```yaml {2}
kafka_proxy:
  type: kafka-proxy
  kind: proxy
  options:
    external:
      host: kafka-#.external.net
      port: 9093
    internal:
      host: b-#.kafka.internal.net
      port: 9094
  exit: tls_client
```

## Summary

Defines a binding with `kafka-proxy`  support, with `proxy` behavior.

## Configuration

:::: note Properties

- [kind\*](#kind)
- [options\*](#options)
- [options.external\*](#options-external)
  - [external.host\*](#external-host)
  - [external.port\*](#external-port)
- [options.internal\*](#options-internal)
  - [internal.host\*](#internal-host)
  - [internal.port\*](#internal-port)
- [exit\*](#exit)

::: right
\* required
:::

::::

### kind\*

> `enum` [ "proxy" ]

Behave as a `proxy`.

### options\*

> `object`

`kafka-proxy`-specific options.

```yaml
options:
  external:
    host: kafka-#.external.net
    port: 9093
  internal:
    host: b-#.kafka.internal.net
    port: 9094
```

### options.external\*

> `object`

Kafka proxy endpoint used by external clients.

```yaml
external:
  host: kafka-#.external.net
  port: 9093
```

#### external.host\*

> `string`

Hostname pattern for external Kafka broker names, where `#` is an integer.

#### external.port\*

> `integer`

Port number for external Kafka broker.

### options.internal\*

> `object`

Internal Kafka broker endpoint.

```yaml
internal:
  host: b-#.kafka.internal.net
  port: 9094
```

#### internal.host\*

> `string`

Hostname pattern for internal Kafka broker names, where `#` is an integer.

#### internal.port\*

> `integer`

Port number for internal Kafka broker.

### exit\*

> `string`

Default exit binding when no conditional routes are viable.

```yaml
exit: tls_client
```

---

::: right
\* required
:::
