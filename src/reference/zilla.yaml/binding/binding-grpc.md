---
shortTitle: grpc  🚧
description: Zilla runtime grpc binding
category:
  - Binding
tag:
  - Server
  - Client
---

# grpc Binding 🚧

Zilla runtime grpc binding.

```yaml {2}
grpc_server0:
  type: grpc
  kind: server
  options:
    services:
      - proto/echo.proto
  routes:
    - when:
        - method: example.EchoService/*
          metadata:
            custom-text: custom value
            custom-binary:
              base64: Y3VzdG9tIHZhbHVl
      exit: echo_server0
```

## Summary

Defines a binding with `grpc` protocol support, with `server` or `client` behavior.

The `server` kind `grpc` binding adapts `http` request-response streams to `grpc` request-response streams, with support for both `application/grpc+proto` and `application/grpc-web+proto` content types.

The `client` kind `grpc` binding adapts `grpc` request-response streams to `http` request-response streams.

## Configuration

:::: note Properties

- [kind\*](#kind)
- [options](#options)
  - [options.services](#options-services)
- [exit](#exit)
- [routes](#routes)
- [routes\[\].guarded](#routes-guarded)
- [routes\[\].when](#routes-when)
  - [when\[\].method](#when-method)
  - [when\[\].metadata](#when-metadata)
      - [metadata.base64](#metadata-base64)
- [routes\[\].exit\*](#routes-exit)

::: right
\* required
:::

::::

### kind\*

> `enum` [ "client", "server" ]

Behave as a `grpc` `client` or `server`.

```yaml
kind: server
```

### options

> `object`

`grpc`-specific options.

```yaml
options:
  services:
    - proto/echo.proto
```

#### options.services

> `array` of `string`

Protobuf service definition filenames, typically with `.proto` filename extension.

### exit

> `string`

Default exit binding when no conditional routes are viable.

```yaml
exit: echo_server0
```

### routes

> `array` of `object`

Conditional `grpc`-specific routes.

```yaml
routes:
  - guarded:
      test0:
        - echo:messages
    when:
      - method: example.EchoService/*
        metadata:
          custom-text: custom value
          custom-binary:
            base64: Y3VzdG9tIHZhbHVl
    exit: echo_server0
```

### routes[].guarded

> `object` as named map of `string:string` `array`

Roles required by named guard.

```yaml
routes:
  - guarded:
      test0:
        - echo:messages
```

### routes[].when

> `array` of `object`

List of conditions (any match) to match this route.

```yaml
routes:
    when:
      - method: example.EchoService/*
        metadata:
          custom-text: custom value
          custom-binary:
            base64: Y3VzdG9tIHZhbHVl
```

#### when[].method

> `string`

gRPC service method name, such as `example.EchoService/EchoUnary`, or service method pattern such as `example.EchoService/*`.

#### when[].metadata

> `object` of name-value headers

Metadata header name value pairs (all match).

Each metadata header value can be `string` or `object` with `base64` property.

##### metadata.base64

> `string`

Base64 encoded value for binary metadata header.

### routes[].exit\*

> `string`

Routed exit binding when conditional route matches.

```yaml
exit: echo_server0
```

---

::: right
\* required
:::
