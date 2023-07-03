---
shortTitle: http
description: Zilla runtime telemetry type
category:
  - Telemetry
tag:
  - Metrics
---

# HTTP Metrics

Zilla runtime telemetry type

```yaml
telemetry:
  metrics:
    - http.active.requests
    - http.duration
    - http.request.size
    - http.response.size
```

## Configuration

:::: note Metrics

- [metrics](#metrics)
  - [http.active.requests](#http-active-requests)
  - [http.duration](#http-duration)
  - [http.request.size](#http-request-size)
  - [http.response.size](#http-response-size)


::: right
\* required
:::

::::

### metrics

> `array` of `string`

The list of metric names available to record and export.

#### http.active.requests

> `gauge`

The number of active `http` requests.

#### http.duration

> `histogram`

The duration of `http` requests in `nanoseconds`

#### http.request.size

> `histogram`

The `http` request content length in `bytes`.

#### http.response.size

> `histogram`

The `http` response content length in `bytes`.

---

::: right
\* required
:::
