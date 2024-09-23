---
redirectFrom: /reference/config/telemetry/metrics/metric-stream.html
shortTitle: stream

category:
  - Telemetry
tag:
  - Metrics
---

# Stream Metrics

Zilla runtime telemetry type

```yaml
telemetry:
  metrics:
    - stream.active.received
    - stream.active.sent
    - stream.opens.received
    - stream.opens.sent
    - stream.data.received
    - stream.data.sent
    - stream.errors.received
    - stream.errors.sent
    - stream.closes.received
    - stream.closes.sent
```

## Configuration

:::: note Metrics

- [metrics](#metrics)
  - [stream.active.received](#stream-active-received)
  - [stream.active.sent](#stream-active-sent)
  - [stream.opens.received](#stream-opens-received)
  - [stream.opens.sent](#stream-opens-sent)
  - [stream.data.received](#stream-data-received)
  - [stream.data.sent](#stream-data-sent)
  - [stream.errors.received](#stream-errors-received)
  - [stream.errors.sent](#stream-errors-sent)
  - [stream.closes.received](#stream-closes-received)
  - [stream.closes.sent](#stream-closes-sent)

::: right
\* required
:::

::::

### metrics

> `array` of `string`

The list of metric names available to record and export.

#### stream.active.received

> `gauge`

The number of currently active received streams.

#### stream.active.sent

> `gauge`

The number of currently active sent streams.

#### stream.opens.received

> `counter`

The number of opened received streams.

#### stream.opens.sent

> `counter`

The number of opened sent streams.

#### stream.data.received

> `counter`

The count of `bytes` of data on received streams.

#### stream.data.sent

> `counter`

The count of `bytes` of data on sent streams.

#### stream.errors.received

> `counter`

The number of errors on received streams.

#### stream.errors.sent

> `counter`

The number of errors on sent streams.

#### stream.closes.received

> `counter`

The number of closed received streams.

#### stream.closes.sent

> `counter`

The number of closed sent streams.
