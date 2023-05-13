---
shortTitle: Telemetry
description: Zilla runtime telemetry
category:
  - Telemetry
---

# Telemetry

Description

```yaml
telemetry:
  attributes:
    service.namespace: example
  exporters:
    ...
  metrics:
    ...
```

## Configuration

### attributes

> `object`

Default attributes to optionally include when exporting metrics.

### exporters

> `object` as map of named [`exporter`](exporter/README.md) properties

Map of named exporters.

### metrics

> `array` of `string` of named [`metrics`](metrics/README.md)

Array of named metrics.

---

::: right
\* required
:::
