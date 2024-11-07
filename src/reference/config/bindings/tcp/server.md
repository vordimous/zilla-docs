---
shortTitle: server
---

# tcp server

The tcp server binding listens for inbound socket connections, producing higher level application streams for each remote TCP client.

```yaml {3}
<!-- @include: ./.partials/server.yaml -->
```

## Configuration (\* required)

<!-- @include: ./.partials/options.md -->
<!-- @include: ./.partials/routes.md -->

<!-- markdownlint-disable-next-line MD001 -->
#### routes[].exit

> `string`

Next binding when following this route, for kind `server` only.

```yaml
routes:
  - when:
    ...
    exit: echo_server
```

<!-- @include: ../.partials/exit.md -->
<!-- @include: ../.partials/telemetry.md -->
