---
shortTitle: cache_client
---

# kafka cache_client

The kafka cache_client binding supports filtering by `kafka` message key, headers or a combination of key and headers.

```yaml {3}
<!-- @include: ./.partials/cache_client.yaml -->
```

## Configuration (\* required)

### options

> `object`

The `cache_client` specific options.

```yaml
options:
  topics:
    - name: items-requests
```

#### options.topics

> `array` of `object`

Topic configuration.

<!-- @include: ../.partials/options-kafka-topics.md -->

<!-- @include: ./.partials/routes.md -->
<!-- @include: ../.partials/exit.md -->
<!-- @include: ../.partials/telemetry.md -->
