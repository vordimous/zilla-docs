# Installing Zilla

## Running Zilla via Docker
Run the latest Zilla release with default empty configuration via docker.

```
docker run ghcr.io/aklivity/zilla:latest start -v
```
```
{
  "name": "default"
}
started
```

### Configure Zilla to behave as a `tcp` `echo` server in 2mins.

First create a local `zilla.yaml` with the following contents.
```yaml
---
name: example
bindings:
  tcp_server0:
    type: tcp
    kind: server
    options:
      host: 0.0.0.0
      port: 12345
    exit: echo_server0
  echo_server0:
    type: echo
    kind: server
```
Then run Zilla again, this time mounting your local `zilla.yaml` as a docker volume file.
```
docker run -v `pwd`/zilla.yaml:/etc/zilla/zilla.yaml ghcr.io/aklivity/zilla:latest start -v
```
Now, try it out using `netcat`.
```bash
nc localhost 12345
```
```
Hello, world
Hello, world
```
