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

<!-- @include: ../../_partials/iot-ingest-control/prerequisites.md  -->

## Create the Redpanda cluster

> This creates your Redpanda cluster.

The [Redpanda Cloud Quickstart](https://docs.redpanda.com/current/get-started/quick-start-cloud/) will walk you through creating one. You can skip this step if you have already created a Redpanda cluster with an equivalent configuration. 

- Cluster Name: `my-zilla-iot-rp-cluster`
- Cluster Type: any
- Create Topics:
  - With cleanup policy "delete" to store MQTT messages: `mqtt-messages`
  - With cleanup policy "compact" to store MQTT retained messages: `mqtt-retained`
  - With cleanup policy "compact" to store MQTT sessions: `mqtt-sessions`

### Create an API key

Follow the Configure Authentication documentation to set up [SASL/SCRAM in Redpanda](https://docs.redpanda.com/current/manage/security/authentication/#scram). Save the username and password for use later.

### Create a Secret with SASL/SCRAM authentication params

> This creates a Secrets Manager secret with the necessary properties to access the Redpanda cluster.

Follow the [Store a new secret](https://console.aws.amazon.com/secretsmanager/newsecret) wizard with the following parameters and defaults.

- Secret Type: `Other type of secret`
- Value:
  - Plaintext JSON object:

    ```json
    {
      "sasl_username":"<rp-username>",
      "sasl_password":"<rp-password>",
      "bootstrap_server":"<rp-bootstrap-server>",
    }
    ```

- Secret Name: `my-zilla-iot-access-secret`
- Review and store the secret

## Zilla proxy AWS resources

<!-- @include: ../../_partials/iot-ingest-control/aws-resources.md  -->

## Subscribe via AWS Marketplace

The [Zilla Plus for Redpanda](https://aws.amazon.com/marketplace/pp/prodview-sj4kquyndubiu) is available through the AWS Marketplace. You can skip this step if you have already subscribed to Zilla Plus for Redpanda via the AWS Marketplace.

To get started, visit the Proxy's Marketplace [Product Page](https://aws.amazon.com/marketplace/pp/prodview-sj4kquyndubiu) and `Subscribe` to the offering. You should now see `Zilla Plus for Redpanda` listed in your [AWS Marketplace](https://console.aws.amazon.com/marketplace) subscriptions.

## Deploy the IoT Ingest and Control MQTT Broker

> This initiates deployment of the Zilla Plus for Redpanda stack via CloudFormation.

Navigate to your [AWS Marketplace](https://console.aws.amazon.com/marketplace) subscriptions and select `Zilla Plus for Redpanda` to show the manage subscription page.

<!-- @include: ../../_partials/iot-ingest-control/launch-cf-stack.md  -->

## Verify MQTT Client Connectivity

<!-- @include: ../../_partials/iot-ingest-control/verify-mqtt-client-connectivity.md  -->

## Verify the Zilla proxy Service

<!-- @include: ../../_partials/zilla-plus-proxy/verify-zilla-plus-proxy-service.md  -->

## Conclusion

You have successfully deployed the [Zilla Plus for Redpanda](https://aws.amazon.com/marketplace/pp/prodview-sj4kquyndubiu) IoT Ingest and Control MQTT Broker. Instructions on how to Monitor and Upgrade your <ZillaPlus/> proxy can be found in the [managing a cloudformation stack](./../aws-services/manage-cloudformation-stack.md) section.
