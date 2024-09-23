---
redirectFrom: /reference/config/telemetry/metrics/metric-grpc.html
shortTitle: grpc

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
  - [grpc.active.requests](#grpc-active-requests)
  - [grpc.duration](#grpc-duration)
  - [grpc.request.size](#grpc-request-size)
  - [grpc.response.size](#grpc-response-size)
  - [grpc.requests.per.rpc](#grpc-requests-per-rpc)
  - [grpc.responses.per.rpc](#grpc-responses-per-rpc)

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
