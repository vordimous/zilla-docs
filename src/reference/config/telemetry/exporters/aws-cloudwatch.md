---
redirectFrom: /reference/config/telemetry/exporters/exporter-aws-cloudwatch.html
shortTitle: aws-cloudwatch
icon: aky-zilla-plus
category:
  - Telemetry
  - Exporters
tag:
  - aws-cloudwatch
---

# aws-cloudwatch Exporter

Specifies an exporter for transmitting Custom Metrics and Log Events to AWS CloudWatch.

[Available in <ZillaPlus/>](https://www.aklivity.io/products/zilla-plus)
{.zilla-plus-badge .hint-container .info}

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

## Configuration (\* required)

### options

> `object`

The `aws` specific options.

```yaml
options:
  metrics:
    namespace: zilla-metrics
    interval: 20
  logs:
    group: zilla-log-group
    stream: zilla-log-stream
```

#### options.metrics

> `object`

Configuration for transmitting custom metric data points to Amazon CloudWatch.

#### metrics.namespace\*

> `string`

The namespace for the metric data.

To avoid conflicts with Amazon Web Services service namespaces, you should not specify a namespace that begins with `AWS/`.

#### metrics.interval

> `integer` | Default: `30`

Interval in seconds to push data to the Amazon CloudWatch.

#### options.logs

> `object`

Configuration for transmitting log events to Amazon CloudWatch.

#### logs.group\*

> `string`

The name of the log group.

#### logs.stream\*

> `string`

The name of the log stream.
