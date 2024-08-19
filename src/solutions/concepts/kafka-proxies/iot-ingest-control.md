---
icon: aky-zilla-plus
description: MQTT clients can directly publish and subscribe to topics through MQTT entry points into your Kafka cluster.
---

# IoT Ingest and Control

<!-- markdownlint-disable MD024 -->

[Available in <ZillaPlus/>](https://www.aklivity.io/products/zilla-plus)
{.zilla-plus-badge .hint-container .info}

By automating the configuration of an internet-facing network load balancer and auto-scaling group of stateless Zilla Plus IoT Ingest and Control proxies to expose your Kafka cluster via the public internet, Kafka clients can connect, publish messages and subscribe to topics in your Kafka cluster from outside the host network.

You will need to choose a wildcard DNS pattern to use for public internet access to the brokers in your Kafka cluster. These wildcard DNS names must resolve to the public IP address(es) where the <ZillaPlus/> proxy is deployed. The <ZillaPlus/> proxy must also be configured with a TLS server certificate representing the same wildcard DNS pattern.

## Amazon MSK

The [Zilla Plus for Amazon MSK](https://aws.amazon.com/marketplace/pp/prodview-jshnzslazfm44) IoT Ingest and Control Broker lets authorized Kafka clients connect, publish messages and subscribe to topics in your Confluent Cloud cluster via the internet.

### Deploy with CloudFormation

Follow the [Amazon MSK IoT Ingest and Control](../../how-tos/confluent-cloud/iot-ingest-control.md) guide to setup an MQTT broker using a globally trusted TLS server certificate with a wildcard DNS pattern `*.example.aklivity.io` to illustrate the steps.

## Confluent Cloud

The [Zilla Plus for Confluent Cloud](https://aws.amazon.com/marketplace/pp/prodview-eblxkinsqbaks) IoT Ingest and Control Broker lets authorized Kafka clients connect, publish messages and subscribe to topics in your Confluent Cloud cluster via the internet.

### Deploy with CloudFormation

Follow the [Confluent Cloud IoT Ingest and Control](../../how-tos/confluent-cloud/iot-ingest-control.md) guide to setup an MQTT broker using a globally trusted TLS server certificate with a wildcard DNS pattern `*.example.aklivity.io` to illustrate the steps.

## Redpanda

The [Zilla Plus for Redpanda](https://aws.amazon.com/marketplace/pp/prodview-sj4kquyndubiu) IoT Ingest and Control Broker lets authorized Kafka clients connect, publish messages and subscribe to topics in your Redpanda cluster via the internet.

### Deploy with CloudFormation

Follow the [Redpanda IoT Ingest and Control](../../how-tos/redpanda/iot-ingest-control.md) guide to setup an MQTT broker using a globally trusted TLS server certificate with a wildcard DNS pattern `*.example.aklivity.io` to illustrate the steps.
