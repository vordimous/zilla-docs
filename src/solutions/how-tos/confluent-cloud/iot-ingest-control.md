---
icon: aky-zilla-plus
description: Set up an IoT Ingest and Control MQTT Broker that lets clients publish messages and subscribe to topics proxied to Kafka topics in your Confluent Cloud cluster.
---

# Confluent Cloud IoT Ingest and Control

[Available in <ZillaPlus/>](https://www.aklivity.io/products/zilla-plus)
{.zilla-plus-badge .hint-container .info}

::: info Estimated time to complete 10-15 minutes.
:::

## Overview

The [Zilla Plus for Confluent Cloud](https://aws.amazon.com/marketplace/pp/prodview-eblxkinsqbaks) IoT Ingest and Control MQTT Broker lets clients publish messages and subscribe to topics that are proxied to Kafka topics in your Confluent Cloud Kafka cluster.

## Prerequisites

<!-- @include: ../../_partials/iot-ingest-control/prerequisites.md  -->

## Create the Confluent Cloud Cluster

> This creates your Confluent Cloud cluster.

The [Confluent Cloud Quickstart](https://docs.confluent.io/cloud/current/get-started/index.html) will walk you through creating one. You can skip this step if you have already created a Confluent Cloud cluster with an equivalent configuration.

- Cluster Name: `my-zilla-iot-cc-cluster`
- Cluster Type: any
- Create Topics:
  - With cleanup policy "delete" to store MQTT messages: `mqtt-messages`
  - With cleanup policy "compact" to store MQTT retained messages: `mqtt-retained`
  - With cleanup policy "compact" to store MQTT sessions: `mqtt-sessions`

### Create an API key

Follow the [Use API Keys to Control Access in Confluent Cloud](https://docs.confluent.io/cloud/current/access-management/authenticate/api-keys/api-keys.html) instructions to create an API key and secret. Save the key and secret for use later.

### Create a Secret with SASL/SCRAM authentication params

> This creates a Secrets Manager secret with the necessary properties to access the Confluent Cloud cluster.

Follow the [Store a new secret](https://console.aws.amazon.com/secretsmanager/newsecret) wizard with the following parameters and defaults.

::: note Locate your Bootstrap server URL
You can find your `<cc-bootstrap-server>` in your Confluent Cloud [cluster settings](https://docs.confluent.io/cloud/current/clusters/broker-config.html#cluster-settings-console).
:::

- Secret Type: `Other type of secret`
- Value:
  - Plaintext JSON object:

    ```json
    {
      "api_key":"<cc-api-key>",
      "api_secret":"<cc-api-secret>",
      "bootstrap_server":"<cc-bootstrap-server>",
    }
    ```

- Secret Name: `my-zilla-iot-access-secret`
- Review and store the secret

## Zilla proxy AWS resources

<!-- @include: ../../_partials/iot-ingest-control/aws-resources.md  -->

## Subscribe via AWS Marketplace

The [Zilla Plus for Confluent Cloud](https://aws.amazon.com/marketplace/pp/prodview-eblxkinsqbaks) is available through the AWS Marketplace. You can skip this step if you have already subscribed to Zilla Plus for Confluent Cloud via the AWS Marketplace.

To get started, visit the Proxy's Marketplace [Product Page](https://aws.amazon.com/marketplace/pp/prodview-eblxkinsqbaks) and `Subscribe` to the offering. You should now see `Zilla Plus for Confluent Cloud` listed in your [AWS Marketplace](https://console.aws.amazon.com/marketplace) subscriptions.

## Deploy the IoT Ingest and Control MQTT Broker

> This initiates deployment of the Zilla Plus for Confluent Cloud stack via CloudFormation.

Navigate to your [AWS Marketplace](https://console.aws.amazon.com/marketplace) subscriptions and select `Zilla Plus for Confluent Cloud` to show the manage subscription page.

<!-- @include: ../../_partials/iot-ingest-control/launch-cf-stack.md  -->

## Verify MQTT client connectivity

<!-- @include: ../../_partials/iot-ingest-control/verify-mqtt-client-connectivity.md  -->

## Verify the Zilla proxy service

<!-- @include: ../../_partials/zilla-plus-proxy/verify-zilla-plus-proxy-service.md  -->

## Conclusion

You have successfully deployed the [Zilla Plus for Confluent Cloud](https://aws.amazon.com/marketplace/pp/prodview-eblxkinsqbaks) IoT Ingest and Control MQTT Broker. Instructions on how to Monitor and Upgrade your <ZillaPlus/> proxy can be found in the [managing a cloudformation stack](./../aws-services/manage-cloudformation-stack.md) section.
