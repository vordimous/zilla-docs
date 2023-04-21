---
description: Shows engine load (incubator)
---

# zilla load 🚧

The `zilla load` command provides metrics for each binding in the configuration.

### Usage

```bash:no-line-numbers
zilla load [NAME]
```

### Options

|                           |                               |
| ------------------------- | ----------------------------- |
| `--namespace <namespace>` | Filters bindings by namespace |

### Examples

```bash:no-line-numbers
./zilla load echo0
binding             rx.opens    rx.closes    rx.errors     rx.bytes     tx.opens    tx.closes    tx.errors     tx.bytes
example.echo0              1            1            0           13            1            1            0           13
```

See [Zilla examples](https://github.com/aklivity/zilla-examples) on GitHub.
