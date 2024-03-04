---
category:
  - CLI
description: The command line interface to control the Zilla runtime.
---

# Zilla Runtime CLI

The Zilla Runtime command line interface uses the [Zilla Runtime Configuration](./overview.md) to control and observe the Zilla runtime.

:::: note Commands

- [zilla dump](#zilla-dump)
  - [-a --affinity `<affinity>`](#a-affinity-affinity)
  - [-b --bindings `<bindings>`](#b-bindings-bindings)
  - [-i --install `<plugin-directory>`](#i-install-plugin-directory)
  - [-v --verbose](#v-verbose)
  - [-w --write `<output>`](#w-write-output)
- [zilla generate](#zilla-generate)
  - [-t --template `<template>`](#t-template-template)
  - [-i --input `<input-file>`](#i-input-input-file)
  - [-o --output `<output-file>`](#o-output-output-file)
- [zilla help](#zilla-help)
- [zilla metrics](#zilla-metrics)
  - [--namespace `<namespace>`](#namespace-namespace)
- [zilla start](#zilla-start)
  - [-v --verbose](#v-verbose)
  - [--workers](#workers)
- [zilla stop](#zilla-stop)
- [zilla tune](#zilla-tune)

::::

## Commands

### zilla dump

::: important Feature is in Incubator
Read how to [enable incubator features](../../how-tos/install.md#enable-incubator-features). Star and watch the [Zilla repo](https://github.com/aklivity/zilla/releases) for new releases!
:::

The `zilla dump` command creates a `pcap` file that can be opened in Wireshark. Using the Zilla dissector plugin, Wireshark shows detailed information about the internal state of the current Zilla instance.

#### -a --affinity `<affinity>`

Only dump the frames that match the specified affinity mask.

#### -b --bindings `<bindings>`

Only dump the frames for the specified bindings.

#### -i --install `<plugin-directory>`

Install the dissector plugin `zilla.lua` to the plugin directory of Wireshark. This is only necessary if you run the `dump` command for the first time or if you want to update the plugin to the current version.

To find the Wireshark plugin directory navigate the menu: About Wireshark -> Folders -> Personal Lua Plugins; or use this command:

```bash:no-line-numbers
tshark -G folders | grep "Personal Lua Plugins"
```

To find out the plugin version navigate the menu: About Wireshark -> Plugins -> search: zilla; or use this command:

```bash:no-line-numbers
tshark -G plugins | grep zilla
```

You may need to reload Lua plugins from the menu: Analyze -> Reload Lua Plugins or with the keyboard shortcut (Command+Shift+L or Ctrl+Shift+L).

Example:
```bash:no-line-numbers
./zilla dump -v -w zilla.pcap -i ~/.local/lib/wireshark/plugins
```

#### -v --verbose

Show verbose output

#### -w --write `<output>`

Write the `pcap` output to this file. 

Example:
```bash:no-line-numbers
./zilla dump -v -w zilla.pcap
```

### zilla generate

::: important Feature is in Incubator
Read how to [enable incubator features](../../how-tos/install.md#enable-incubator-features). Star and watch the [Zilla repo](https://github.com/aklivity/zilla/releases) for new releases!
:::

The `zilla generate` command generates a zilla configuration file from an OpenAPI or AsyncAPI service definition.

The command currently has templates for the following common scenarios:

- `openapi.http.proxy` - create an http proxy config based on an OpenAPI service definition
- `asyncapi.http.proxy` - create an http proxy config based on an AsyncAPI service definition
- `asyncapi.mqtt.proxy` - create an mqtt proxy config based on an AsyncAPI service definition

You have to specify which template to use, the OpenAPI/AsyncAPI service definition as the input file and the output file name you want the generated zilla config to be saved.

```bash:no-line-numbers
zilla generate -t <template> -i <input-file> -o <output-file>
```

#### -t --template `<template>`

The template to use for the config generation.

#### -i --input `<input-file>`

The OpenAPI/AsyncAPI service definition.

#### -o --output `<output-file>`

The file name you want the generated zilla config to be saved.

Example:

```bash:no-line-numbers
./zilla generate -t asyncapi.http.proxy -i my-asyncapi-service.yaml -o zilla.yaml
```

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

```output:no-line-numbers
namespace    binding         metric                    value
example      echo_server    stream.opens.received        24
example      echo_server    stream.opens.sent            24
example      echo_server    stream.closes.received       24
example      echo_server    stream.closes.sent           24
example      echo_server    stream.data.received         13
example      echo_server    stream.data.sent             13
example      echo_server    stream.errors.received        0
example      echo_server    stream.errors.sent            0
```

### zilla start

The `zilla start` command resolves the [Zilla Runtime Configuration](./overview.md) in a `zilla.yaml` to start the runtime engine.

```bash:no-line-numbers
zilla start
```

> started

#### -v --verbose

Show verbose output

```bash:no-line-numbers
zilla start -v
```

```output:no-line-numbers
name: example
bindings:
  tcp:
    type: tcp
    kind: server
    options:
      host: 0.0.0.0
      port:
      - 12345
      - 12346
    exit: echo
  echo:
    type: echo
    kind: server
started
```

#### --workers

> Defaults to # CPU cores available

Worker count

### zilla stop

The `zilla stop` command signals the runtime engine to stop.

```bash:no-line-numbers
zilla stop
```

> stopped

### zilla tune

::: important Feature is in Incubator
Read how to [enable incubator features](../../how-tos/install.md#enable-incubator-features). Star and watch the [Zilla repo](https://github.com/aklivity/zilla/releases) for new releases!
:::

The `zilla tune` command tunes the mapping from runtime engine workers to bindings.

```bash:no-line-numbers
zilla tune [NAME=VALUE]
```

```bash:no-line-numbers
./zilla tune
```

```output:no-line-numbers
xxxx  example.tcp
xxxx  example.echo
```

```bash:no-line-numbers
./zilla tune example.echo=2
```

```output:no-line-numbers
..x.  example.echo
```

```bash:no-line-numbers
./zilla tune
```

```output:no-line-numbers
xxxx  example.tcp
.x..  example.echo
```
