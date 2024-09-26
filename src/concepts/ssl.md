# Server Encryption, TLS & SSL

Vaults can be used by specific protocol bindings, such as [tls](../reference/config/bindings/tls/README.md), to negotiate shared encryption keys. It is easy to add the necessary routing logic and encryption keys.

Using a [filesystem](../reference/config/vaults/filesystem.md) vault, you can see how a pkcs12 certificate on the host is configured to be stored securely by the Zilla runtime. This keystore can then be used by the [tls](../reference/config/bindings/tls/README.md) binding to decrypt incoming traffic.

```yaml{6}
vaults:
  my_servers:
    type: filesystem
    options:
      keys:
        store: my_servers.p12
        type: pkcs12
        password: ${{env.KEYSTORE_PASSWORD}}
```

The [tcp](../reference/config/bindings/tcp/) binding can be configured for both encrypted and unencrypted traffic on separate ports. Take the SSL example with ports `80` and `443`. The [tls](../reference/config/bindings/tls/) binding will use the `keys` as the certificate aliases and the Server Name Indication (`sni`/) as the SSL server names. These will likely be the same. Since this example is over [http](../reference/config/bindings/http/) the Application-Layer Protocol Negotiation (ALPN/) will need to handle both HTTP/1.1 and HTTP/2, but the [tls](../reference/config/bindings/tls/README.md) binding can be configured for any of the [alpn](../reference/config/bindings/tls/server.md#options-alpn) protocols supported by Zilla.

```yaml{20,29}
bindings:
  tcp_server:
    type: tcp
    kind: server
    options:
      host: 0.0.0.0
      port:
        - 80
        - 443
    routes:
        - when:
            - port: 80
          exit: http_server
        - when:
            - port: 443
          exit: tls_server
  tls_server:
    type: tls
    kind: server
    vault: my_servers
    options:
      keys:
        - my_server.com
      sni:
        - my_server.com
      alpn:
        - http/1.1
        - h2
    exit: http_server
```
