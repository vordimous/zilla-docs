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

Let's configure `zilla.yaml`.

::: details zilla.yaml
@[code yaml{3-9,69-86}](redpanda-zilla.yaml)
:::

::: info NOTE
SNI adds the domain name to the TLS handshake process so that the Zilla process reaches the right domain name and receives the correct SSL certificate.
:::

To test the above SASL config you can follow instructions in the README from the [example](https://github.com/aklivity/zilla-examples/tree/main/http.redpanda.sasl.scram).
