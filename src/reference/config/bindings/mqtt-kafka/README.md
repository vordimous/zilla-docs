---
redirectFrom: /reference/config/bindings/binding-mqtt-kafka.html
dir:
  collapsible: false
  link: true
shortTitle: mqtt-kafka
category:
  - Binding
tag:
  - mqtt-kafka
  - proxy
---

# mqtt-kafka Binding

Defines a binding with `mqtt-kafka` support.

## proxy

> [Full config](./proxy.md)

Behave as a `mqtt-kafka` `proxy` for adapting MQTT topic streams to Kafka topic streams. By configuring the Kafka topics that the proxy will use to route mqtt messages and session states an `mqtt` `server` binding can allow clients to connect and proxy MQTT messages onto Kafka topics.

```yaml {3}
<!-- @include: ./.partials/proxy.yaml -->
```
