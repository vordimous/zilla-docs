---
shortTitle: asyncapi
description: Zilla runtime asyncapi binding
category:
  - Binding
tag:
  - Server
  - Proxy
  - Client
---

# asyncapi Binding

Zilla runtime `asyncapi` binding.

```yaml {2}
name: zilla-mqtt-kafka-broker
bindings:
  asyncapi_server:
    type: asyncapi
    kind: server
    options:
      specs:
        my-mqtt-api-spec: mqtt/asyncapi.yaml
    exit: asyncapi_proxy
  asyncapi_proxy:
    type: asyncapi
    kind: proxy
    options:
      specs:
        my-mqtt-api-spec:
          my-kafka-api-spec:
            catalog:
              my_catalog:
                subject: petstore
                version: latest
        my-kafka-api-spec:
          my-kafka-api-spec:
            catalog:
              my_catalog:
                subject: petstore
                version: latest
      mqtt-kafka:
        channels:
          sessions: mqttSessions
          retained: mqttRetained
          messages: mqttMessages
    routes:
      - when:
          - api-id: my-mqtt-api-spec
            operation-id: sendEvents
        exit: asyncapi_client
        with:
          api-id: my-kafka-api-spec
          operation-id: toSensorData
      - when:
          - api-id: my-mqtt-api-spec
            operation-id: receiveEvents
        exit: asyncapi_client
        with:
          api-id: my-kafka-api-spec
          operation-id: onSensorData
  asyncapi_client:
    type: asyncapi
    kind: client
    options:
      specs:
        my-kafka-api-spec:
          catalog:
            my_catalog:
              subject: petstore
              version: latest
      tcp:
        host: localhost
        port:
          - 9092
```

## Summary

Defines a binding with `asyncapi` spec, with `server` or `proxy` or `client` behavior.

The `server` kind `asyncapi` binding creates composite of `tcp`, `tls`, and `mqtt` or `http` bindings with server kind and adapts MQTT/HTTP streams to AsyncAPI streams.

The `proxy` kind `asyncapi` binding creates composite of `mqtt-kafka` binding with proxy kind mapping MQTT streams to Kafka streams.

The `client` kind `asyncapi` binding creates composite of `kafka` or `mqtt` or `http`, and `tls`, `tcp` bindings with client kind and adapts AsyncAPI streams to Kafka/MQTT/HTTP streams.

## Configuration

:::: note Properties

