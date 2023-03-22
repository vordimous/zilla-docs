---
description: Generates zpm wrapper
---

# zpm wrap

### Description

The `zpm wrap` command generates an executable `zpmw` wrapper script that automatically downloads `zpm` if necessary before passing the arguments to `zpm`.

This approach avoids the need to manually install `zpm` and allows greater control over the version of `zpm` being used.

### Usage

```bash
zpm wrap
```

### Options

|                                     |                                                                                                   |
| ----------------------------------- | ------------------------------------------------------------------------------------------------- |
| `--local-repository <locaRepolDir>` | <p>Local Maven repository directory<br>Defaults to <code>${user.home}/.m2/repository</code></p>   |
| `--remote-repository <repoURL>`     | <p>Remote Maven repository URL<br>Defaults to <code>https://maven.packages.aklivity.io</code></p> |
| `--version <version>`               | Require `zpm`  wrapper to use \<version>                                                          |

### Examples

```bash
./zpmw wrap --version 0.9.8
```

Generates an executable `zpmw` script in the same directory, which can be used in place of `zpm` to first ensure that `zpm` version `0.9.8` is automatically downloaded into the `.zpmw/` subdirectory if necessary.
