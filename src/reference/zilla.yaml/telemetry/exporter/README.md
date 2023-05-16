---
shortTitle: Exporters
description: Zilla runtime telemetry exporters
category:
  - Telemetry
tag:
  - Exporters
---

# Exporters

Each configured `exporter` integrates with an external monitoring system to expose Zilla metrics.

## Configuration

Each runtime `exporter` has a behavioral type to support an external monitoring system.

### Properties (generic)

### type\*

> `enum` \[\
> ["prometheus"](exporter-prometheus.md),\
> \]

Behavioral type supporting a specific external monitoring system.

### Properties (type-specific)

### options

> `object`

Type-specific options to configure the exporter.

---

::: right
\* required
:::
