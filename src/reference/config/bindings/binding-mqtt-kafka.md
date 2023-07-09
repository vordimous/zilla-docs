---
shortTitle: mqtt-kafka 🔜
description: Zilla runtime mqtt-kafka binding (incubator)
category:
  - Binding
tag:
  - Proxy
---

# mqtt-kafka Binding

Zilla runtime mqtt-kafka binding.

::: info Feature Coming Soon

This is currently in the incubator. Follow the [Zilla repo](https://github.com/aklivity/zilla/releases) to know when it will be released!

:::

```yaml {2}
mqtt_server:
  type: mqtt-kafka
  kind: proxy
  exit: kafka_cache_client0
```

## Summary

Defines a binding with `mqtt-kafka`  support, with `proxy` behavior.

## Configuration

:::: note Properties

- [kind\*](#kind)
- [exit](#exit)

::: right
\* required
:::

::::

### kind\*

> `enum` [ "proxy" ]

Behave as a `mqtt-kafka` `proxy`.

### exit

> `string`

Default exit binding when no conditional routes are viable.

```yaml
exit: kafka_cache_client0
```

---

::: right
\* required
:::
