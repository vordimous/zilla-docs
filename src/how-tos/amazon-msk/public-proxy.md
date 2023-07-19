---
icon: plus
description: Securely access your Amazon MSK cluster via the internet.
---

# Public MSK Proxy
<!-- TODO enable -->
<!-- markdownlint-disable -->

[Zilla Plus](https://www.aklivity.io/products/zilla-plus)
{.zilla-plus-badge .hint-container .info}

::: tip Estimated time to complete 20-30 minutes.
:::

## Overview

The [Aklivity Public MSK Proxy](http://aws.amazon.com/marketplace/pp/B09HKJ54CX) lets authorized Kafka clients connect, publish messages and subscribe to topics in your Amazon MSK cluster via the internet.

By automating the configuration of an internet-facing network load balancer and auto-scaling group of stateless proxies to access your MSK cluster via the public internet, Kafka clients can connect, publish messages and subscribe to topics in your Amazon MSK cluster from outside AWS.

You will need to choose a wildcard DNS pattern to use for public internet access to the brokers in your MSK cluster. These wildcard DNS names must resolve to the public IP address(es) where the Public MSK Proxy is deployed. The Public MSK Proxy must also be configured with a TLS server certificate representing the same wildcard DNS pattern.

Both `Development` and `Production` deployment options are available.

### Development

Follow the [Development](./development.md) guide to setup connectivity to your MSK cluster from your local development environment via the internet using a locally trusted TLS server certificate for the example wildcard DNS pattern `*.aklivity.example.com`.

### Production

Follow the [Production](./production.md) guide to setup connectivity to your MSK cluster from anywhere on the internet using a globally trusted TLS server certificate for a wildcard DNS pattern under your control. We use `*.example.aklivity.io` to illustrate the steps.

Follow the [Production (Mutual Trust)](./production-mutual-trust.md) guide instead if your MSK cluster is configured for TLS client authorization.
