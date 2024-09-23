---
redirectFrom: /reference/config/bindings/binding-amqp.html
dir:
  collapsible: false
  link: true
shortTitle: amqp
category:
  - Binding
tag:
  - amqp
  - server
---

# amqp Binding

Defines a binding with [AMQP 1.0](https://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-overview-v1.0-os.html) protocol support, with `server` behavior. Conditional routes based on the link address are used to route these application streams to an `exit` binding.

::: important Feature is in Incubator
Read how to [enable incubator features](../../../../how-tos/deploy-operate.md#enable-incubator-features). Star and watch the [Zilla repo](https://github.com/aklivity/zilla/releases) for new releases!
:::

## server

> [Full config](./server.md)

The amqp server binding decodes the AMQP protocol on the inbound network stream, producing higher level application streams for each send or receive link.

```yaml {3}
<!-- @include: ./.partials/server.yaml -->
```
