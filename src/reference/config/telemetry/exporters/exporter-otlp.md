---
shortTitle: otlp
description: Zilla runtime otlp exporter
category:
  - Telemetry
tag:
  - Exporters
---

# OpenTelemetry Protocol Exporter

The Zilla runtime [OpenTelemetry Protocol](https://github.com/open-telemetry/oteps/blob/main/text/0035-opentelemetry-protocol.md) exporter publishes data to a [Collector](https://opentelemetry.io/docs/collector/).

```yaml {3}
exporters:
  otlp:
    type: otlp
    options:
      interval: 30
      signals:
        - metrics
      endpoint:
        protocol: http
        location: http://otlp-collector:4318/v1/metrics
```

## Configuration

:::: note Properties

- [options\*](#options)
  - [options.interval](#options-interval)
  - [options.signals](#options-signals)
  - [options.endpoint\*](#options-endpoint)
    - [endpoint.protocol](#endpoint-protocol)
    - [endpoint.location\*](#endpoint-location)

::: right
\* required
:::

::::

### options

> `object`

`otlp`-specific options.

```yaml
options:
  interval: 30
  signals:
    - logs
    - metrics
  endpoint:
    protocol: http
    location: http://otlp-collector:4318/v1/metrics
```

#### options.interval

> `integer` | Default: `30`

Interval in seconds to push data to the collector.

#### options.signals

> `array` of of `enum` [ "logs", "metrics" ]

Specifies what signals should be exported. The default behavior is to export all supported signals.

#### options.endpoint

> `object`

Contains details for the OpenTelemetry Protocol collector endpoint.

##### endpoint.protocol

> `string`

Specifies the protocol to use for exporting data. Currently only `http` is supported. The default is `http`.

##### endpoint.location\*

> `string`

The URL of the collector.

---

::: right
\* required
:::
