# Installing Zilla

## Running Zilla via Docker

Run the latest Zilla release with the default empty configuration via docker.

```bash:no-line-numbers
docker run ghcr.io/aklivity/zilla:latest start -v
```

The output should display the zilla config and `started` to know zilla is ready for traffic.

```text:no-line-numbers
// default Zilla config
{
  "name": "default"
}

// Zilla status
started
```

Specify your own `zilla.yaml` file.

::: code-tabs#yaml

@tab Docker 23

```bash:no-line-numbers
docker run -v ./zilla.yaml:/etc/zilla/zilla.yaml ghcr.io/aklivity/zilla:latest start -v
```

@tab Docker 20

```bash:no-line-numbers
docker run -v $(pwd)/zilla.yaml:/etc/zilla/zilla.yaml ghcr.io/aklivity/zilla:latest start -v
```

:::

## Running Zilla via Helm

Go to the [Zilla artifacthub](https://artifacthub.io/) page to find out more on how to install Zilla using Helm

### TL;DR

```bash:no-line-numbers
helm install zilla . --namespace zilla --create-namespace --wait \
    --values values.yaml \
    --set-file zilla\\.yaml=zilla.yaml
```

### Configuration

Zilla specific configuration is in the `zilla.yaml` file which can be included in the helm install by adding `--set-file zilla\\.yaml=zilla.yaml` to your command.

## Auto Scaling

Zilla will start workers that default to the CPU cores it is allowed to use. This makes horizontal scaling easy with a 1:1 ratio of instances to workers. Any of the default scaling metrics based on server CPU usage will enable Zilla to handle traffic spikes. Additionally, Zilla [Telemetry](../reference/config/overview.md#telemetry) configuration provides more data when determining how to scale. The [Prometheus autoscale example](https://github.com/aklivity/zilla-examples/tree/main/kubernetes.prometheus.autoscale) demonstrates using metrics from the [Prometheus exporter](../reference/config/telemetry/exporter/exporter-prometheus.md) to horizontally scale Zilla on k8s.
