---
description: The Zilla HTTP Kafka Proxy lets you configure application-centric REST APIs and SSE streams that unlock Kafka event-driven architectures.
prev: false
next: /tutorials/rest/rest-intro.md
---

# HTTP Kafka Proxy

The Zilla HTTP Kafka Proxy lets you configure application-centric REST APIs and SSE streams that unlock Kafka event-driven architectures.

A developer has the freedom to define their own HTTP mapping to Kafka, with control over the topics, message key, message headers, and payload. Any HTTP client can interact with Kafka without navigating Kafka-specific paradigms.

## Configure Endpoints

Zilla can map REST APIs to Kafka using the [http-kafka](../../reference/config/bindings/binding-http-kafka.md) binding in a [zilla.yaml](../../reference/config/overview.md) config. Zilla routes REST urls using [wildcard pattern matching](../../concepts/config-intro.md#pattern-matching) and [dynamic path params](../../concepts/config-intro.md#dynamic-path-parameters). Dynamic path matching and custom message routing from endpoints to Kafka topics help prevent API lock-in.

### HTTP request methods

Zilla separates the HTTP request methods into two groups called capabilities: produce and fetch. The [produce](../../concepts/config-intro.md#the-fetch-capability) capability handles method types `POST`, `PUT`, `DELETE`, and `PATCH` that produce messages onto Kafka topics. The [fetch](../../reference/config/bindings/binding-http-kafka.md#with-capability-fetch) capability handles the `GET` method that fetches messages from Kafka topics. One exception is for a route managing async correlation. The `produce` route will have two when clauses: a `PUT` clause for submission and a `GET` clause matching the `async.location` path returned to the caller.

## Correlated Request-Response

Zilla manages the HTTP lifecycle with the request and response payloads over a pair of Kafka topics. Each request message is correlated to the corresponding response message with a `zilla:correlation-id` header, providing an identifier for both Zilla and Kafka workflows to act on.

### sync

A synchronous interaction starts when a client calls an HTTP endpoint, producing a request message. The server will not respond immediately, waiting for the correlated response message. Once a message with the correct `zilla:correlation-id` header is delivered on the response topic it is fetched, responding to the initial request and returning the payload to the caller.

### async

An asynchronous interaction includes a `prefer: respond-async` header when calling an HTTP endpoint. After producing a request message, the connection will immediately return with `202 Accepted` plus the location path to retrieve a correlated response. The client then sends a `GET` request to the returned location path with the `prefer: wait=N` header to retrieve the correlated response. The request will wait for up to `N` seconds and return once a message with the correct `zilla:correlation-id` header is delivered on the response topic, removing the need for client polling.

## SSE Streaming

The Zilla Server-sent Events (SSE) Kafka Proxy exposes an SSE stream of Kafka messages using the [sse-kafka](../../reference/config/bindings/binding-sse-kafka.md) binding.

An [SSE](https://html.spec.whatwg.org/multipage/server-sent-events.html) server allows a web browser using the `EventSource` interface to send a request to an SSE endpoint and receive a stream of text from the server, interpreted as individual messages. Zilla relays text messages on a Kafka topic into the event stream.

### Message Filtering

The message source topic is defined in a route, and the route is matched by the path defined for the client to connect. A route can [filter](../../reference/config/bindings/binding-sse-kafka.md#routes-with) the messages delivered to the SSE stream using the message key and headers. A filter's value can be statically defined in the config or be pulled from a [path param](../../concepts/config-intro.md#dynamic-path-parameters).

### Reliable Delivery

Zilla sends an event `id` with every message. A client can send a `last-event-id` header to recover from an interrupted stream without message loss. The client doesn't need to acknowledge message receipt explicitly. An interrupted SSE stream can be recovered by connecting to any Zilla instance in the same auto-scaling group because each Zilla instance is stateless.

## Oneway

Clients can produce fire and forget HTTP request payload to a Kafka topic. The Kafka message key and headers are set using [path params](../../concepts/config-intro.md#dynamic-path-parameters).

## Idempotency

Requests can be idempotent (to make multiple identical requests and receive the same response every time) by including an `idempotency-key` header. Zilla will use the `idempotency-key` and `zilla:correlation-id` headers to identify and return the same message fetched from the response topic without producing a second message to the request topic. Each new `idempotency-key` used will produce a message with "at least once" delivery. A second message will be produced if the same request is made in the short window before a correlated response is added to the response topic. A Kafka consumer can detect and ignore any potential duplicate requests because they will have the same `idempotency-key` and `zilla:correlation-id`.

## Caching

Bindings can retrieve messages from a Kafka topic, filtered by message key and headers, with the key and header values extracted from the [path params](../../concepts/config-intro.md#dynamic-path-parameters).

An HTTP response returns with an [ETag](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag) header. This fetch supports a conditional [if-none-match](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-None-Match) request, returning `304` if not modified or `200` if modified (with a new ETag header). A client can wait for a modified response by including `prefer:wait=N` and `cache-control: no-cache` headers. The request will wait for up to `N` seconds and return once a message with a new ETag header is delivered on the response topic.

## CORS

Zilla supports Cross-Origin Resource Sharing (CORS) and allows you to specify fine-grained access control, including specific request origins, methods and headers allowed, and specific response headers exposed. Since it acts more like a guard and has no dependency on Apache Kafka configuration, you need to define it in the [http](../../reference/config/bindings/binding-http.md) binding.

## Authorization

Zilla has a modular config that includes the concept of a [Guard](../../reference/config/overview.md#guards) where you define your `guard` configuration and reference that `guard` to authorize a specific endpoint. JSON Web Token (JWT) authorization is supported with the [`jwt`](../../reference/config/guards/guard-jwt.md) Guard.

### SSE Continuous Authorization

Unlike REST, which authorizes individual requests, Zilla continuously authorizes the long-lived SSE connection stream. Zilla will send a "challenge" event, triggering the client to send up-to-date authorization credentials, such as a JWT token, before expiration. Zilla adheres to the secure by default method, meaning that the response stream is terminated if the authorization expires before the client responds to the "challenge" event.

Multiple SSE streams on the same HTTP/2 connection and authorized by the same JWT token are reauthorized by a single "challenge" event response from the client. They are all terminated if the token expiration isn't updated.
