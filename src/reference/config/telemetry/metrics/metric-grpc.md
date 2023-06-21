---
shortTitle: grpc
description: Zilla runtime telemetry type
category:
  - Telemetry
tag:
  - Metrics
---

# gRPC Metrics

Zilla runtime telemetry type

```yaml
telemetry:
  metrics:
    - grpc.active.requests
    - grpc.duration
    - grpc.request.size
    - grpc.response.size
    - grpc.requests.per.rpc
    - grpc.responses.per.rpc
```

## Configuration

:::: note Metrics

- [metrics](#metrics)
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

#### grpc.active.requests

> `gauge`

The number of active `grpc` requests.

#### grpc.duration

> `histogram`

The duration of `grpc` requests in `nanoseconds`

#### grpc.request.size

> `histogram`

The `grpc` request length in `bytes`.

#### grpc.response.size

> `histogram`

The `grpc` response length in `bytes`.

#### grpc.requests.per.rpc

> `histogram`

The number of `grpc` request messages per RPC.

#### grpc.responses.per.rpc

> `histogram`

The number of `grpc` response messages per RPC.

---

::: right
\* required
:::
