---
description: Encrypts secrets for secure storage
---

# zpm encrypt

## Description

The `zpm encrypt` command provides a convenient mechanism to encrypt secrets using a securely generated master secret.

When Maven repositories requiring authorization are listed in [Zilla Manager Configuration](../zpm.json.md), then the output of this command can be used to provide encrypted credentials in [Zilla Manager Settings](../settings.json.md).

If a master secret does not already exist, it is generated in [Zilla Manager Security](../security.json.md).

## Usage

```bash:no-line-numbers
zpm encrypt
```

## Examples

```bash:no-line-numbers
./zpmw encrypt
```

Enter a password to `zpmw encrypt` via standard input, then the base64-encoded encrypted password is displayed via standard output.
