---
description: Cleans up the generated runtime files
---

# zpm clean

### Description

The `zpm clean` command removes files from its `.zpm/` output directory.

Optionally, only the files necessary to execute the [Zilla Runtime](../zilla/) are kept intact, leaving a minimal installation footprint for deployment.&#x20;

### Usage

```bash
zpm clean
```

### Options

|                |                                                                                   |
| -------------- | --------------------------------------------------------------------------------- |
| `--keep-image` | <p>Clean up everything except runtime image<br>Defaults to <code>false</code></p> |

### Examples

```bash
./zpmw clean --keep-image
```
