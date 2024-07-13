# Telemetry

Zilla captures telemetry data in [metrics](#metrics) and [events](#events). The data can then be accessed outside of Zilla by configuring [exporters](#exporters) to chose how and where to see the telemetry data. You can see logs and metrics with the [Telemetry Intro](../tutorials/telemetry/telemetry-intro.md) example.

```yaml
telemetry:
  metrics:
    - http.duration
  exporters:
    stdout_logs_exporter:
      type: stdout
```

## Metrics

[Metrics](../reference/config/overview.md#metrics) are separated by protocol where the `stream` metrics relate to Zilla's internal message handler. The other protocols have common metrics you would expect to find. The [zilla metrics](../reference/config/zilla-cli.md#zilla-metrics) command can be used to see the raw metrics that Zilla has collected.

## Events

[Events](../reference/config/telemetry/events.md) in Zilla signal important activities and collect relevant information along with them. Primarily they are useful when troubleshooting common issues like model validation or failed secure access, but they provide more observability with the HTTP access information. The easiest way to see logged events in Zilla is to add the [stdout](../reference/config/telemetry/exporters/exporter-stdout.md) exporter to your `zilla.yaml` config.

## Exporters

[Exporters](../reference/config/overview.md#exporters) will determine how the collected telemetry data is exposed. The [Prometheus](../reference/config/telemetry/exporters/exporter-prometheus.md) exporter Zilla will expose any configured [metrics](../reference/config/overview.md#metrics) via the standard `/metrics` endpoint that is by prometheus to collect metrics. The [stdout](../reference/config/telemetry/exporters/exporter-stdout.md) exporter will simply log all [Events](#events) to the host `stdout` and can be collected by any log aggregator. The [OpenTelemetry Protocol](../reference/config/telemetry/exporters/exporter-otlp.md) exporter can push both logs and metrics telemetry data to the specified.
