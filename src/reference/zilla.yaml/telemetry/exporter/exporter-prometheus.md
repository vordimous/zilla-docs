---
shortTitle: prometheus
description: Zilla runtime telemetry exporters
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
          path: /metrics
          port: 9090
```

## Configuration

:::: note Properties

- [options](#options)
  - [options.endpoints](#options-endpoints)
    - [endpoints\[\].scheme](#endpoints-scheme)

::: right
\* required
:::

::::

### options

#### options.endpoints

##### endpoints[].scheme

---

::: right
\* required
:::
