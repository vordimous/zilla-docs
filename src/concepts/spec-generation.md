---
breadcrumb: false
---

# Zilla APIs from Standard Specifications

Zilla can leverage standard API schema specifications to configure the settings that define common API interfaces. Zilla will use the details specified in the API spec with sensible defaults to reuse the existing design and reduce complexity.

## OpenAPI and AsyncAPI

The Zilla config uses many of the same parameters as the public and open-source interface definition languages [OpenAPI](https://www.openapis.org/) and [AsyncAPI](https://www.asyncapi.com/). Services and tools are available to describe your existing APIs and infrastructure using OpenAPI and AsyncAPI definitions. These specs enable more consistent documentation, versioning, and code generation. Using the [openapi](../reference/config/bindings/openapi/) and [asyncapi](../reference/config/bindings/asyncapi/README.md) bindings enables the use of existing interface specs to configure Zilla.

Zilla leverages the interface definitions in these specs to generate the necessary `zilla.yaml` config to implement the defined services. Zilla doesn't generate code that needs to be maintained. Instead, it generates the underlying configuration necessary to implement a functioning interface. Both standard and complex use cases are implemented easily with Zilla.

You can see a working [Petstore Demo](https://github.com/aklivity/zilla-demos/tree/main/petstore) using OpenAPI/AsyncAPI schemas. Zilla can also define and proxy MQTT endpoints utilizing a pair of AsyncAPI schemas. Check out the [Taxi Demo](https://github.com/aklivity/zilla-demos/tree/main/taxi) to see a Zilla MQTT proxy defined using AsyncAPI, which is deployed [Live](https://taxi.aklivity.io/) using Kubernetes.

### OpenAPI

Zilla implements the RESTful APIs defined in the [openapi](../reference/config/bindings/openapi/) binding. A REST Kafka proxy is defined using the [openapi-asyncapi](../reference/config/bindings/openapi-asyncapi/) binding. The Kafka configuration is defined with an [asyncapi](../reference/config/bindings/asyncapi/README.md) `client` binding.

> [Petstore REST demo](https://github.com/aklivity/zilla-demos/tree/main/petstore) | [Taxi Hailing demo](https://github.com/aklivity/zilla-demos/tree/main/taxi) | [openapi.proxy example](https://github.com/aklivity/zilla-examples/tree/main/openapi.proxy)

### AsyncAPI

Zilla implements Event-Driven APIs defined in the [asyncapi](../reference/config/bindings/asyncapi/) binding. A Kafka proxy is defined using the [asyncapi](../reference/config/bindings/asyncapi/) `proxy` binding. The Kafka configuration is defined with an [asyncapi](../reference/config/bindings/asyncapi/README.md) `client` binding.

> [Taxi Hailing demo](https://github.com/aklivity/zilla-demos/tree/main/taxi) | [asyncapi.http.kafka.proxy example](https://github.com/aklivity/zilla-examples/tree/main/asyncapi.http.kafka.proxy) | [asyncapi.mqtt.kafka.proxy example](https://github.com/aklivity/zilla-examples/tree/main/asyncapi.mqtt.kafka.proxy) | [asyncapi.sse.kafka.proxy example](https://github.com/aklivity/zilla-examples/tree/main/asyncapi.sse.kafka.proxy)

## Protobuf

The Zilla gRPC Kafka Proxy lets you implement gRPC service definitions from protobuf files to produce and consume messages via Kafka topics.

Zilla can be the gRPC server, routing a service method's request and response messages to and from Kafka topics, or Zilla can fanout messages from a Kafka topic to multiple gRPC clients using the [grpc-kafka](../reference/config/bindings/grpc-kafka/) and [kafka-grpc](../reference/config/bindings/kafka-grpc/) bindings in a [zilla.yaml](../reference/config/overview.md) config. Additionally, Zilla can sit on the critical path between a gRPC client and a server. They can communicate as if they are talking directly to each other, while Zilla actually proxies the messages through Kafka.

> [grpc.kafka.fanout example](https://github.com/aklivity/zilla-examples/tree/main/grpc.kafka.fanout) | [grpc.proxy example](https://github.com/aklivity/zilla-examples/tree/main/grpc.proxy)
