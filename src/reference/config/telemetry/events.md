---
shortTitle: Events
description: Zilla runtime telemetry events
category:
  - Telemetry
tag:
  - Events
---

# Telemetry Events

Named events from Zilla that can be exported and logged.

:::: note Event Names

- [BINDING\_HTTP\_REQUEST\_ACCEPTED](#binding-http-request-accepted)
- [BINDING\_KAFKA\_AUTHORIZATION\_FAILED](#binding-kafka-authorization-failed)
- [BINDING\_KAFKA\_API\_VERSION\_REJECTED](#binding-kafka-api-version-rejected)
- [BINDING\_TCP\_DNS\_FAILED](#binding-tcp-dns-failed)
- [BINDING\_TLS\_TLS\_FAILED](#binding-tls-tls-failed)
- [BINDING\_TLS\_PROTOCOL\_REJECTED](#binding-tls-protocol-rejected)
- [BINDING\_TLS\_KEY\_REJECTED](#binding-tls-key-rejected)
- [BINDING\_TLS\_PEER\_NOT\_VERIFIED](#binding-tls-peer-not-verified)
- [BINDING\_TLS\_HANDSHAKE\_FAILED](#binding-tls-handshake-failed)
- [CATALOG\_FILESYSTEM\_FILE\_NOT\_FOUND](#catalog-filesystem-file-not-found)
- [CATALOG\_APICURIO\_REMOTE\_ACCESS\_REJECTED](#catalog-apicurio-remote-access-rejected)
- [CATALOG\_KARAPACE\_REMOTE\_ACCESS\_REJECTED](#catalog-karapace-remote-access-rejected)
- [GUARD\_JWT\_AUTHORIZATION\_FAILED](#guard-jwt-authorization-failed)
- [MODEL\_AVRO\_VALIDATION\_FAILED](#model-avro-validation-failed)
- [MODEL\_CORE\_VALIDATION\_FAILED](#model-core-validation-failed)
- [MODEL\_JSON\_VALIDATION\_FAILED](#model-json-validation-failed)
- [MODEL\_PROTOBUF\_VALIDATION\_FAILED](#model-protobuf-validation-failed)

::::

## Logged Events

### BINDING_HTTP_REQUEST_ACCEPTED

> :identity :scheme :method :authority :path

A successful HTTP request.

### BINDING_KAFKA_AUTHORIZATION_FAILED

> :identity

An authorization failure happened in the http, mqtt or the kafka binding.

### BINDING_KAFKA_API_VERSION_REJECTED

> :apiKey :apiVersion

An API version mismatch occurred in the kafka binding.

### BINDING_TCP_DNS_FAILED

> :address

A DNS resolution failure.

### BINDING_TLS_TLS_FAILED

A general `SSLException` occurred.

### BINDING_TLS_PROTOCOL_REJECTED

A `SSLProtocolException` occurred.

### BINDING_TLS_KEY_REJECTED

A `SSLKeyException` occurred.

### BINDING_TLS_PEER_NOT_VERIFIED

A `SSLPeerUnverifiedException` occurred.

### BINDING_TLS_HANDSHAKE_FAILED

A `SSLHandshakeException` occurred.

### CATALOG_FILESYSTEM_FILE_NOT_FOUND

> :location

No file was found at the specified location.

### CATALOG_APICURIO_REMOTE_ACCESS_REJECTED

> :method :url :statusCode

Zilla did not receive a `200` HTTP status code from the Apicurio schema registry catalog. If the status code is `0` the request could not be completed.

### CATALOG_KARAPACE_REMOTE_ACCESS_REJECTED

> :method :url :statusCode

Zilla did not receive a `200` HTTP status code from the Apicurio schema registry catalog. If the status code is `0` the request could not be completed.

### GUARD_JWT_AUTHORIZATION_FAILED

> :identity

A client failed authorization for a JWT Guarded route.

### MODEL_AVRO_VALIDATION_FAILED

> :error

A payload did not have the required model schema.

### MODEL_CORE_VALIDATION_FAILED

> :error

A payload did not have the required model schema.

### MODEL_JSON_VALIDATION_FAILED

> :error

A payload did not have the required model schema.

### MODEL_PROTOBUF_VALIDATION_FAILED

> :error

A payload did not have the required model schema.
