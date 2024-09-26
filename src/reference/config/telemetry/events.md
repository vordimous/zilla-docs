---
shortTitle: Events
category:
  - Telemetry
tag:
  - Events
---

# Telemetry Events

Named events from Zilla that can be exported and logged.

:::: note Event Names

- [BINDING\_HTTP\_REQUEST\_ACCEPTED](#binding-http-request-accepted)
- [BINDING\_KAFKA\_API\_VERSION\_REJECTED](#binding-kafka-api-version-rejected)
- [BINDING\_KAFKA\_AUTHORIZATION\_FAILED](#binding-kafka-authorization-failed)
- [BINDING\_KAFKA\_CLUSTER\_AUTHORIZATION\_FAILED](#binding-kafka-cluster-authorization-failed)
- [BINDING\_MQTT\_CLIENT\_CONNECTED](#binding-mqtt-client-connected)
- [BINDING\_MQTT\_KAFKA\_NON\_COMPACT\_SESSIONS\_TOPIC](#binding-mqtt-kafka-non-compact-sessions-topic)
- [BINDING\_TCP\_DNS\_FAILED](#binding-tcp-dns-failed)
- [BINDING\_TLS\_HANDSHAKE\_FAILED](#binding-tls-handshake-failed)
- [BINDING\_TLS\_KEY\_REJECTED](#binding-tls-key-rejected)
- [BINDING\_TLS\_PEER\_NOT\_VERIFIED](#binding-tls-peer-not-verified)
- [BINDING\_TLS\_PROTOCOL\_REJECTED](#binding-tls-protocol-rejected)
- [BINDING\_TLS\_TLS\_KEY\_VERIFICATION\_FAILED](#binding-tls-tls-key-verification-failed)
- [BINDING\_TLS\_TLS\_FAILED](#binding-tls-tls-failed)
- [CATALOG\_APICURIO\_REGISTRY\_RETRIEVED\_ARTIFACT\_ID](#catalog-apicurio-registry-retrieved-artifact-id)
- [CATALOG\_APICURIO\_REGISTRY\_RETRIEVED\_ARTIFACT\_SUBJECT\_VERSION](#catalog-apicurio-registry-retrieved-artifact-subject-version)
- [CATALOG\_APICURIO\_REGISTRY\_UNRETRIEVABLE\_ARTIFACT\_ID](#catalog-apicurio-registry-unretrievable-artifact-id)
- [CATALOG\_APICURIO\_REGISTRY\_UNRETRIEVABLE\_ARTIFACT\_SUBJECT\_VERSION\_STALE\_ARTIFACT](#catalog-apicurio-registry-unretrievable-artifact-subject-version-stale-artifact)
- [CATALOG\_APICURIO\_REGISTRY\_UNRETRIEVABLE\_ARTIFACT\_SUBJECT\_VERSION](#catalog-apicurio-registry-unretrievable-artifact-subject-version)
- [CATALOG\_CONFLUENT\_SCHEMA\_REGISTRY\_RETRIEVED\_SCHEMA\_ID](#catalog-confluent-schema-registry-retrieved-schema-id)
- [CATALOG\_CONFLUENT\_SCHEMA\_REGISTRY\_RETRIEVED\_SCHEMA\_SUBJECT\_VERSION](#catalog-confluent-schema-registry-retrieved-schema-subject-version)
- [CATALOG\_CONFLUENT\_SCHEMA\_REGISTRY\_UNRETRIEVABLE\_SCHEMA\_ID](#catalog-confluent-schema-registry-unretrievable-schema-id)
- [CATALOG\_CONFLUENT\_SCHEMA\_REGISTRY\_UNRETRIEVABLE\_SCHEMA\_SUBJECT\_VERSION\_STALE\_SCHEMA](#catalog-confluent-schema-registry-unretrievable-schema-subject-version-stale-schema)
- [CATALOG\_CONFLUENT\_SCHEMA\_REGISTRY\_UNRETRIEVABLE\_SCHEMA\_SUBJECT\_VERSION](#catalog-confluent-schema-registry-unretrievable-schema-subject-version)
- [CATALOG\_FILESYSTEM\_FILE\_NOT\_FOUND](#catalog-filesystem-file-not-found)
- [CATALOG\_KARAPACE\_SCHEMA\_REGISTRY\_RETRIEVED\_SCHEMA\_ID](#catalog-karapace-schema-registry-retrieved-schema-id)
- [CATALOG\_KARAPACE\_SCHEMA\_REGISTRY\_RETRIEVED\_SCHEMA\_SUBJECT\_VERSION](#catalog-karapace-schema-registry-retrieved-schema-subject-version)
- [CATALOG\_KARAPACE\_SCHEMA\_REGISTRY\_UNRETRIEVABLE\_SCHEMA\_ID](#catalog-karapace-schema-registry-unretrievable-schema-id)
- [CATALOG\_KARAPACE\_SCHEMA\_REGISTRY\_UNRETRIEVABLE\_SCHEMA\_SUBJECT\_VERSION\_STALE\_SCHEMA](#catalog-karapace-schema-registry-unretrievable-schema-subject-version-stale-schema)
- [CATALOG\_KARAPACE\_SCHEMA\_REGISTRY\_UNRETRIEVABLE\_SCHEMA\_SUBJECT\_VERSION](#catalog-karapace-schema-registry-unretrievable-schema-subject-version)
- [CATALOG\_SCHEMA\_REGISTRY\_RETRIEVED\_SCHEMA\_ID](#catalog-schema-registry-retrieved-schema-id)
- [CATALOG\_SCHEMA\_REGISTRY\_RETRIEVED\_SCHEMA\_SUBJECT\_VERSION](#catalog-schema-registry-retrieved-schema-subject-version)
- [CATALOG\_SCHEMA\_REGISTRY\_UNRETRIEVABLE\_SCHEMA\_ID](#catalog-schema-registry-unretrievable-schema-id)
- [CATALOG\_SCHEMA\_REGISTRY\_UNRETRIEVABLE\_SCHEMA\_SUBJECT\_VERSION\_STALE\_SCHEMA](#catalog-schema-registry-unretrievable-schema-subject-version-stale-schema)
- [CATALOG\_SCHEMA\_REGISTRY\_UNRETRIEVABLE\_SCHEMA\_SUBJECT\_VERSION](#catalog-schema-registry-unretrievable-schema-subject-version)
- [GUARD\_JWT\_AUTHORIZATION\_FAILED](#guard-jwt-authorization-failed)
- [MODEL\_AVRO\_VALIDATION\_FAILED](#model-avro-validation-failed)
- [MODEL\_CORE\_VALIDATION\_FAILED](#model-core-validation-failed)
- [MODEL\_JSON\_VALIDATION\_FAILED](#model-json-validation-failed)
- [MODEL\_PROTOBUF\_VALIDATION\_FAILED](#model-protobuf-validation-failed)

::::

## Logged Events

### BINDING_HTTP_REQUEST_ACCEPTED

The server received a valid HTTP request.

### BINDING_KAFKA_API_VERSION_REJECTED

A Kafka protocol API version mismatch occurred in the kafka binding.

### BINDING_KAFKA_AUTHORIZATION_FAILED

An authorization failure happened in the http, mqtt or the kafka binding.

### BINDING_KAFKA_CLUSTER_AUTHORIZATION_FAILED

A Kafka protocol API cluster authorization failed.

### BINDING_MQTT_CLIENT_CONNECTED

An MQTT session was successfully authorized and connected.

### BINDING_MQTT_KAFKA_NON_COMPACT_SESSIONS_TOPIC

The sessions topic declared in the [mqtt-kafka](../bindings/mqtt-kafka/README.md) is required to be log compacted.

### BINDING_TCP_DNS_FAILED

A DNS resolution failure.

### BINDING_TLS_HANDSHAKE_FAILED

A client could not negotiate the desired level of security with the server.

### BINDING_TLS_KEY_REJECTED

A client or server has a misconfiguration of the server or client SSL certificate and private key.

### BINDING_TLS_PEER_NOT_VERIFIED

A peer's identity could not be verified.

### BINDING_TLS_PROTOCOL_REJECTED

An error in the operation of the SSL protocol.

### BINDING_TLS_TLS_KEY_VERIFICATION_FAILED

A TLS key verification failed because the key is missing or invalid.

### BINDING_TLS_TLS_FAILED

A generic error detected by an SSL subsystem.

### CATALOG_APICURIO_REGISTRY_RETRIEVED_ARTIFACT_ID

Fetching the Apicurio artifact was successful.

### CATALOG_APICURIO_REGISTRY_RETRIEVED_ARTIFACT_SUBJECT_VERSION

Fetching the Apicurio artifact by version was successful.

### CATALOG_APICURIO_REGISTRY_UNRETRIEVABLE_ARTIFACT_ID

Fetching the Apicurio artifact was unsuccessful.

### CATALOG_APICURIO_REGISTRY_UNRETRIEVABLE_ARTIFACT_SUBJECT_VERSION_STALE_ARTIFACT

Fetching the Apicurio artifact by version was unsuccessful, but an previously fetched artifact is still being used.

### CATALOG_APICURIO_REGISTRY_UNRETRIEVABLE_ARTIFACT_SUBJECT_VERSION

Fetching the Apicurio artifact by version was unsuccessful.

### CATALOG_CONFLUENT_SCHEMA_REGISTRY_RETRIEVED_SCHEMA_ID

Fetching the registry schema was successful.

### CATALOG_CONFLUENT_SCHEMA_REGISTRY_RETRIEVED_SCHEMA_SUBJECT_VERSION

Fetching the registry schema by version was successful.

### CATALOG_CONFLUENT_SCHEMA_REGISTRY_UNRETRIEVABLE_SCHEMA_ID

Fetching the registry schema was unsuccessful.

### CATALOG_CONFLUENT_SCHEMA_REGISTRY_UNRETRIEVABLE_SCHEMA_SUBJECT_VERSION_STALE_SCHEMA

Fetching the registry schema by version was unsuccessful, but an previously fetched schema is still being used.

### CATALOG_CONFLUENT_SCHEMA_REGISTRY_UNRETRIEVABLE_SCHEMA_SUBJECT_VERSION

Fetching the registry schema by version was unsuccessful.

### CATALOG_FILESYSTEM_FILE_NOT_FOUND

No file was found at the specified location.

### CATALOG_KARAPACE_SCHEMA_REGISTRY_RETRIEVED_SCHEMA_ID

Fetching the Karapace schema was successful.

### CATALOG_KARAPACE_SCHEMA_REGISTRY_RETRIEVED_SCHEMA_SUBJECT_VERSION

Fetching the Karapace schema by version was successful.

### CATALOG_KARAPACE_SCHEMA_REGISTRY_UNRETRIEVABLE_SCHEMA_ID

Fetching the Karapace schema was unsuccessful.

### CATALOG_KARAPACE_SCHEMA_REGISTRY_UNRETRIEVABLE_SCHEMA_SUBJECT_VERSION_STALE_SCHEMA

Fetching the Karapace schema by version was unsuccessful, but an previously fetched schema is still being used.

### CATALOG_KARAPACE_SCHEMA_REGISTRY_UNRETRIEVABLE_SCHEMA_SUBJECT_VERSION

Fetching the Karapace schema by version was unsuccessful.

### CATALOG_SCHEMA_REGISTRY_RETRIEVED_SCHEMA_ID

Fetching the registry schema was successful.

### CATALOG_SCHEMA_REGISTRY_RETRIEVED_SCHEMA_SUBJECT_VERSION

Fetching the registry schema by version was successful.

### CATALOG_SCHEMA_REGISTRY_UNRETRIEVABLE_SCHEMA_ID

Fetching the registry schema was unsuccessful.

### CATALOG_SCHEMA_REGISTRY_UNRETRIEVABLE_SCHEMA_SUBJECT_VERSION_STALE_SCHEMA

Fetching the registry schema by version was unsuccessful, but an previously fetched schema is still being used.

### CATALOG_SCHEMA_REGISTRY_UNRETRIEVABLE_SCHEMA_SUBJECT_VERSION

Fetching the registry schema by version was unsuccessful.

### GUARD_JWT_AUTHORIZATION_FAILED

A client failed authorization for a JWT Guarded route.

### MODEL_AVRO_VALIDATION_FAILED

A payload did not have the required model schema.

### MODEL_CORE_VALIDATION_FAILED

A payload did not have the required model schema.

### MODEL_JSON_VALIDATION_FAILED

A payload did not have the required model schema.

### MODEL_PROTOBUF_VALIDATION_FAILED

A payload did not have the required model schema.
