---
shortTitle: server
---

# amqp server

The amqp server binding decodes the AMQP protocol on the inbound network stream, producing higher level application streams for each send or receive link. Defines a binding with [AMQP 1.0](https://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-overview-v1.0-os.html) protocol support, with `server` behavior. Conditional routes based on the link address are used to route these application streams to an `exit` binding.

```yaml {3}
<!-- @include: ./.partials/server.yaml -->
```

::: important Feature is in Incubator
Read how to [enable incubator features](../../../../how-tos/deploy-operate.md#enable-incubator-features). Star and watch the [Zilla repo](https://github.com/aklivity/zilla/releases) for new releases!
:::

## Configuration (\* required)

<!-- @include: ./.partials/routes.md -->
<!-- @include: ../.partials/exit.md -->
<!-- @include: ../.partials/telemetry.md -->
