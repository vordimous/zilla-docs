---
description: Configures dependencies to be resolved when packaging the Zilla runtime
---

# Zilla Manager Configuration

## Configuration

### repositories

> `array` of `string`

Pattern: `scheme://host:port/path` (URL)

List of repository URLs

### imports

> `array` of `string`

Pattern: `groupId:artifactId:version`

List of Maven BOMs to import managed dependency versions

### dependencies

> `array` of `string`

Pattern: `groupId:artifactId[:version]`

List of Maven dependencies

## Settings

### credentials

> `array` of `object`

List of repository credentials

#### routes[].host

> `string`

Repository hostname

#### routes[].username

> `string`

Repository credentials username

#### routes[].password

> `string`

Repository credentials password (encrypted, base64)

## Security

### secret

> `string`

Master secret (encrypted, base64)
