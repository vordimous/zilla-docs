---
redirectFrom: /reference/config/telemetry/exporters/exporter-syslog.html
shortTitle: syslog

icon: aky-zilla-plus
category:
  - Telemetry
  - Exporters
tag:
  - syslog
---

# syslog Exporter

[Available in <ZillaPlus/>](https://www.aklivity.io/products/zilla-plus)
{.zilla-plus-badge .hint-container .info}

Zilla runtime Syslog exporter

```yaml {3}
exporters:
  syslog:
    type: syslog
    options:
      host: syslog-server
      port: 514
      protocol: tcp
```

with vault:

```yaml {11}
vaults:
  my_syslog_trust:
    type: filesystem
    options:
      trust:
        store: truststore.p12
        type: pkcs12
        password: generated
exporters:
  syslog:
    type: syslog
    vault: my_syslog_trust
    options:
      host: syslog-server
      port: 6514
      protocol: tls
      trust:
        - syslog
```

## Configuration (\* required)

### vault

> `string`

Vault name. Only applicable if the protocol is `tls`.

### options*

> `object`

The `syslog` specific options.

```yaml {4}
options:
  host: syslog-server
  port: 514
  protocol: tcp
```

```yaml {4}
options:
  host: syslog-server
  port: 514
  protocol: udp
```

```yaml {4}
options:
  host: syslog-server
  port: 6514
  protocol: tls
  trust:
    - syslog
```

#### options.host*

> `string`

The hostname of the syslog server.

#### options.port*

> `integer`

The port of the syslog server.

#### options.protocol*

> `enum` [ `tcp`, `udp`, `tls` ] | Default: `tcp`

The protocol to use to communicate with the syslog server. Valid values are: `tcp`, `udp`, `tls`.

#### options.trust

> `array` of `string`

Keys in the vault referenced on the binding (e.g. a filesystem vault for a local pkcs12 keystore
or an AWS vault for remote pem format certificates stored in AWS secrets manager). Only valid if the protocol is `tls`.

#### options.trustcacerts

> `boolean`

Specifies if the CA certs should be trusted. Only valid if the protocol is `tls`.
