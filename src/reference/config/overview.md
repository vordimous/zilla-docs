---
description: Defines the Zilla runtime engine configuration in a zilla.yaml
---

# Zilla Runtime Configuration

The Zilla runtime configuration defines the [`bindings`](#bindings), [`guards`](#guards), [`vaults`](#vaults), [`catalogs`](#catalogs), and [`telemetry`](#telemetry) used by the Zilla runtime engine. The values of properties in the configuration can be literals or expression [resolvers](./resolvers.md).

```yaml {2}
---
name: zilla-namespace

bindings:
  ...

guards:
  ...

vaults:
  ...

catalogs:
  ...

telemetry:
  ...
```

## Configuration

:::: note Properties

- [name\*](#name)
- [bindings](#bindings)
  - [routes.exit](#routes-exit)
- [guards](#guards)
- [vaults](#vaults)
- [catalogs](#catalogs)
- [telemetry](#telemetry)
  - [attributes](#attributes)
  - [exporters](#exporters)
  - [metrics](#metrics)

::: right
\* required
:::

::::

### name\*

> `string`

Namespace name.

### bindings

> `object` as map of named [`binding`](./bindings/) properties

Each configured `binding` represents a step in the pipeline as data streams are decoded, translated or encoded according to a specific protocol `type`.

A `binding` also has a `kind`, indicating how it should behave, such as `server`, `proxy` or `client`.

As each incoming data stream arrives, the binding follows its configured `routes` to reach an `exit` binding, or rejects the stream if no routes are viable. Route matching conditions are defined in terms specific to each `binding` type.

#### routes.exit

> `string`

Unconditional `exit` binding acting as a default if none of the conditional routes are viable.

### guards

> `object` as map of named [`guard`](./guards/) properties

Each configured `guard` represents a security checkpoint for one or more bindings based on a specific implementation `type`.

Guards can be used by specific protocol bindings to enforce authorization requirements.

Associated roles can be enforced during routing by only following routes `guarded` by specific role requirements when authorized. This implicitly supports falling through to lower privilege routes when `guarded` higher privilege routes are not authorized.

### vaults

> `object` as map of named [`vault`](./vaults/) properties

Each configured `vault` represents a container for digital keys and certificates based on a specific implementation `type`.

Vaults can be used by specific protocol bindings, such as `tls`, to negotiate shared encryption keys.

### catalogs

> `object` as map of named [`catalog`](./catalogs/) properties

Each configured `catalog` represent a catalog of schemas of various format based on a specific implementation `type`.

Catalogs can be used by specific protocol bindings to enforce validation.

### telemetry

> `object` of [`telemetry`](./telemetry/) properties

```yaml
telemetry:
  attributes:
    service.namespace: example
  exporters:
    ...
  metrics:
    ...
```

#### attributes

> `object` | Default: zilla namespace [name](#name)

Default attributes to optionally include when exporting metrics.

#### exporters

> `object` as map of named [`exporter`](./telemetry/exporters/) properties

Map of named exporters.

#### metrics

> `array` of `string` of named [`metrics`](./telemetry/metrics/)

Array of named metrics.
