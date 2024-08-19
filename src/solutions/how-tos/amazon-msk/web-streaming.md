---
icon: aky-zilla-plus
description: Zilla Plus Web Streaming lets Web clients publish, update, and stream messages to a Kafka topic in your Amazon MSK cluster.
---

# Amazon MSK Web Streaming

[Available in <ZillaPlus/>](https://www.aklivity.io/products/zilla-plus)
{.zilla-plus-badge .hint-container .info}

The [Zilla Plus for Amazon MSK](https://aws.amazon.com/marketplace/pp/prodview-jshnzslazfm44) Web Streaming proxy lets Web clients publish, update, and stream messages to a Kafka topic in your Amazon MSK cluster.

By automating the configuration of a network load balancer and auto-scaling group of stateless Web Streaming proxies to expose a topic in your MSK cluster, Web clients can natively interact with messages on the topic. Event streaming backend systems can quickly integrate user-facing web clients using customizable REST and SSE APIs.

You will need to choose a wildcard DNS pattern to use for public internet access to the Web Streaming proxies. These wildcard DNS names must resolve to the public IP address(es) where the <ZillaPlus/> proxy is deployed. The <ZillaPlus/> proxy must also be configured with a TLS server certificate representing the same wildcard DNS pattern.

## Deployment with Terraform

Follow the [Web Streaming with Terraform](https://github.com/aklivity/zilla-plus-aws-templates/tree/main/amazon-msk/cdktf/web-streaming) guide to generated or deploy a custom Terraform template using [CDKTF](https://developer.hashicorp.com/terraform/cdktf). This Terraform script can be configured to expose a custom REST path and uses `SASL/SCRAM` authentication.