- [kind\*](#kind)
- [options](#options)
  - [options.specs](#options-specs)
    - [specs.catalog](#specs-catalog)
        - [catalog.subject](#catalog-subject)
        - [catalog.version](#catalog-version)
    - [specs.servers](#specs-servers)
      - [servers.name](#servers-name)
      - [servers.url](#servers-url)
      - [servers.host](#servers-host)
      - [servers.pathname](#servers-pathname)
  - [options.tcp](#options-tcp)
    - [tpc.host](#tpc-host)
    - [tcp.port](#tcp-port)
  - [options.http](#options-http)
    - [http.authorization](#http-authorization)
    - [authorization.credentials](#authorization-credentials)
    - [credentials.cookies](#credentials-cookies)
    - [credentials.headers](#credentials-headers)
    - [credentials.query](#credentials-query)
  - [options.tls](#options-tls)
    - [tls.version](#tls-version)
    - [tls.keys](#tls-keys)
    - [tls.trust](#tls-trust)
    - [tls.signers](#tls-signers)
    - [tls.trustcacerts](#tls-trustcacerts)
    - [tls.sni\*](#tls-sni)
    - [tls.alpn](#tls-alpn)
    - [tls.mutual](#tls-mutual)
- [mqtt-kafka](#mqtt-kafka)
  - [mqtt-kafka.channels](#mqtt-kafka-channels)
    - [channels.sessions](#channels-sessions)
    - [channels.retained](#channels-retained)
    - [channels.messages](#channels-messages)
- [routes\[\].when](#routes-when)
  - [when\[\].api-id](#when-api-id)
  - [when\[\].operation-id](#when-operation-id)
- [routes\[\].exit\*](#routes-exit)
- [routes\[\].with](#routes-with)
  - [with.api-id](#with-api-id)
  - [with.operation-id](#with-operation-id)
- [exit](#exit)

::: right
\* required
:::

::::

### kind\*

> `enum` [ "client", "proxy", "server" ]

Behave as a `asyncapi` `client` or `proxy` or `server`.

```yaml
kind: server
```

### options

> `object`

`asyncapi`-specific options.

```yaml
specs:
  http_api:
    servers:
      - name: plain
    catalog:
      catalog0:
        subject: petstore
        version: latest
```

#### options.specs

> `object` as map of named properties

`specs` specific options

#### specs.catalog

> `object` as map of named properties

catalog specific options.

#### catalog.subject

> `string`

Subject name used when storing the catalog artifact.

#### catalog.version

> `string`

Catalog artifact version to use.

#### specs.servers

> `object`

#### servers.name

> `string`

The server name.

#### servers.url

> `string`

The server url to match in asyncapi 2.x spec only

#### servers.host

> `string`

The server host to match in asyncapi 3.x spec only

#### servers.pathname

> `string`

The server pathname to match in asyncapi spec


#### options.tcp

> `object`

`client` specific `tcp` options.

##### tpc.host

> `string`

Hostname or IP address.

##### tcp.port

> `integer` | `string` | `array` of `integer` | `array` of `string`

Port number(s), including port number ranges.

#### options.http

> `object`

`http` specific options.

##### http.authorization

> `object` as map of named properties

Authorization by guard for the `HTTP/1.1` and `HTTP/2` protocols.

```yaml
authorization:
  jwt:
    credentials:
      headers:
        authorization: Bearer {credentials}
```

##### authorization.credentials

> `object`

Defines how to extract credentials from the HTTP request.

##### credentials.cookies

> `map` of `name: value` properties

Named cookie value pattern with `{credentials}`.

##### credentials.headers

> `map` of `name: value` properties

Named header value pattern with `{credentials}`, e.g. `"Bearer` `{credentials}"`.

##### credentials.query

> `map` of `name: value` properties

Named query parameter value pattern with `{credentials}`.

#### options.tls

> `object`

`tls` specific options.

##### tls.version

> `string`

Protocol version.

##### tls.keys

> `array` of `string`

A list of reference names for the Vault key.

##### tls.trust

> `array` of `string`

A list of reference names for the Vault certificate.

##### tls.signers

> `array` of `string`

A list of reference names for the Vault signer certificate.

##### tls.trustcacerts

> `boolean` | Default: `true` when trust is `null`

Trust CA certificates.

##### tls.sni\*

> `array` of `string`

A list of the Server Name Indications.

##### tls.alpn

> `array` of `string`

Application protocols.

##### tls.mutual

> `enum` [ "required", "requested", "none" ] | Default: `"none"`

Mutual authentication.

### mqtt-kafka

> `object`

`mqtt-kafka` binding specific options.

#### mqtt-kafka.channels

> `object`

AsyncAPI Kafka channels describing the necessary topics for the MQTT-Kafka mapping.

```yaml
mqtt-kafka:
  channels:
    sessions: mqttSessions
    retained: mqttRetained
    messages: mqttMessages
```

##### channels.sessions

> `string`

AsyncAPI Kafka sessions channel.

```yaml
sessions: mqttSessions
```

##### channels.retained

> `string`

AsyncAPI Kafka retained channel.

```yaml
retained: mqttRetained
```

##### channels.messages

> `string`

AsyncAPI Kafka messages channel.

```yaml
messages: mqttMessages
```

### routes[].when

> `array` of `object`

List of conditions to match this route when adapting `asyncapi` MQTT streams to `asyncapi` Kafka streams.
Read more: [When a route matches](../../../concepts/config-intro.md#when-a-route-matches)

#### when[].api-id

> `string`

AsyncAPI spec identifier that matches from `asyncapi` binding MQTT stream.

#### when[].operation-id

> `string`

AsyncAPI OperationId that can be mapped between AsyncAPI MQTT and AsyncAPI Kafka spec

### routes[].exit\*

> `string`

Default exit binding when no conditional routes are viable.

```yaml
routes:
  - when:
    ...
    exit: asyncapi_client
```

### routes[].with

> `object`

Defines the route with the AsyncAPI spec identifier and OperationId.

```yaml
with:
  api-id: my-asyncapi-spec
```

#### with.api-id

> `string`

AsyncAPI spec identifier that the route exits with to the next binding

#### with.operation-id

> `string`

AsyncAPI OperationId that the route exits with to the next binding

### exit

> `string`

Default exit binding.

```yaml
exit: echo_server
```

---

::: right
\* required
:::
