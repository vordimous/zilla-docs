### options

> `object`

The `filesystem` specific options.

```yaml
options:
  location: web/
  simlinks: follow
```

#### options.location

> `string`

File system URI or directory name with trailing slash.

#### options.symlinks

> `enum` [ `follow`, `ignore` ] | Default: `ignore`

How to treat symbolic links.
