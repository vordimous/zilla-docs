---
description: In this guide, you will learn how to connect to Redpanda from Zilla
---
# Redpanda

## Introduction

In this guide, you will learn how to connect to Redpanda from Zilla. You can get started with a fully working config [example](https://github.com/aklivity/zilla-examples/tree/main/http.redpanda.sasl.scram).

## Redpanda Parameters

A brief explanation of replaceable values from the config examples below:

| Value                       | Description                    |
| --------------------------- | ------------------------------ |
| `SASL_USERNAME`             | The SASL username for Redpanda |
| `SASL_PASSWORD`             | The SASL password for Redpanda |
| `BOOTSTRAP_SERVER_HOSTNAME` | Target Redpanda hostname       |
| `BOOTSTRAP_SERVER_PORT`     | Target Redpanda port number    |

## Configure Zilla

::: code-tabs#yaml

@tab zilla.yaml

```yaml
bindings:
  kafka_client:
    type: kafka
    kind: client
    options:
      sasl:
        mechanism: scram-sha-256
        username: SASL_USERNAME
        password: SASL_PASSWORD
    exit: tls_client
  tls_client:
    type: tls
    kind: client
    options:
      trustcacerts: true
      sni:
      - BOOTSTRAP_SERVER_HOSTNAME
    exit: tcp_client
  tcp_client:
    type: tcp
    kind: client
    options:
      host: BOOTSTRAP_SERVER_HOSTNAME
      port: "BOOTSTRAP_SERVER_PORT"
    routes:
      - when:
        - cidr: 0.0.0.0/0

```

:::

::: info NOTE
SNI adds the domain name to the TLS handshake process so that the Zilla process reaches the right domain name and receives the correct SSL certificate.
:::

To test the above SASL config you can follow instructions in the README from the [example](https://github.com/aklivity/zilla-examples/tree/main/http.redpanda.sasl.scram).
