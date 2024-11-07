---
shortTitle: client
---

# mqtt client

The mqtt client binding encodes the MQTT protocol to the outbound network stream.

```yaml {3}
<!-- @include: ./.partials/client.yaml -->
```

## Configuration (\* required)

### options

> `object`

The `client` specific options.

```yaml
options:
  authorization:
    my_jwt_guard:
      credentials:
        connect:
          username: Bearer {credentials}
  versions:
    - v5
    - v3.1.1
```

<!-- @include: ./.partials/options.md -->

#### options.authorization

> `object` as map of named `object` properties

Authorization by a named guard.

```yaml
authorization:
  my_jwt_guard:
    credentials:
      connect:
        username: Bearer {credentials}
```

<!-- @include: ../.partials/options-mqtt-auth.md -->

<!-- @include: ./.partials/routes.md -->
<!-- @include: ../.partials/exit.md -->
<!-- @include: ../.partials/telemetry.md -->
