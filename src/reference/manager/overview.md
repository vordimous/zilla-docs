---
description: Defines the Zilla manager engine configuration in ${user.home}/.zpm/
---

# Zilla Manager Configuration

The [Zilla Manager command line interface](./zpm-cli.md) uses the Zilla Manager Configuration to package the [Zilla runtime](../config/zilla-cli.md) with minimal dependencies.

:::: note Config Files

- [zpm.json](#zpm-json)
  - [repositories](#repositories)
  - [imports](#imports)
  - [dependencies](#dependencies)
- [settings.json](#settings-json)
  - [credentials](#credentials)
      - [credentials\[\].host](#credentials-host)
      - [credentials\[\].username](#credentials-username)
      - [credentials\[\].password](#credentials-password)
- [security.json](#security-json)
  - [secret](#secret)

::: right
\* required
:::

::::

## Config Files

The Zilla Manager config files should be in the `${user.home}/.zpm/` directory.

### zpm.json

Configures dependencies to be resolved when packaging the Zilla runtime.

```json:no-line-numbers
{
  "repositories": [
    "https://maven.packages.aklivity.io/",
    "https://repo1.maven.org/maven2/"
  ],

  "imports": ["io.aklivity.zilla:runtime:0.9.5"],

  "dependencies": [
    "io.aklivity.zilla:engine",
    "io.aklivity.zilla:binding-tcp",
    "io.aklivity.zilla:binding-tls"
  ]
}
```

#### repositories

> `array` of `string`

Pattern: `scheme://host:port/path` (URL)

List of repository URLs

#### imports

> `array` of `string`

Pattern: `groupId:artifactId:version`

List of Maven BOMs to import managed dependency versions

#### dependencies

> `array` of `string`

Pattern: `groupId:artifactId[:version]`

List of Maven dependencies

### settings.json

Stores the remote repository credentials.

```json:no-line-numbers
{
  "credentials": [
    {
      "host": "...",
      "username": "...",
      "password": "..."
    }
  ]
}
```

#### credentials

> `array` of `object`

List of repository credentials

##### credentials[].host

> `string`

Repository hostname

##### credentials[].username

> `string`

Repository credentials username

##### credentials[].password

> `string`

Repository credentials password (encrypted, base64)

### security.json

Stores the encoded master secret.

```json:no-line-numbers
{
  "secret": "..."
}
```

#### secret

> `string`

Master secret (encrypted, base64)
