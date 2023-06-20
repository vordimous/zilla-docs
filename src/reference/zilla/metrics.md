---
description: Shows engine metrics
---

# zilla metrics

The `zilla metrics` command provides metrics for each binding in the configuration.

## Usage

```bash:no-line-numbers
zilla metrics [binding]
```

Optionally specify a binding name to output metrics for that binding only.

## Options

|                           |                               |
| ------------------------- | ----------------------------- |
| `--namespace <namespace>` | Filters bindings by namespace |

## Examples

```bash:no-line-numbers
./zilla metrics echo_server0
namespace    binding         metric                    value
example      echo_server0    stream.opens.received        24
example      echo_server0    stream.opens.sent            24
example      echo_server0    stream.closes.received       24
example      echo_server0    stream.closes.sent           24
example      echo_server0    stream.data.received         13
example      echo_server0    stream.data.sent             13
example      echo_server0    stream.errors.received        0
example      echo_server0    stream.errors.sent            0
```

See [Zilla examples](https://github.com/aklivity/zilla-examples) on GitHub.
