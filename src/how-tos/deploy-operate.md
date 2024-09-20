# Deploy and Operate Zilla

## Install on MacOS via Homebrew

You can install Zilla using our [homebrew tap](https://github.com/aklivity/homebrew-tap).

```bash:no-line-numbers
brew tap aklivity/tap
brew install zilla
```

Now you can run any `zilla.yaml` config.

```bash:no-line-numbers
zilla start -ve -c ./zilla.yaml
```

## Running Zilla via Docker

You can run your `zilla.yaml` config inside a container. If you want to deploy on Kubernetes, use our [helm chart](./deploy-operate.md).

```bash:no-line-numbers
docker run -v ./zilla.yaml:/etc/zilla/zilla.yaml ghcr.io/aklivity/zilla:latest start -ve
```

## Deploying Zilla via Helm

Go to the [Zilla artifacthub](https://artifacthub.io/packages/helm/zilla/zilla) page to learn more about installing Zilla using Helm.

```bash:no-line-numbers
helm install zilla oci://ghcr.io/aklivity/charts/zilla --namespace zilla --create-namespace --wait \
--values values.yaml \
--set-file zilla\\.yaml=zilla.yaml
```

The Zilla configuration is in the `zilla.yaml` file, which is added to the Helm install using the `--set-file zilla\\.yaml=zilla.yaml` argument.

### Mapping TCP ports through the official `ingress-nginx` ingress controller

You can define your TCP ports to services mapping in a `tcp-services` ConfigMap. Official documentation on this method can be found in the [Exposing TCP and UDP services](https://kubernetes.github.io/ingress-nginx/user-guide/exposing-tcp-udp-services/) guide.

```bash:no-line-numbers
kubectl create configmap tcp-services \
  --from-literal=7183="$NAMESPACE/$SERVICE_NAME:7183" \
  --from-literal=7151="$NAMESPACE/$SERVICE_NAME:7151" \
  -n ingress-nginx -o yaml --dry-run=client | kubectl apply -f -
```

You will need to download the YAML manifest for the ingress controller. You can find an example on the [Ingress Nginx Quickstart guide](https://kubernetes.github.io/ingress-nginx/deploy/#quick-start)

```bash:no-line-numbers
curl https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.1/deploy/static/provider/cloud/deploy.yaml > ingress-deploy.yaml
```

Once you have the Ingress Nginx YAML manifest, you must add the TCP port proxies for the ingress controller to allow your ports to pass through.

Here is how to add ports `7183` and `7151` to the `service/ingress-nginx-controller`.

```yaml{10-17}
kind: Service
metadata:
...
  name: ingress-nginx-controller
  namespace: ingress-nginx
spec:
...
  ports:
...
 - name: proxied-tcp-7183
    port: 7183
    targetPort: 7183
    protocol: TCP
 - name: proxied-tcp-7151
    port: 7151
    targetPort: 7151
    protocol: TCP
...
```

Finally, we need to configure the Ingress Nginx controller to look for port mappings in the `tcp-services` by adding the `--tcp-services-configmap=$(POD_NAMESPACE)/tcp-services` argument to the Deployment container args.

```yaml{9}
kind: Deployment
spec:
  template:
    spec:
      containers:
 - args:
  - /nginx-ingress-controller
...
  - --tcp-services-configmap=$(POD_NAMESPACE)/tcp-services
```

Create the ingress controller:

```bash:no-line-numbers
kubectl apply -f ingress-deploy.yaml
```

The ingress controller will allow your ports to pass through, and you can configure which services should receive the requests made at those ports.

### Adding files to the Zilla pod

All local files referenced in a `zilla.yaml` config should be found in a location relative to the Zilla install location `/etc/zilla`. The best way to get your files into a pod is by using configmaps. Below you will find one option using configmaps and volume mounts to add your files into the Zilla pod.

- From a single file.

  ```bash:no-line-numbers
  kubectl create configmap my-files-configmap --from-file=my-file.txt -n $NAMESPACE -o yaml --dry-run=client | kubectl apply -f -
  ```

- All files in a folder. This does not add folders recursively and each folder needs to be individually mapped

  ```bash:no-line-numbers
  kubectl create configmap my-folder-configmap --from-file=path/to/my-folder/ -n $NAMESPACE -o yaml --dry-run=client | kubectl apply -f -
  ```

Once you have the files you need stored in a configmap you can mount them as volumes into the Zilla pod at the install location `/etc/zilla`.

:::

::: code-tabs#bash

@tab values.yaml

```yaml
...
volumeMounts:
  - name: my-files-volume
    mountPath: /etc/zilla/files
  - name: my-folder-volume
    mountPath: /etc/zilla/folder

volumes:
  - name: my-files-volume
    configMap:
      name: my-files-configmap
  - name: my-folder-volume
    configMap:
      name: my-folder-configmap
```

:::

### Get diagnostics from Zilla pods

For every running Zilla pod you will need to first copy the `/var/run/zilla` directory to make sure no additional files are written while it is compressed then compress the full directory to make it easier to copy.

```bash:no-line-numbers
kubectl get pod \
-l "app.kubernetes.io/name=zilla" \
-n $NAMESPACE \
--field-selector=status.phase=Running \
-o custom-columns=name:metadata.name --no-headers \
| xargs -I{} kubectl exec {} -n $NAMESPACE -c zilla -- sh -c "cp -r /var/run/zilla /tmp/zilla && tar czf /tmp/zilla.tar.gz /tmp/zilla && rm -rf /tmp/zilla"
```

Copy the compressed `/var/run/zilla` directory off of the pod into your local directory using the pod name. 

```bash:no-line-numbers
kubectl get pod \
-l "app.kubernetes.io/name=zilla" \
-n $NAMESPACE \
--field-selector=status.phase=Running \
-o custom-columns=name:metadata.name --no-headers \
| xargs -I{} kubectl cp  -n $NAMESPACE {}:/tmp/zilla.tar.gz ./{}.tar.gz
```

Now you have a copy of the Zilla runtime directory for each running pod. This information can be used to diagnose all of the traffic zilla has managed.

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

## Export `TRACE` level Log Dump

The [zilla dump](../reference/config/zilla-cli.md#zilla-dump) command will capture all of the internal events at the stream level for a detailed analysis of what zilla was doing. These logs are captured down to the nanosecond and are exported as a `.pcap` file to be used with [Wireshark](https://wiki.wireshark.org/SampleCaptures). You can find instructions on how to view the capture in wireshark in the zilla dump [plugin install section](../reference/config/zilla-cli.md#i-install-plugin-directory).
