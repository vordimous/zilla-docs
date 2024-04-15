# Deploy and Operating Zilla

## Running Zilla via Docker

Run the latest Zilla release with the default empty configuration via docker.

```bash:no-line-numbers
docker run ghcr.io/aklivity/zilla:latest start -v
```

The output should display the Zilla config and `started` to know Zilla is ready for traffic.

```output:no-line-numbers
// default Zilla config
name: default

// Zilla status
started
```

Specify your own `zilla.yaml` file.

```bash:no-line-numbers
docker run -v ./zilla.yaml:/etc/zilla/zilla.yaml ghcr.io/aklivity/zilla:latest start -v
```

## Running Zilla via Helm

Go to the [Zilla artifacthub](https://artifacthub.io/packages/helm/zilla/zilla) page to find out more on how to install Zilla using Helm.

```bash:no-line-numbers
helm install zilla oci://ghcr.io/aklivity/charts/zilla --namespace zilla --create-namespace --wait \
    --values values.yaml \
    --set-file zilla\\.yaml=zilla.yaml
```

Zilla specific configuration is in the `zilla.yaml` file which can be included in the helm install by adding `--set-file zilla\\.yaml=zilla.yaml` to your command.

## Auto Reconfigure

Zilla loads the configuration from the `zilla.yaml` file on startup and logs the configured settings. Restarting Zilla or its container may not be an option, so Zilla creates a file watcher to detect changes to the file and reloads the config if a change is detected.

Errors and misconfigured parts of the `zilla.yaml` file are detected by Zilla and reported via stdout. The original config remains in place and can only be replaced by a valid config.

This feature is demonstrated in the above Helm install command. Running a `helm update ...` with changes to the `zilla.yaml`, k8s will update the config map, which writes the new content into the running pods. Zilla will detect those file changes and load the new config.

## Auto Scaling

Zilla will start workers that default to the CPU cores it is allowed to use. This makes horizontal scaling easy with a 1:1 ratio of instances to workers. Any of the default scaling metrics based on server CPU usage will enable Zilla to handle traffic spikes. Additionally, Zilla [Telemetry](../reference/config/overview.md#telemetry) configuration provides more data when determining how to scale. The [Prometheus autoscale example](https://github.com/aklivity/zilla-examples/tree/main/kubernetes.prometheus.autoscale) demonstrates using metrics from the [Prometheus exporter](../reference/config/telemetry/exporters/exporter-prometheus.md) to horizontally scale Zilla on k8s.

## Enable Incubator Features

> Progress on incubator features can be found on the [Zilla roadmap](https://github.com/orgs/aklivity/projects/4).

Zilla maintains functioning features that may have more work or design changes in a separate install directory called `incubator`. These are released with Zilla for the community to use and provide feedback or suggestions on how to improve the feature. The package name doesn't change meaning incubator features can be added to the Zilla runtime engine whenever they are ready or needed. Incubator features are loaded when the `zilla.incubator.enabled` java property is set to true.

The `ZILLA_INCUBATOR_ENABLED` environment variable will set the incubator java option when set to `true`. Add the environment variable wherever you are running zilla.

```text
ZILLA_INCUBATOR_ENABLED=true
```
