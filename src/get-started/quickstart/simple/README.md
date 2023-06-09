---
description: Running these Zilla quickstarts will introduce some simple features.
---

# Simple Quickstart

Get started using Zilla by deploying our Docker container. Before proceeding, you need to run these quickstarts in an environment [with Docker](https://docs.docker.com/get-docker/).

## TCP connection

Running this Zilla setup will simply echo back any text sent to the server over `tcp` at port `12345`.

::: code-tabs#yaml

@tab zilla.yaml

@[code](./tcp_zilla.yaml)

:::

### Run Zilla

Run the Zilla docker image as a daemon with the `zilla.yaml` file volume mounted.

::: code-tabs#yaml

@tab Docker 23

@[code{14-18} bash:no-line-numbers](./tcp_docker_run.sh)

@tab Docker 20

```bash:no-line-numbers
docker pull ghcr.io/aklivity/zilla:latest && \
docker run -d -v $(pwd)/zilla.yaml:/etc/zilla/zilla.yaml \
--name zilla-quickstart -p 8080:8080/tcp \
ghcr.io/aklivity/zilla:latest \
start -v;
```

:::

### Use `netcat` to send a text payload

@[code{30-30} bash:no-line-numbers](./tcp_docker_run.sh)

> Hello, world

Remove the running container

@[code{33-33} bash:no-line-numbers](./tcp_docker_run.sh)

## HTTP Echo

Running this Zilla quickstart will simply echo back any text sent to the server at port `8080`.

::: code-tabs#yaml

@tab zilla.yaml

@[code](./http_zilla.yaml)

:::

### Run Zilla

Run the Zilla docker image as a daemon with the `zilla.yaml` file volume mounted.

::: code-tabs#yaml

@tab Docker 23

@[code{14-18} bash:no-line-numbers](./http_docker_run.sh)

@tab Docker 20

```bash:no-line-numbers
docker pull ghcr.io/aklivity/zilla:latest && \
docker run -d -v $(pwd)/zilla.yaml:/etc/zilla/zilla.yaml \
--name zilla-quickstart -p 8080:8080/tcp \
ghcr.io/aklivity/zilla:latest \
start -v;
```

:::

### Use `curl` to hear your echo

@[code{31-31} bash:no-line-numbers](./http_docker_run.sh)

> Hello, world

Remove the running container

@[code{34-34} bash:no-line-numbers](./http_docker_run.sh)

## Prometheus Metrics

Running this Zilla quickstart will collect basic metrics for an http service.

::: code-tabs#yaml

@tab zilla.yaml

@[code](./metrics_zilla.yaml)

:::

### Run Zilla

Run the Zilla docker image as a daemon with the `zilla.yaml` file volume mounted.

::: code-tabs#yaml

@tab Docker 23

@[code{14-18} bash:no-line-numbers](./metrics_docker_run.sh)

@tab Docker 20

```bash:no-line-numbers
docker pull ghcr.io/aklivity/zilla:latest && \
docker run -d -v $(pwd)/zilla.yaml:/etc/zilla/zilla.yaml \
--name zilla-quickstart -p 8080:8080/tcp \
ghcr.io/aklivity/zilla:latest \
start -v;
```

:::

### Send a HTTP POST

@[code{31-31} bash:no-line-numbers](./metrics_docker_run.sh)

> Hello, world

Go to [http://localhost:9090/metrtics](http://localhost:9090/metrtics) to see the collected data or run the below `curl` command.

@[code{32-32} bash:no-line-numbers](./metrics_docker_run.sh)

```text
# TYPE stream_opens_sent_total counter
stream_opens_sent_total{namespace="Metrics-example",binding="tcp_server"} 2

# HELP stream_closes_sent_total Number of closed sent streams
# TYPE stream_closes_sent_total counter
stream_closes_sent_total{namespace="Metrics-example",binding="tcp_server"} 0

# HELP http_request_size_bytes HTTP request content length
# TYPE http_request_size_bytes histogram
...
http_request_size_bytes_sum{namespace="Metrics-example",binding="http_server"} 30
http_request_size_bytes_count{namespace="Metrics-example",binding="http_server"} 2


# HELP http_response_size_bytes HTTP response content length
# TYPE http_response_size_bytes histogram
...
http_response_size_bytes_sum{namespace="Metrics-example",binding="http_server"} 30
http_response_size_bytes_count{namespace="Metrics-example",binding="http_server"} 2
```

Remove the running container

@[code{35-35} bash:no-line-numbers](./metrics_docker_run.sh)

## Going Deeper

Try out the other [Zilla examples](https://github.com/aklivity/zilla-examples).
