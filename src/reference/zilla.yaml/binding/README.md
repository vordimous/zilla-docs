---
shortTitle: Bindings
description: Zilla runtime bindings
category:
  - Binding
tag:
  - Client
  - Proxy
  - Server
---

# Bindings

Each configured `binding` represents a step in the pipeline as data streams are decoded, translated or encoded according to a specific protocol `type`.

A `binding` also has a `kind`, indicating how it should behave, such as `server`, `proxy` or `client`.

As each incoming data stream arrives, the binding follows its configured `routes` to reach an `exit` binding, or rejects the stream if no routes are viable. Route matching conditions are defined in terms specific to each `binding` type.

See each of the specific `binding` types linked below for more detailed examples.

## Configuration

Each runtime `binding` has a behavioral type supporting either encoding and decoding for a specific protocol or translation between protocols.

### Properties (generic)

### type

> `enum` \[\
> ["amqp"](binding-amqp.md),\
> ["echo"](binding-echo.md),\
> ["fan"](binding-fan.md),\
> ["filesystem"](binding-filesystem.md),\
> ["grpc"](binding-grpc.md),\
> ["grpc-kafka"](binding-grpc-kafka.md),\
> ["http"](binding-http.md),\
> ["http-filesystem"](binding-http-filesystem.md),\
> ["http-kafka"](binding-http-kafka.md),\
> ["kafka"](binding-kafka.md),\
> ["kafka-grpc"](binding-kafka-grpc.md),\
> ["mqtt"](binding-mqtt.md),\
> ["mqtt-kafka"](binding-mqtt-kafka.md),\
> ["proxy"](binding-proxy.md),\
> ["sse"](binding-sse.md),\
> ["sse-kafka"](binding-sse-kafka.md),\
> ["tcp"](binding-tcp.md),\
> ["tls"](binding-tls.md),\
> ["ws"](binding-ws.md)\
> \]

Behavioral type supporting either encoding and decoding for a specific protocol or translation between protocols.

### telemetry

> `object`

Telemetry properties for the binding.

### telemetry.metrics

> `array` of `string`

Metric names to record for the binding.


### Properties (type-specific)

### kind

> `string`

Behavioral kind such as `server`, `client` or `proxy`.

### options

> `object`

Type-specific options to configure the binding.

### routes

> `array` of `object`

Type-specific conditional routing rules to reach an `exit` binding.

### routes[].exit

> `string`

Unconditional `exit` binding acting as a default if none of the conditional routes are viable.

---

::: right
\* required
:::
