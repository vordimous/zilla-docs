# Getting Started with Zilla

Zilla can validate API requests and message streams using your OpenAPI and AsyncAPI schemas. Zilla implements the OpenAPI and AsyncAPI schemas directly meaning there are little or no changes necessary to start serving you existing operations through Zilla. You can just drop in an existing OpenAPI/AsyncAPI specification and Zilla can seamlessly integrate with your current API management workflows and tooling.

You can see a working [Petstore Demo](https://github.com/aklivity/zilla-demos/tree/main/petstore) using OpenAPI/AsyncAPI schemas. Zilla can also define and proxy MQTT endpoints using a pair of AsyncAPI schemas. Check out the [Taxi Demo](https://github.com/aklivity/zilla-demos/tree/main/taxi) to see a Zilla MQTT proxy defined using AsyncAPI, which is deployed [Live](https://taxi.aklivity.io/) using Kubernetes.

> [Petstore Demo](https://github.com/aklivity/zilla-demos/tree/main/petstore) | [Taxi Demo](https://github.com/aklivity/zilla-demos/tree/main/taxi)

You can explicitly define your APIs in a Zilla configuration by carefully orchestrating all of the different [Bindings](../concepts/config-intro.md#Bindings) Zilla has to offer. You can see many of them on display by using the [Kafka Proxy Quickstart](../tutorials/quickstart/kafka-proxies.md) or checking out the [Zilla Examples](https://github.com/aklivity/zilla-examples) repo.

> [Kafka Proxy Quickstart](../tutorials/quickstart/kafka-proxies.md) | [Zilla Examples](https://github.com/aklivity/zilla-examples)

## Homebrew

You can install Zilla using our [homebrew tap](https://github.com/aklivity/homebrew-tap).

```bash:no-line-numbers
brew tap aklivity/tap
brew install zilla
```

Now you can run any `zilla.yaml` config.

```bash:no-line-numbers
zilla start -ve -c ./zilla.yaml
```

## Docker

You can run your `zilla.yaml` config inside of a container. If you want to deploy on Kubernetes you can use our [helm chart](./deploy-operate.md).

```bash:no-line-numbers
docker run -v ./zilla.yaml:/etc/zilla/zilla.yaml ghcr.io/aklivity/zilla:latest start -ve
```

## The zilla.yaml Config

The `zilla.yaml` config is declaratively configured to clearly define API mappings and endpoints that Zilla implements. This makes creating and managing your Zilla services easy.

> [Zilla config intro](../concepts/config-intro.md) | [bindings](../reference/config/overview.md#bindings) | [guards](../reference/config/overview.md#guards) | [vaults](../reference/config/overview.md#vaults) | [catalogs](../reference/config/overview.md#catalogs) | [telemetry](../reference/config/overview.md#telemetry)

## Zilla HTTP Proxy

The Zilla HTTP Kafka Proxy lets you configure application-centric REST APIs and SSE streams that unlock Kafka event-driven architectures.

> [Overview and Features](../concepts/kafka-proxies/http-proxy.md) | [Simple CRUD API](../tutorials/rest/rest-intro.md) | [Simple SSE Stream](../tutorials/sse/sse-intro.md) | [Petstore Demo](https://github.com/aklivity/zilla-demos/tree/main/petstore)

## Zilla gRPC Proxy

The Zilla gRPC Kafka Proxy lets you implement gRPC service definitions from protobuf files to produce and consume messages via Kafka topics.

> [Overview and Features](../concepts/kafka-proxies/http-proxy.md) | [Simple gRPC Server](../tutorials/grpc/grpc-intro.md) | [Route Guide example](../how-tos/grpc/grpc.route-guide.service.md)

## Zilla MQTT Proxy

The Zilla MQTT Kafka Proxy manages MQTT Pub/Sub connections and messages on and off of Kafka.

> [Overview and Features](../concepts/kafka-proxies/http-proxy.md) | [Simple MQTT Broker](../tutorials/mqtt/mqtt-intro.md) | [MQTT Kafka broker](../how-tos/mqtt/mqtt.kafka.broker.md) | [Taxi Demo](https://github.com/aklivity/zilla-demos/tree/main/taxi)

## Zilla Plus <FontIcon icon="aky-zilla-plus"/>

Everything in OSS plus commercial integrations and enterprise support. Partner-certified solutions for Confluent Cloud, Redpanda, and AWS MSK. Check out the [<ZillaPlus/>](https://www.aklivity.io/products/zilla-plus) product page and find detailed instructions for each of our markeplace offerings below.

> [Amazon MSK Secure Public Access](../solutions/how-tos/amazon-msk/secure-public-access/overview.md)
> This allows Kafka clients from outside the private network access to the full functionality of your Amazon MSK cluster.

> [Confluent Cloud Secure Public Access](../solutions/how-tos/confluent-cloud/secure-public-access.md)
> This allows Confluent and Kafka clients from outside the private network access to the full functionality of your Confluent Cloud cluster.

> [Amazon MSK IoT Access and Control](../solutions/how-tos/confluent-cloud/iot-ingest-control.md)
> Your Amazon cluster is turned into a fully-fledged MQTT broker.

> [Confluent Cloud IoT Access and Control](../solutions/how-tos/confluent-cloud/iot-ingest-control.md)
> Your Confluent Cloud cluster is turned into a fully-fledged MQTT broker.

> [Redpanda IoT Access and Control](../solutions/how-tos/confluent-cloud/iot-ingest-control.md)
> Your Redpanda cluster is turned into a fully-fledged MQTT broker.
