---
shortTitle: proxy
---

# mqtt-kafka proxy

The mqtt-kafka proxy binding for adapting MQTT topic streams to Kafka topic streams. By configuring the Kafka topics that the proxy will use to route mqtt messages and session states an `mqtt` `server` binding can allow clients to connect and proxy MQTT messages onto Kafka topics.

```yaml {3}
<!-- @include: ./.partials/proxy.yaml -->
```

## Configuration (\* required)

<!-- @include: ./.partials/options.md -->
<!-- @include: ./.partials/routes.md -->
<!-- @include: ../.partials/exit.md -->
<!-- @include: ../.partials/telemetry.md -->
