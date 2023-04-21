---
description: Starts the engine
---

# zilla start

The `zilla start` command resolves the [Zilla Runtime Configuration](../zilla.yaml/) in `zilla.json` to start the runtime engine.

### Usage

```bash:no-line-numbers
zilla start
```

### Options

|              |                                                          |
| ------------ | -------------------------------------------------------- |
| `--verbose`  | Show verbose output                                      |
| `--workers`  | Worker count<br>Defaults to # CPU cores available        |

### Examples

```bash:no-line-numbers
./zilla start --verbose
{
    "name": "example",
    "bindings":
    {
        "tcp0":
        {
            "type" : "tcp",
            "kind": "server",
            "options":
            {
                "host": "0.0.0.0",
                "port": [ 12345, 12346 ]
            },
            "exit": "echo0"
        },
        "echo0":
        {
            "type" : "echo",
            "kind": "server"
        }
    }
}
started
```

See [Zilla examples](https://github.com/aklivity/zilla-examples) on GitHub.
