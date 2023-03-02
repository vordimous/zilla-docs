---
description: Zilla runtime bindings
---

# binding

Each configured `binding` represents a step in the pipeline as data streams are decoded, translated or encoded according to a specific protocol `type`.

A `binding` also has a `kind`, indicating how it should behave, such as `server`, `proxy` or `client`.

As each incoming data stream arrives, the binding follows its configured `routes` to reach an `exit` binding, or rejects the stream if no routes are viable. Route matching conditions are defined in terms specific to each `binding` type.

See each of the specific `binding` types linked below for more detailed examples.

### Configuration

Each runtime `binding` has a behavioral type supporting either encoding and decoding for a specific protocol or translation between protocols.

#### Properties (generic)

| Name   | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Description                                                                                                      |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `type` | <p><code>enum [</code><br>  <a href="binding-amqp.md"><code>"amqp"</code></a> <code>,</code><br>  <a href="binding-echo.md"><code>"echo"</code></a> <code>,</code><br>  <a href="binding-fan.md"><code>"fan"</code></a> <code>,</code><br><code></code>  <a href="binding-filesystem.md"><code>"filesystem"</code></a> <code>,</code><br>  <a href="binding-http.md"><code>"http"</code></a> <code>,</code></p><p>  <a href="binding-http-filesystem.md"><code>"http-filesystem"</code></a> <code>,</code><br>  <a href="binding-http-kafka.md"><code>"http-kafka"</code></a> <code>,</code></p><p>  <a href="binding-kafka.md"><code>"kafka"</code></a> <code>,</code><br>  <a href="binding-mqtt.md"><code>"mqtt"</code></a> <code>,</code><br>  <a href="binding-proxy.md"><code>"proxy"</code></a> <code>,</code><br>  <a href="binding-sse.md"><code>"sse"</code></a> <code>,</code> </p><p>  <a href="binding-sse-kafka.md"><code>"sse-kafka"</code></a> <code>,</code><br>  <a href="binding-tcp.md"><code>"tcp"</code></a> <code>,</code><br>  <a href="binding-tls.md"><code>"tls"</code></a> <code>,</code><br>  <a href="binding-ws.md"><code>"ws"</code></a> <code>]</code></p> | Behavioral type supporting either encoding and decoding for a specific protocol or translation between protocols |

#### Properties (type-specific)

| Name      | Type               | Description                                                                                   |
| --------- | ------------------ | --------------------------------------------------------------------------------------------- |
| `kind`    | `string`           | Behavioral kind such as `server`, `client` or `proxy`                                         |
| `options` | `object`           | Type-specific options to configure the binding                                                |
| `routes`  | `array` of `route` | Type-specific conditional routing rules to reach an `exit` binding                            |
| `exit`    | `string`           | Unconditional `exit` binding acting as a default if none of the conditional routes are viable |
