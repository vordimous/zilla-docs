---
description: Tunes the engine (incubator)
---

# zilla tune 🚧

The `zilla tune` command tunes the mapping from runtime engine workers to bindings.

### Usage

```bash
zilla tune [NAME=VALUE]
```

### Examples

```bash
./zilla start --workers 4
started
```

```bash
./zilla tune
xxxx  example.tcp0
xxxx  example.echo0
```

```bash
./zilla tune example.echo0=2
..x.  example.echo0
```

```bash
./zilla tune
xxxx  example.tcp0
.x..  example.echo0
```

See [Zilla examples](https://github.com/aklivity/zilla/tree/develop/examples) on GitHub.
