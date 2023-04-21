---
description: Installs the generated runtime files
---

# zpm install

### Description

The `zpm install` command resolves the [Zilla Manager Configuration](../zpm.json.md) to create a runtime with minimal dependencies, generating the `zilla` runtime executable.

### Usage

```bash:no-line-numbers
zpm install
```

### Options

|                                 |                                                                                  |
| ------------------------------- | -------------------------------------------------------------------------------- |
| `--debug`                       | Link `jdk.jdwp.agent` module<br>Defaults to `false` |
| `--exclude-local-repository`    | Exclude the local Maven repository when resolving dependencies                   |
| `--exclude-remote-repositories` | Exclude remote Maven repositories when resolving dependencies                    |

### Examples

```bash:no-line-numbers
./zpmw install
```

See [Zilla examples](https://github.com/aklivity/zilla-examples) on GitHub.
