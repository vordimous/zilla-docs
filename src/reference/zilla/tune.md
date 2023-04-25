---
description: Tunes the engine (incubator)
---

# zilla tune 🚧

The `zilla tune` command tunes the mapping from runtime engine workers to bindings.

### Usage

```bash:no-line-numbers
zilla tune [NAME=VALUE]
```

### Examples

```bash:no-line-numbers
./zilla start --workers 4
started
```

```bash:no-line-numbers
./zilla tune
xxxx  example.tcp0
xxxx  example.echo0
```

```bash:no-line-numbers
./zilla tune example.echo0=2
..x.  example.echo0
```

```bash:no-line-numbers
./zilla tune
xxxx  example.tcp0
.x..  example.echo0
```

See [Zilla examples](https://github.com/aklivity/zilla-examples) on GitHub.
