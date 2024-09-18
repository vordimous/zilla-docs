# Catalogs

Each configured [`catalog`](../reference/config/overview.md#catalogs) represents a resource for referencing versioned assets. Catalogs make configuring Zilla more agnostic to specific API and Model design. A catalog provides Zilla bindings with schemas, specs, and other files needed to implement the binding. For example, schema models are used to validate messages brokered by Zilla.

```yaml
---
name: zilla-namespace

catalogs:
  host_filesystem:
    type: filesystem
    options:
      subjects:
        petstore:
          path: petstore.yaml
```

## Local Catalogs

The simplest catalogs allow Zilla to access resources directly. The [filesystem](../reference/config/catalogs/catalog-filesystem.md) catalog will look for resources on the host filesystem. To embed a resource directly into the Zilla config yaml an [inline](../reference/config/catalogs/catalog-inline.md) catalog can be used to define any text based resource.

> [Local Catalogs Guide](../how-tos/catalogs/index.md#local-catalogs) | [http.proxy.schema.inline example](https://github.com/aklivity/zilla-examples/tree/main/http.proxy.schema.inline)

## Remote Catalogs

Zilla can reference remote configs stored in third-party services like Schema Registry. The [schema-registry](../reference/config/catalogs/catalog-schema-registry.md) and [apicurio-registry](../reference/config/catalogs/catalog-apicurio-registry.md) catalogs allow zilla to interact with those services through their admin APIs.

> [Remote Catalogs Guide](../how-tos/catalogs/index.md#remote-catalogs) | [Apicurio in the Petstore REST Demo](https://github.com/aklivity/zilla-demos/tree/main/petstore) | [http.kafka.karapace example](https://github.com/aklivity/zilla-examples/tree/main/http.kafka.karapace)
