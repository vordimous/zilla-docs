---
order: 2
category:
  - CLI
description: The command line interface to control the Zilla runtime.
---

# Zilla Runtime CLI

The Zilla Runtime command line interface uses the [Zilla Runtime Configuration](./) to control and observe the Zilla runtime.

:::: note Commands

- [zilla help](#zilla-help)
- [zilla metrics](#zilla-metrics)
  - [--namespace `<namespace>`](#namespace-namespace)
- [zilla start](#zilla-start)
  - [--verbose](#verbose)
  - [--workers](#workers)
- [zilla stop](#zilla-stop)
- [zilla tune](#zilla-tune)

::::

## Commands

### zilla help

The `zilla help` command shows help information about available commands, or more information for a specific command.

```bash:no-line-numbers
zilla help [command]
```

Examples:

```bash:no-line-numbers
./zilla help start
```

### zilla metrics

The `zilla metrics` command provides metrics for each binding in the configuration.

```bash:no-line-numbers
zilla metrics
```

Optionally specify a binding name to output metrics for that binding only.

```bash:no-line-numbers
zilla metrics [binding-name]
```

#### --namespace `<namespace>`

Filters bindings by namespace

Examples:

```bash:no-line-numbers
./zilla metrics echo_server
```

> namespace    binding         metric                    value
> example      echo_server    stream.opens.received        24
> example      echo_server    stream.opens.sent            24
> example      echo_server    stream.closes.received       24
> example      echo_server    stream.closes.sent           24
> example      echo_server    stream.data.received         13
> example      echo_server    stream.data.sent             13
> example      echo_server    stream.errors.received        0
> example      echo_server    stream.errors.sent            0

### zilla start

The `zilla start` command resolves the [Zilla Runtime Configuration](./) in `zilla.yaml` to start the runtime engine.

```bash:no-line-numbers
zilla start
```

#### --verbose

Show verbose output

#### --workers

> Defaults to # CPU cores available

Worker count

Examples:

```bash:no-line-numbers
./zilla start --verbose
{
    "name": "example",
    "bindings":
    {
        "tcp":
        {
            "type" : "tcp",
            "kind": "server",
            "options":
            {
                "host": "0.0.0.0",
                "port": [ 12345, 12346 ]
            },
            "exit": "echo"
        },
        "echo":
        {
            "type" : "echo",
            "kind": "server"
        }
    }
}
started
```

### zilla stop

The `zilla stop` command signals the runtime engine to stop.

```bash:no-line-numbers
zilla stop
```

Examples:

```bash:no-line-numbers
./zilla start
started
...
```

```bash:no-line-numbers
./zilla stop
...
stopped
```

### zilla tune

::: info Feature Coming Soon

This is currently in the incubator. Follow the [Zilla repo](https://github.com/aklivity/zilla/releases) to know when it will be released!

:::

The `zilla tune` command tunes the mapping from runtime engine workers to bindings.

```bash:no-line-numbers
zilla tune [NAME=VALUE]
```

Examples:

```bash:no-line-numbers
./zilla start --workers 4
```

> started

```bash:no-line-numbers
./zilla tune
```

> `xxxx  example.tcp`\
> `xxxx  example.echo`

```bash:no-line-numbers
./zilla tune example.echo=2
```

> `..x.  example.echo`

```bash:no-line-numbers
./zilla tune
```

> `xxxx  example.tcp`\
> `.x..  example.echo`
