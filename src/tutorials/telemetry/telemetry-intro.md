---
description: Running these Zilla samples will introduce enabling logs & metrics.
---

# Telemetry Logs & Metrics Intro

Get started with Zilla by deploying our Docker image. Before proceeding, you should have [Docker](https://docs.docker.com/get-docker/) installed.

## Standard Out Logs & Prometheus Metrics

Running this Zilla sample will collect basic metrics for an http service.

::: code-tabs#yaml

@tab zilla.yaml

```yaml {13,16}
<!-- @include: ./telemetry_zilla.yaml -->
```

:::

### Run Zilla with telemetry

Run the Zilla docker image as a daemon with the `zilla.yaml` file volume mounted.

```bash:no-line-numbers
<!-- @include: ./telemetry_docker_run.sh#run_command -->
```

### Send an HTTP POST

```bash:no-line-numbers
<!-- @include: ./telemetry_docker_run.sh#test_zilla -->
```

```output:no-line-numbers
Hello, world
```

### Viewing Standard Out Logs

```bash:no-line-numbers
<!-- @include: ./telemetry_docker_run.sh#see_logs -->
```

```output:no-line-numbers
started
Metrics-example.north_http_server [08/May/2024:18:46:13 +0000] REQUEST_ACCEPTED - http POST localhost:7114 /
Metrics-example.north_http_server [08/May/2024:18:46:14 +0000] REQUEST_ACCEPTED - http POST localhost:7114 /
```

### Viewing Prometheus Metrics

Go to <http://localhost:7190/metrtics> to see the collected data or run the below `curl` command.

```bash:no-line-numbers
<!-- @include: ./telemetry_docker_run.sh#see_metrics -->
```

```output:no-line-numbers
# TYPE stream_opens_sent_total counter
stream_opens_sent_total{namespace="Metrics-example",binding="tcp_server"} 2

# HELP stream_closes_sent_total Number of closed sent streams
stream_closes_sent_total{namespace="Metrics-example",binding="tcp_server"} 2

# HELP http_request_size_bytes HTTP request content length
...
http_request_size_bytes_sum{namespace="Metrics-example",binding="http_server"} 30

# HELP http_response_size_bytes HTTP response content length
...
http_response_size_bytes_sum{namespace="Metrics-example",binding="http_server"} 30
```

## Going Deeper

Try out the other [Zilla examples](https://github.com/aklivity/zilla-examples).

- [Push to an OTLP Collector](../../how-tos/telemetry/opentelemetry-protocol.md)
- [kubernetes.prometheus.autoscale](https://github.com/aklivity/zilla-examples/tree/main/kubernetes.prometheus.autoscale)

## Clean up

Remove the running container

```bash:no-line-numbers
<!-- @include: ./telemetry_docker_run.sh#teardown -->
```
