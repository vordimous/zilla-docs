---
description: Running these Zilla samples will introduce metric collection.
---

# Prometheus Metrics Intro

Get started with Zilla by deploying our Docker image. Before proceeding, you should have [Docker](https://docs.docker.com/get-docker/) installed.

## Prometheus Metrics

Running this Zilla sample will collect basic metrics for an http service.

::: code-tabs#yaml

@tab zilla.yaml

```yaml {6-9,19,29-31,42-44}
<!-- @include: ./metrics_zilla.yaml -->
```

:::

### Run Zilla with telemetry

Run the Zilla docker image as a daemon with the `zilla.yaml` file volume mounted.

@[code{14-17} bash:no-line-numbers](./metrics_docker_run.sh)

### Send an HTTP POST

@[code{30-30} bash:no-line-numbers](./metrics_docker_run.sh)

```output:no-line-numbers
Hello, world
```

### View Metrics

Go to [http://localhost:7190/metrtics](http://localhost:7190/metrtics) to see the collected data or run the below `curl` command.

@[code{31-31} bash:no-line-numbers](./metrics_docker_run.sh)

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

Remove the running container

@[code{34-34} bash:no-line-numbers](./metrics_docker_run.sh)

## Going Deeper

Try out the other [Zilla examples](https://github.com/aklivity/zilla-examples).

- [kubernetes.prometheus.autoscale](https://github.com/aklivity/zilla-examples/tree/main/kubernetes.prometheus.autoscale)
