---
shortTitle: metrics
description: Zilla runtime telemetry type
category:
  - Telemetry
tag:
  - Metrics
---

# Metrics

Description

```yaml
telemetry:
  metrics:
    - http.request.size
    - http.response.size
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

- [metrics](#metrics-1)
  - [http.\*](#http)
    - [http.request.size](#http-request-size)
    - [http.response.size](#http-response-size)
  - [stream.\*](#stream)
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

A list of metric keys for Zilla to capture


#### http.*

`http.*` metrics

##### http.request.size

> `number`

##### http.response.size

> `number`

#### stream.*

`stream.*` metrics

##### stream.active.received

> `number`

##### stream.active.sent

> `number`

##### stream.opens.received

> `number`

##### stream.opens.sent

> `number`

##### stream.data.received

> `number`

##### stream.data.sent

> `number`

##### stream.errors.received

> `number`

##### stream.errors.sent

> `number`

##### stream.closes.received

> `number`

##### stream.closes.sent

> `number`



---

::: right
\* required
:::
