---
shortTitle: server
---

# fan server

The fan server binding behaves as an `fan-in` and `fan-out` `server`. The `server` kind `fan` binding performs fan-in of data on all inbound network streams, grouping them into a single application stream. Then data received from the application stream is fanned-out to all network streams in the group.

```yaml {3}
<!-- @include: ./.partials/server.yaml -->
```

## Configuration (\* required)

### exit

> `string`

Default exit binding. When the `exit` is an `echo` server binding, the combination reflects all inbound data from each client to all clients.

```yaml
exit: echo_server
```

<!-- @include: ../.partials/telemetry.md -->
