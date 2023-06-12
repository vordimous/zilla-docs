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
    - grpc.active.requests
    - grpc.duration
    - grpc.request.size
    - grpc.response.size
    - grpc.requests.per.rpc
    - grpc.responses.per.rpc
    - http.active.requests
    - http.duration
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
  - [grpc.\*](#grpc)
    - [grpc.active.requests](#grpc-active-requests)
    - [grpc.duration](#grpc-duration)
    - [grpc.request.size](#grpc-request-size)
    - [grpc.response.size](#grpc-response-size)
    - [grpc.requests.per.rpc](#grpc-requests-per-rpc)
    - [grpc.responses.per.rpc](#grpc-responses-per-rpc)
  - [http.\*](#http)
    - [http.active.requests](#http-active-requests)
    - [http.duration](#http-duration)
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

The list of metric names available to record and export.

#### grpc.*

`grpc.*` metrics

##### grpc.active.requests

> `gauge`

The number of active `grpc` requests.

##### grpc.duration

> `histogram`

The duration of `grpc` requests in `nanoseconds`

##### grpc.request.size

> `histogram`

The `grpc` request length in `bytes`.

##### grpc.response.size

> `histogram`

The `grpc` response length in `bytes`.

##### grpc.requests.per.rpc

> `histogram`

The number of `grpc` request messages per RPC.

##### grpc.responses.per.rpc

> `histogram`

The number of `grpc` response messages per RPC.

#### http.*

`http.*` metrics

##### http.active.requests

> `gauge`

The number of active `http` requests.

##### http.duration

> `histogram`

The duration of `http` requests in `nanoseconds`

##### http.request.size

> `histogram`

The `http` request content length in `bytes`.

##### http.response.size

> `histogram`

The `http` response content length in `bytes`.

#### stream.*

`stream.*` metrics

##### stream.active.received

> `gauge`

The number of currently active received streams.

##### stream.active.sent

> `gauge`

The number of currently active sent streams.

##### stream.opens.received

> `counter`

The number of opened received streams.

##### stream.opens.sent

> `counter`

The number of opened sent streams.

##### stream.data.received

> `counter`

The count of `bytes` of data on received streams.

##### stream.data.sent

> `counter`

The count of `bytes` of data on sent streams.

##### stream.errors.received

> `counter`

The number of errors on received streams.

##### stream.errors.sent

> `counter`

The number of errors on sent streams.

##### stream.closes.received

> `counter`

The number of closed received streams.

##### stream.closes.sent

> `counter`

The number of closed sent streams.

---

::: right
\* required
:::
