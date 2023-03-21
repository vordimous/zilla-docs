---
description: Installs the generated runtime files
---

# zpm install

### Description

The `zpm install` command resolves the [Zilla Manager Configuration](../zpm.json.md) to create a runtime with minimal dependencies, generating the `zilla` runtime executable.

### Usage

```bash
zpm install
```

### Options

|                                 |                                                                                  |
| ------------------------------- | -------------------------------------------------------------------------------- |
| `--debug`                       | <p>Link <code>jdk.jdwp.agent</code> module<br>Defaults to <code>false</code></p> |
| `--exclude-local-repository`    | Exclude the local Maven repository when resolving dependencies                   |
| `--exclude-remote-repositories` | Exclude remote Maven repositories when resolving dependencies                    |

### Examples

```bash
./zpmw install
```

See [Zilla examples](https://github.com/aklivity/zilla/tree/develop/examples) on GitHub.
