---
redirectFrom: /reference/config/bindings/binding-mqtt.html
dir:
  collapsible: false
  link: true
shortTitle: mqtt
category:
  - Binding
tag:
  - mqtt
  - server
  - client
---

# mqtt Binding

Defines a binding with `mqtt` protocol support, with `server` behavior.

## server

> [Full config](./server.md)

The `server` kind `mqtt` binding decodes the MQTT protocol on the inbound network stream, producing higher level application streams for each `publish` or `subscribe` MQTT topic. The `session` state is also described by a higher level application stream.

Conditional routes based on the MQTT topic name are used to route these application streams to an `exit` binding.

```yaml {3}
<!-- @include: ./.partials/server.yaml -->
```

## client

> [Full config](./client.md)

The `client` kind `mqtt` binding encodes the MQTT protocol to the outbound network stream.

```yaml {3}
<!-- @include: ./.partials/client.yaml -->
```
