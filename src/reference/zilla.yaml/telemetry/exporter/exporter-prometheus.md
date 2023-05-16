---
shortTitle: prometheus
description: Zilla runtime prometheus exporter
category:
  - Telemetry
tag:
  - Exporters
---

# Exporters

Description


```yaml {3}
exporters:
  prometheus0:
    type: prometheus
    options:
      endpoints:
        - scheme: http
          port: 9090
          path: /metrics
```

## Configuration

:::: note Properties

- [options](#options)
  - [options.endpoints](#options-endpoints)
    - [endpoints\[\].scheme](#endpoints-scheme)
    - [endpoints\[\].port](#endpoints-port)
    - [endpoints\[\].path](#endpoints-path)

::: right
\* required
:::

::::

### options

> `object`

`prometheus`-specific options.

```yaml
options:
  endpoints:
    - scheme: http
      port: 9090
      path: /metrics
```

#### options.endpoints

> `array` of `object`

Contains `prometheus` endpoints.

##### endpoints[].scheme

> `enum` [ "http" ]

URL scheme to accept for endpoint.

##### endpoints[].port

> `int`

URL port to accept for endpoint.

##### endpoints[].path

> `string`

URL path to accept for endpoint.

---

::: right
\* required
:::
