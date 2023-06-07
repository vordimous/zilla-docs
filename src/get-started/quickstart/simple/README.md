---
description: Running these Zilla quickstarts will introduce some simple features.
---

# Simple Quickstart

Get started using Zilla by deploying our Docker container. Before proceeding, you need to run these quickstarts in an environment [with Docker](https://docs.docker.com/get-docker/).

## TCP connection

Running this Zilla setup will simply echo back any text sent to the server over `tcp` at port `12345`.

::: code-tabs#yaml

@tab zilla.yaml

@[code](tcp_zilla.yaml)

:::

### Run Zilla

Run the Zilla docker image as a daemon with the `zilla.yaml` file volume mounted.

::: code-tabs#yaml

@tab Docker 23

```bash:no-line-numbers
docker run -d -v ./zilla.yaml:/etc/zilla/zilla.yaml --name zilla-quickstart -p 12345:12345/tcp ghcr.io/aklivity/zilla:latest start -v
```

@tab Docker 20

```bash:no-line-numbers
docker run -d -v $(pwd)/zilla.yaml:/etc/zilla/zilla.yaml --name zilla-quickstart -p 12345:12345/tcp ghcr.io/aklivity/zilla:latest start -v
```

:::

### Use `netcat` to send a text payload

```bash:no-line-numbers
echo "Hello, world" | nc localhost 12345
```

output:

```text:no-line-numbers
Hello, world
```

### Remove the running container

```bash:no-line-numbers
docker rm -f zilla-quickstart
```

## Zilla Prometheus Metrics

Running this Zilla quickstart will simply echo back any text sent to the server at port `8080`.

::: code-tabs#yaml

@tab zilla.yaml

@[code](./metrics_zilla.yaml)

:::

### Run Zilla

Run the Zilla docker image as a daemon with the `zilla.yaml` file volume mounted.

::: code-tabs#yaml

@tab Docker 23

```bash:no-line-numbers
docker run -d -v ./zilla.yaml:/etc/zilla/zilla.yaml --name zilla-quickstart -p 8080:8080/tcp ghcr.io/aklivity/zilla:latest start -v
```

@tab Docker 20

```bash:no-line-numbers
docker run -d -v $(pwd)/zilla.yaml:/etc/zilla/zilla.yaml --name zilla-quickstart -p 8080:8080 ghcr.io/aklivity/zilla:latest start -v
```

:::

### Use `curl` to hear your echo

```bash:no-line-numbers
curl -d "Hello, world" -H "Content-Type: text/plain" -X "POST" http://localhost:8080/
```

output:

```bash:no-line-numbers
Hello, world
```

### Remove the running container

```bash:no-line-numbers
docker rm -f zilla-quickstart
```


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

```bash:no-line-numbers
docker run -d -v ./zilla.yaml:/etc/zilla/zilla.yaml --name zilla-quickstart -p 8080:8080/tcp ghcr.io/aklivity/zilla:latest start -v
```

@tab Docker 20

```bash:no-line-numbers
docker run -d -v $(pwd)/zilla.yaml:/etc/zilla/zilla.yaml --name zilla-quickstart -p 8080:8080 ghcr.io/aklivity/zilla:latest start -v
```

:::

### Use `curl` to hear your echo

```bash:no-line-numbers
curl -d "Hello, world" -H "Content-Type: text/plain" -X "POST" http://localhost:8080/
```

output:

```text:no-line-numbers
Hello, world
```

### Remove the running container

```bash:no-line-numbers
docker rm -f zilla-quickstart
```

## Going Deeper

Try out the other [Zilla examples](https://github.com/aklivity/zilla-examples).
