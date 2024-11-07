---
redirectFrom: /solutions/how-tos/amazon-msk/secure-public-access/overview.html
icon: aky-zilla-plus
description: Securely access your Kafka cluster via the internet.
---

# Secure Public Access

<!-- markdownlint-disable MD024 -->

[Available in <ZillaPlus/>](https://www.aklivity.io/products/zilla-plus)
{.zilla-plus-badge .hint-container .info}

The [Zilla Plus for Amazon MSK](https://aws.amazon.com/marketplace/pp/prodview-jshnzslazfm44) Secure Public Access Proxy lets authorized Kafka clients connect, publish messages and subscribe to topics in your Amazon MSK cluster via the internet.

By automating the configuration of an internet-facing network load balancer and auto-scaling group of stateless Secure Public Access proxies to expose your MSK cluster via the public internet, Kafka clients can connect, publish messages and subscribe to topics in your Amazon MSK cluster from outside AWS.

You will need to choose a wildcard DNS pattern to use for public internet access to the brokers in your Kafka cluster. These wildcard DNS names must resolve to the public IP address(es) where the <ZillaPlus/> proxy is deployed. The <ZillaPlus/> proxy must also be configured with a TLS server certificate representing the same wildcard DNS pattern.

The <ZillaPlus/> proxy can securely expose any Kafka cluster with these deployment options.

## Amazon MSK

The [Zilla Plus for Amazon MSK](https://aws.amazon.com/marketplace/pp/prodview-jshnzslazfm44) Secure Public Access proxy lets authorized Kafka clients connect, publish messages and subscribe to topics in your Amazon MSK cluster via the internet.

### Deploy with Terraform

Follow the [Secure Public Access with Terraform](https://github.com/aklivity/zilla-plus-aws-templates/tree/main/amazon-msk/cdktf/secure-public-access) guide to generated or deploy a custom Terraform template using [CDKTF](https://developer.hashicorp.com/terraform/cdktf). This Terraform script can be configured to deploy `SASL/SCRAM authentication`, `Mutual TLS (mTLS) authentication` or `Unauthorized access` to setup connectivity to your MSK cluster with a wildcard DNS pattern.

### Deploy with CloudFormation

#### SASL/SCRAM authentication

Follow the [Secure Public Access via SASL/SCRAM authentication](../../how-tos/amazon-msk/secure-public-access/production.md) guide to setup connectivity to your MSK cluster using a globally trusted TLS server certificate with a wildcard DNS pattern `*.example.aklivity.io` to illustrate the steps.

#### Mutual TLS (mTLS) authentication

Follow the [Secure Public Access via mTLS](../../how-tos/amazon-msk/secure-public-access/production-mutual-tls.md) guide to setup connectivity to your MSK cluster using a globally trusted TLS server certificate with a wildcard DNS pattern `*.example.aklivity.io` to illustrate the steps.

#### Unauthorized access

Follow the [Secure Public Access via Unauthorized access](../../how-tos/amazon-msk/secure-public-access/development.md) guide to setup connectivity to your MSK cluster using a locally trusted TLS server certificate with the example wildcard DNS pattern `*.aklivity.example.com`.

## Confluent Cloud

The [Zilla Plus for Confluent Cloud](https://aws.amazon.com/marketplace/pp/prodview-eblxkinsqbaks) Secure Public Access proxy lets authorized Kafka clients connect, publish messages and subscribe to topics in your Confluent Cloud cluster via the internet.

### Deploy with CloudFormation

Follow the [Secure Public Access via SASL/SCRAM authentication](../../how-tos/confluent-cloud/secure-public-access.md) guide to setup connectivity to your MSK cluster using a globally trusted TLS server certificate with a wildcard DNS pattern `*.example.aklivity.io` to illustrate the steps.
