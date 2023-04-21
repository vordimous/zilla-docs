---
description: Cleans up the generated runtime files
---

# zpm clean

### Description

The `zpm clean` command removes files from its `.zpm/` output directory.

Optionally, only the files necessary to execute the [Zilla Runtime](../zilla/) are kept intact, leaving a minimal installation footprint for deployment.

### Usage

```bash:no-line-numbers
zpm clean
```

### Options

|                |                                                                                   |
| -------------- | --------------------------------------------------------------------------------- |
| `--keep-image` | Clean up everything except runtime image<br>Defaults to `false` |

### Examples

```bash:no-line-numbers
./zpmw clean --keep-image
```bash:no-line-numbers
