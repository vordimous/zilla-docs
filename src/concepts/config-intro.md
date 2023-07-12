# Intro to zilla.yaml

The Zilla runtime configuration defines the [`bindings`](../reference/config/bindings/), [`guards`](../reference/config/guards/), [`vaults`](../reference/config/vaults/), and [`telemetry`](../reference/config/telemetry/) used by the Zilla runtime engine. The values of properties in the configuration can be literals or expressions of the form `${{env.VARIABLE}}` to resolve a local environment variable value instead.

[msk](/how-tos/amazon-msk/public-proxy.md)

```yaml {2}
---
name: zilla config
telemetry:
  ...

vaults:
  ...

guards:
  ...

bindings:
  ...
```

## Bindings

Each configured `binding` represents a step in the pipeline as data streams are decoded, translated or encoded according to a specific protocol `type`.

A `binding` also has a `kind`, indicating how it should behave, such as `server`, `proxy` or `client`.

As each incoming data stream arrives, the binding follows its configured `routes` to reach an `exit` binding, or rejects the stream if no routes are viable. Route matching conditions are defined in terms specific to each `binding` type.

See each of the specific `binding` types linked below for more detailed examples.

Behavioral type supporting either encoding and decoding for a specific protocol or translation between protocols.


## Guards

Each configured `guard` represents a security checkpoint for one or more bindings based on a specific implementation `type`.

Guards can be used by specific protocol bindings to enforce authorization requirements.

Associated roles can be enforced during routing by only following routes `guarded` by specific role requirements when authorized. This implicitly supports falling through to lower privilege routes when `guarded` higher privilege routes are not authorized.

See each of the specific `guard` types linked below for more detailed examples.

## Vaults

Each configured `vault` represents a container for digital keys and certificates based on a specific implementation `type`.

Vaults can be used by specific protocol bindings, such as `tls`, to negotiate shared encryption keys.

See each of the specific `vault` types linked below for more detailed examples.


## Telemetry

Define which metrics Zilla should collect and how to export them.

