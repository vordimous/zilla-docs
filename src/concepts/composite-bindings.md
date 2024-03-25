# Zilla Composite Bindings

Composite bindings provide the ability to configure multiple bindings at once. A composite binding is used when multiple zilla bindings are needed to define a common interface. Composite bindings will use sensible defaults and are designed to reduce the configuration complexity.

## OpenAPI and AsyncAPI

::: important Feature is in Incubator
Read how to [enable incubator features](../how-tos/install.md#enable-incubator-features). Star and watch the [Zilla repo](https://github.com/aklivity/zilla/releases) for new releases!
:::

The Zilla config uses many of the same parameters as the public and open-source interface definition languages [OpenAPI](https://www.openapis.org/) and [AsyncAPI](https://www.asyncapi.com/). Services and tools are available to describe your existing APIs and infrastructure using OpenAPI and AsynceAPI definitions. This enables more consistent documentation, versioning, and code generation. Using the [openapi](../reference/config/bindings/binding-openapi.md) and [asyncapi](../reference/config/bindings/binding-asyncapi.md) composite bindings enables the use of existing interface specs to configure Zilla.

Zilla leverages the interface definitions in these specs to generate the necessary `zilla.yaml` config to implement the defined services. Zilla doesn't generate code that needs to be maintained. Instead, it generates the underlying components necessary to implement a functioning interface. This means both common and complex use cases are implemented easily with Zilla.

### OpenAPI

Zilla implements the RESTful APIs defined in the [openapi](../reference/config/bindings/binding-openapi.md) binding. A REST Kafka proxy is configured using the [openapi-asyncapi](../reference/config/bindings/binding-openapi-asyncapi.md) binding. The Kafka configuration is defined with an [asyncapi](../reference/config/bindings/binding-asyncapi.md) `client` binding.

Examples:
- [Pet store REST demo](https://github.com/aklivity/zilla-demos/tree/main/petstore)
- [Taxi Hailing demo](https://github.com/aklivity/zilla-demos/tree/main/taxi)
- [openapi.proxy](https://github.com/aklivity/zilla-examples/tree/main/openapi.proxy)

### AsyncAPI

Zilla implements Event-Driven APIs defined in the [asyncapi](../reference/config/bindings/binding-asyncapi.md) binding. A Kafka proxy is configured using the [asyncapi](../reference/config/bindings/binding-asyncapi.md) `proxy` binding. The Kafka configuration is defined with an [asyncapi](../reference/config/bindings/binding-asyncapi.md) `client` binding.

Examples:
- [Taxi Hailing demo](https://github.com/aklivity/zilla-demos/tree/main/taxi)
- [mqtt.kafka.asyncapi.proxy](https://github.com/aklivity/zilla-examples/tree/main/mqtt.kafka.asyncapi.proxy)
- [mqtt.proxy.asyncapi](https://github.com/aklivity/zilla-examples/tree/main/mqtt.proxy.asyncapi)
