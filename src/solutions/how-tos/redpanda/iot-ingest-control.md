---
icon: aky-zilla-plus
description: Set up an IoT Ingest and Control MQTT Broker that lets clients publish messages and subscribe to topics proxied to Kafka topics in your Redpanda cluster.
---

# Redpanda IoT Ingest and Control

[Available in <ZillaPlus/>](https://www.aklivity.io/products/zilla-plus)
{.zilla-plus-badge .hint-container .info}

::: info Estimated time to complete 10-15 minutes.
:::

## Overview

The [Zilla Plus for Redpanda](https://aws.amazon.com/marketplace/pp/prodview-sj4kquyndubiu) IoT Ingest and Control MQTT Broker lets clients publish messages and subscribe to topics that are proxied to Kafka topics in your Redpanda cluster.

## Prerequisites

<!-- @include: @partials/iot-ingest-control/prerequisites.md  -->

## Create the Redpanda cluster

> This creates your Redpanda cluster.

The [Redpanda Cloud Quickstart](https://docs.redpanda.com/current/get-started/quick-start-cloud/) will walk you through creating one. You can skip this step if you have already created a Redpanda cluster with an equivalent configuration.

- Cluster Name: `my-zilla-iot-rp-cluster`
- Cluster Type: any
- Create Topics:

  - With cleanup policy "delete" to store MQTT messages:

  ```text:no-line-numbers
  mqtt-messages
  ```

  - With cleanup policy "compact" to store MQTT retained messages:

  ```text:no-line-numbers
  mqtt-retained
  ```

  - With cleanup policy "compact" to store MQTT sessions:

  ```text:no-line-numbers
  mqtt-sessions
  ```

### Create an API key

Follow the Configure Authentication documentation to set up [SASL/SCRAM in Redpanda](https://docs.redpanda.com/current/manage/security/authentication/#scram). Save the username and password for use later.

### Create a Secret with SASL/SCRAM authentication params

> This creates a Secrets Manager secret with the necessary properties to access the Redpanda cluster.

Follow the [Store a new secret](https://console.aws.amazon.com/secretsmanager/newsecret) wizard with the following parameters and defaults.

- Secret Type: `Other type of secret`
- Value:

  - Plaintext JSON object:

    ```json:no-line-numbers
    {
      "sasl_username": "<rp-username>",
      "sasl_password": "<rp-password>",
      "bootstrap_server": "<rp-bootstrap-server>"
    }
    ```

- Secret Name: `my-zilla-iot-access-secret`
- Review and store the secret

## Zilla proxy AWS resources

<!-- @include: @partials/iot-ingest-control/aws-resources.md  -->

## Subscribe via AWS Marketplace

The [Zilla Plus for Redpanda](https://aws.amazon.com/marketplace/pp/prodview-sj4kquyndubiu) is available through the AWS Marketplace. You can skip this step if you have already subscribed to Zilla Plus for Redpanda via the AWS Marketplace.

To get started, visit the Proxy's Marketplace [Product Page](https://aws.amazon.com/marketplace/pp/prodview-sj4kquyndubiu) and `Subscribe` to the offering. You should now see `Zilla Plus for Redpanda` listed in your [AWS Marketplace](https://console.aws.amazon.com/marketplace) subscriptions.

## Deploy the IoT Ingest and Control MQTT Broker

> This initiates deployment of the Zilla Plus for Redpanda stack via CloudFormation.

Navigate to your [AWS Marketplace](https://console.aws.amazon.com/marketplace) subscriptions and select `Zilla Plus for Redpanda` to show the manage subscription page.

<!-- @include: @partials/iot-ingest-control/cf-stack/s1-launch.md  -->

### Step 2. Specify stack details

::: code-tabs

@tab Stack name

```text:no-line-numbers
my-zilla-iot-proxy
```

:::

Parameters:

- Network Configuration
  - VPC: `my-zilla-iot-proxy-vpc`
  - Subnets: `my-zilla-iot-proxy-subnet-public-1a` `my-zilla-iot-proxy-subnet-public-1b`
- Redpanda Configuration
  - Access Credentials and Bootstrap Server Secret ARN: `<my-zilla-iot-access-secret secret ARN>` \*1
  - Kafka Topics:
    - messages: `mqtt-messages`
    - retained: `mqtt-retained`
    - sessions: `mqtt-sessions`
- Zilla Plus Configuration
  - Instance count: `2`
  - Instance type: `t3.small` \*2
  - Role: `my-zilla-iot-role`
  - Security Groups: `my-zilla-iot-proxy-sg`
  - Public Port: `8883`
  - Public Wildcard DNS: `*.example.aklivity.io` \*3
  - Public TLS Certificate Key: `<TLS certificate private key secret ARN>` \*4
  - Key pair for SSH access: `my-key-pair` \*5
- \*Configuration Reference
  1. This is the ARN for the secret created in the the [Create a Secret with SASL/SCRAM authentication params](#create-a-secret-with-sasl-scram-authentication-params) step of this guide.
  2. Consider the network throughput characteristics of the AWS instance type as that will impact the upper bound on network performance.
  3. Replace with your own custom wildcard DNS pattern mentioned in the [Prerequisites](#prerequisites) of this guide.
  4. This is the ARN of the created secret for the signed certificate's private key mentioned in the [Prerequisites](#prerequisites) of this guide.
  5. Follow the [Create Key Pair](../../how-tos/aws-services/create-key-pair.md) guide to create a new key pair to access EC2 instances via SSH.

<!-- @include: @partials/iot-ingest-control/cf-stack/s3-create.md  -->

### Configure Global DNS

<!-- @include: @partials/iot-ingest-control/configure-global-dns.md  -->

## Verify MQTT Client Connectivity

<!-- @include: @partials/iot-ingest-control/verify-mqtt-client-connectivity.md  -->

## Verify the Zilla proxy Service

<!-- @include: @partials/zilla-plus-proxy/verify-zilla-plus-proxy-service.md  -->

## Conclusion

You have successfully deployed the [Zilla Plus for Redpanda](https://aws.amazon.com/marketplace/pp/prodview-sj4kquyndubiu) IoT Ingest and Control MQTT Broker. Instructions on how to Monitor and Upgrade your <ZillaPlus/> proxy can be found in the [managing a cloudformation stack](../aws-services/manage-cloudformation-stack.md) section.
