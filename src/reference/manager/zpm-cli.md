---
order: 3
category:
  - CLI
description: The command line interface to manage Zilla dependencies and package the Zilla runtime.
---

# Zilla Manager CLI

The Zilla Manager command line interface uses the [Zilla Manager Configuration](./overview.md) to package the [Zilla runtime](../config/zilla-cli.md) with minimal dependencies.

:::: note Commands

- [zpm help](#zpm-help)
- [zpm clean](#zpm-clean)
  - [--keep-image](#keep-image)
- [zpm encrypt](#zpm-encrypt)
- [zpm install](#zpm-install)
  - [--debug](#debug)
  - [--exclude-local-repository](#exclude-local-repository)
  - [--exclude-remote-repositories](#exclude-remote-repositories)
- [zpm wrap](#zpm-wrap)
  - [--local-repository `<localRepoDir>`](#local-repository-locarepoldir)
  - [--remote-repository `<repoURL>`](#remote-repository-repourl)
  - [--version `<version>`](#version-version)

::::

## Commands

### zpm help

The `zpm help` command shows help information about available commands, or more information for a specific command.

```bash:no-line-numbers
zpm help [command]
```

Examples:

```bash:no-line-numbers
./zpmw help install
```

### zpm clean

The `zpm clean` command removes files from its `.zpm/` output directory.

Optionally, only the files necessary to execute the [Zilla Runtime](../config/zilla-cli.md) are kept intact, leaving a minimal installation footprint for deployment.

```bash:no-line-numbers
zpm clean
```

#### --keep-image

> Default: `false`

Clean up everything except runtime image

Examples:

```bash:no-line-numbers
./zpmw clean --keep-image
```

### zpm encrypt

The `zpm encrypt` command provides a convenient mechanism to encrypt secrets using a securely generated master secret.

When Maven repositories requiring authorization are listed in [Zilla Manager Configuration](./overview.md), then the output of this command can be used to provide encrypted credentials in [Zilla Manager Settings](./overview.md#settings.json).

If a master secret does not already exist, it is generated in [Zilla Manager Security](./overview.md#security.json).

```bash:no-line-numbers
zpm encrypt
```

Examples:

```bash:no-line-numbers
./zpmw encrypt
```

Enter a password to `zpmw encrypt` via standard input, then the base64-encoded encrypted password is displayed via standard output.

### zpm install

The `zpm install` command resolves the [Zilla Manager Configuration](./overview.md) to create a runtime with minimal dependencies, generating the `zilla` runtime executable.

```bash:no-line-numbers
zpm install
```

#### --debug

> Default: `false`

Link `jdk.jdwp.agent` module

#### --exclude-local-repository

Exclude the local Maven repository when resolving dependencies

#### --exclude-remote-repositories

Exclude remote Maven repositories when resolving dependencies

Examples:

```bash:no-line-numbers
./zpmw install
```

### zpm wrap

The `zpm wrap` command generates an executable `zpmw` wrapper script that automatically downloads `zpm` if necessary before passing the arguments to `zpm`.

This approach avoids the need to manually install `zpm` and allows greater control over the version of `zpm` being used.

```bash:no-line-numbers
zpm wrap
```

#### --local-repository `<locaRepolDir>`

> Defaults to `${user.home}/.m2/repository`

Local Maven repository directory

#### --remote-repository `<repoURL>`

> Defaults to `https://maven.packages.aklivity.io`

Remote Maven repository URL

#### --version `<version>`

Require `zpm` wrapper to use `<version>`

Example:

```bash:no-line-numbers
./zpmw wrap --version 0.9.8
```

Generates an executable `zpmw` script in the same directory, which can be used in place of `zpm` to first ensure that `zpm` version `0.9.8` is automatically downloaded into the `.zpmw/` subdirectory if necessary.
