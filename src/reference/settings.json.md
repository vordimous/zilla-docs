---
description: Stores the remote repository credentials in ${user.home}/.zpm/settings.json
---

# Zilla Manager Settings

## Configuration

#### Properties

| Name          | Type                                                     | Description                    |
| ------------- | -------------------------------------------------------- | ------------------------------ |
| `credentials` | `array` of [`credentials`](#credentials) | List of repository credentials |

### credentials

#### Properties

| Name       | Type     | Description                                         |
| ---------- | -------- | --------------------------------------------------- |
| `host`     | `string` | Repository hostname                                 |
| `username` | `string` | Repository credentials username                     |
| `password` | `string` | Repository credentials password (encrypted, base64) |
