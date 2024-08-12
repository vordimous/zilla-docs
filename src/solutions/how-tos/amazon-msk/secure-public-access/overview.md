---
icon: aky-zilla-plus
description: The Secure Public Access Proxy lets authorized Kafka clients connect, publish messages and subscribe to topics in your Amazon MSK cluster via the internet.
---

# Amazon MSK Secure Public Access Proxy

[Available in <ZillaPlus/>](https://www.aklivity.io/products/zilla-plus)
{.zilla-plus-badge .hint-container .info}

The [Zilla Plus for Amazon MSK](https://aws.amazon.com/marketplace/pp/prodview-jshnzslazfm44) Secure Public Access Proxy lets authorized Kafka clients connect, publish messages and subscribe to topics in your Amazon MSK cluster via the internet.

By automating the configuration of an internet-facing network load balancer and auto-scaling group of stateless Secure Public Access proxies to expose your MSK cluster via the public internet, Kafka clients can connect, publish messages and subscribe to topics in your Amazon MSK cluster from outside AWS.

You will need to choose a wildcard DNS pattern to use for public internet access to the brokers in your MSK cluster. These wildcard DNS names must resolve to the public IP address(es) where the <ZillaPlus/> proxy is deployed. The <ZillaPlus/> proxy must also be configured with a TLS server certificate representing the same wildcard DNS pattern.

The <ZillaPlus/> proxy can securely expose any MSK cluster with these access options.

## Deployment with Terraform

Follow the [Secure Public Access with Terraform](https://github.com/aklivity/zilla-plus-aws-templates/tree/main/amazon-msk/cdktf/secure-public-access) guide to generated or deploy a custom Terraform template using [CDKTF](https://developer.hashicorp.com/terraform/cdktf). This Terraform script can be configured to deploy `SASL/SCRAM authentication`, `Mutual TLS (mTLS) authentication` or `Unauthorized access` to setup connectivity to your MSK cluster with a wildcard DNS pattern.

## Deployment with CloudFormation

### SASL/SCRAM authentication

Follow the [Secure Public Access via SASL/SCRAM authentication](./production.md) guide to setup connectivity to your MSK cluster using a globally trusted TLS server certificate with a wildcard DNS pattern `*.example.aklivity.io` to illustrate the steps.

### Mutual TLS (mTLS) authentication

Follow the [Secure Public Access via mTLS](./production-mutual-tls.md) guide to setup connectivity to your MSK cluster using a globally trusted TLS server certificate with a wildcard DNS pattern `*.example.aklivity.io` to illustrate the steps.

### Unauthorized access

Follow the [Secure Public Access via Unauthorized access](./development.md) guide to setup connectivity to your MSK cluster using a locally trusted TLS server certificate with the example wildcard DNS pattern `*.aklivity.example.com`.
