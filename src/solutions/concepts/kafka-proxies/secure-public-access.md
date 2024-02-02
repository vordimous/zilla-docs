---
icon: aky-zilla-plus
description: Securely access your Kafka cluster via the internet.
---

# Zilla Plus Secure Public Access

[Available in <ZillaPlus/>](https://www.aklivity.io/products/zilla-plus)
{.zilla-plus-badge .hint-container .info}

By automating the configuration of an internet-facing network load balancer and auto-scaling group of stateless Zilla Plus Secure Public Access proxies to expose your Kafka cluster via the public internet, Kafka clients can connect, publish messages and subscribe to topics in your Kafka cluster from outside the host network.

You will need to choose a wildcard DNS pattern to use for public internet access to the brokers in your Kafka cluster. These wildcard DNS names must resolve to the public IP address(es) where the <ZillaPlus/> proxy is deployed. The <ZillaPlus/> proxy must also be configured with a TLS server certificate representing the same wildcard DNS pattern.

## Amazon MSK

The [Zilla Plus for Amazon MSK](https://aws.amazon.com/marketplace/pp/prodview-jshnzslazfm44) Secure Public Access proxy lets authorized Kafka clients connect, publish messages and subscribe to topics in your Amazon MSK cluster via the internet.

> [Follow the guide to get started](./../../how-tos/amazon-msk/secure-public-access/overview.md)

## Confluent Cloud

The [Zilla Plus for Confluent Cloud](https://aws.amazon.com/marketplace/pp/prodview-jshnzslazfm44) Secure Public Access proxy lets authorized Kafka clients connect, publish messages and subscribe to topics in your Confluent Cloud cluster via the internet.

> [Follow the guide to get started](./../../how-tos/confluent-cloud/secure-public-access.md)
