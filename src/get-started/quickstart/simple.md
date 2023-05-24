---
description: Running these Zilla quickstarts will introduce some simple features.
---

# Simple Quickstart

Get started using Zilla by deploying our Docker container. Before proceeding, you need to run these quickstarts in an environment [with Docker](https://docs.docker.com/get-docker/).

## TCP connection

Running this Zilla setup will simply echo back any text sent to the server over `tcp` at port `12345`.

::: code-tabs#yaml

@tab zilla.yaml

```yaml
name: TCP-example
bindings:
  tcp_server:
    type: tcp
    kind: server
    options:
      host: 0.0.0.0
      port: 12345
    exit: echo_server
  echo_server:
    type: echo
    kind: server
```

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

## HTTP Echo

Running this Zilla quickstart will simply echo back any text sent to the server at port `8080`.

::: code-tabs#yaml

@tab zilla.yaml

```yaml
name: HTTP-example
bindings:

# Gateway ingress config
  tcp_server:
    type: tcp
    kind: server
    options:
      host: 0.0.0.0
      port: 8080
    exit: http_server
  http_server:
    type: http
    kind: server
    routes:
      - when:
          - headers:
              :scheme: http
              :authority: localhost:8080
        exit: echo_server

# Service running in Zilla
  echo_server:
    type: echo
    kind: server
```

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
