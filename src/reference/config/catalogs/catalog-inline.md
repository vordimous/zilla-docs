---
shortTitle: inline
description: Zilla runtime inline catalog
category:
  - Catalog
---

# inline Catalog

::: info Feature Coming Soon <HopeIcon icon="fas fa-circle-right"/>
This is currently on the [Zilla roadmap](https://github.com/orgs/aklivity/projects/4). Star and watch the [Zilla repo](https://github.com/aklivity/zilla/releases) for new releases!
:::

Zilla runtime inline catalog

```yaml {2}
catalog:
  type: inline
```

## Summary

## Configuration

:::: note Properties

- [options](#options)
  - [options.subjects](#options-subjects)
    - [subjects.schema\*](#subjects-schema)
    - [subjects.version](#subjects-version)

::: right
\* required
:::

::::

### options

> `object`

```yaml
options:
```

#### options.subjects

> `object` as map of named properties

##### subjects.schema\*

> `string`

##### subjects.version

> `string` | Default: `"latest"`
