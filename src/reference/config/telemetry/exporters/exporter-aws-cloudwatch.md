---
shortTitle: aws cloudwatch
description: Zilla runtime aws cloudwatch exporter
icon: aky-zilla-plus
  - Telemetry
tag:
  - Exporters
---

# aws-cloudwatch Exporter

[Available in <ZillaPlus/>](https://www.aklivity.io/products/zilla-plus)
{.zilla-plus-badge .hint-container .info}

Zilla runtime aws cloudwatch exporter.

```yaml {3}
exporters:
  aws_cloudwatch:
    type: aws-cloudwatch
    options:
      metrics:
        namespace: zilla-metrics
        interval: 20
      logs:
        group: zilla-log-group
        stream: zilla-log-stream
```

## Summary

Specifies an exporter for transmitting Custom Metrics and Log Events to AWS CloudWatch.

## Configuration

:::: note Properties

- [options](#options)
- [options.metrics](#options-metrics)
  - [metrics.namespace\*](#metrics-namespace)
  - [metrics.interval](#metrics-interval)
- [options.logs](#options-logs)
  - [logs.group\*](#logs-group)
  - [logs.stream\*](#logs-stream)

::: right
\* required
:::

::::

### options

> `object`

`aws`-specific options.

```yaml
options:
  metrics:
    namespace: zilla-metrics
    interval: 20
  logs:
    group: zilla-log-group
    stream: zilla-log-stream
```

### options.metrics

> `object`

Configuration for transmitting custom metric data points to Amazon CloudWatch.

#### metrics.namespace\*

> `string`

The namespace for the metric data.

To avoid conflicts with Amazon Web Services service namespaces, you should not specify a namespace that begins with `AWS/`.

#### metrics.interval

> `integer`

Interval in seconds to push data to the Amazon CloudWatch. Default: 30 seconds.

### options.logs

> `object`

Configuration for transmitting log events to Amazon CloudWatch.

#### logs.group\*

> `string`

The name of the log group.

#### logs.stream\*

> `string`

The name of the log stream.

---

::: right
\* required
:::
