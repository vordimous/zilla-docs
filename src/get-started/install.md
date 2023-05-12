# Installing Zilla

## Running Zilla via Docker

Run the latest Zilla release with the default empty configuration via docker.

```bash:no-line-numbers
docker run ghcr.io/aklivity/zilla:latest start -v
```

output:

```bash:no-line-numbers
{
  "name": "default"
}
started
```

## Running Zilla via Helm

Run the latest Zilla release with the default empty configuration via Helm.

```bash:no-line-numbers
helm install zilla chart --namespace zilla --create-namespace --wait
```

::: code-tabs#yaml

@tab service-zilla.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: zilla
  labels:
    app.kubernetes.io/instance: zilla
spec:
  replicas: 1
  selector:
    matchLabels:
      app.kubernetes.io/instance: zilla
  template:
    metadata:
      labels:
        app.kubernetes.io/instance: zilla
    spec:
      containers:
        - name: zilla
          image: "ghcr.io/aklivity/zilla:latest"
          args: ["start", "-v", "-e"]

```

@tab Chart.yaml

```yaml
apiVersion: v2
name: zilla
description: zilla example
type: application
version: 0.1.0
appVersion: "latest"

```

:::

output:

```bash:no-line-numbers
NAME: zilla
NAMESPACE: zilla
STATUS: deployed
REVISION: 1
TEST SUITE: None
```
