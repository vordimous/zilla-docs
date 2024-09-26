### catalog

> `object` as map of named `array`

To map defined catalog for schema retrieval based on catalog specific parameters. Any of the possible combination can be configured.

> `id`

```yaml
catalog:
  my_catalog:
    - id: unique-catalog-id
```

-----
> `strategy`

```yaml
catalog:
  my_catalog:
    - strategy: topic
```

-----
> `subject`

```yaml
catalog:
  my_catalog:
    - subject: http
```

#### catalog[].strategy\*

> `enum` [ `topic` ]

To determine the subject based on the specified strategy

#### catalog[].subject\*

> `string`

Unique identifier for schema categorization in the catalog.

#### catalog[].version

> `string` | Default: `latest`

Specific iteration or version of a registered schema in the defined catalog.

#### catalog[].id\*

> `integer`

Define specific schema id to refer from catalog.
