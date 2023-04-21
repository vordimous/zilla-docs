# Secure the Todo Application

In this getting started exercise, you will enhance the [previously built Todo application](build.md) to secure the Tasks API using JWT access tokens.

![](/assets/todo-app-architecture@2x.png)

Zilla has the concept of a [guard](../../reference/zilla.yaml/guard.md) that can be defined to control access to any route in the bindings configuration.

In this guide, you will use the [JWT guard](../../reference/zilla.yaml/guard-jwt.md) to enforce authorization of the `read:tasks` and `write:tasks` roles when calling the Tasks API.

### Prerequisites

* Docker `20.10.14`
* Git `2.32.0`
* npm `8.3.1`  and above
* jq `1.6` and above
* completed [Build the Todo Application](build.md) with Docker stack still running

### Step 1: Zilla

In [Build a Todo Application](build.md#step-3-zilla), you defined a Tasks API to send commands to the `Todo` service via Kafka and retrieve a continuously updated stream of tasks from Kafka as needed by the Tasks UX.

![](./post-tasks.png)

::: details

Creates a new Todo Task.

Requires `content-type` `application/json` and request body matching `CreateTask` command domain model.

Include `idempotency-key` of type `uuid` to support idempotent `CreateTask`.

**Responses:**

**201: Created** - Task created successfully

:::

![](./put-tasks.png)

::: details

**Rename Task**

Renames a Todo Task.

Requires `content-type` `application/json` and request body matching `RenameTask` command domain model.

Include `idempotency-key` of type `uuid` to support idempotent `RenameTask`.

Include `if-match` with current `etag` to provide optimistic locking.

**Parameters**

**Path:**

id\[String] - Task identifier

**Header:**

if-match\[String] - Task etag

**Responses:**

* **204 No Content** - Task renamed successfully
* **412 Precondition Failed** - Task rename failed, etag does not match

:::

![](./delete-tasks.png)

::: details

**Delete Task**

Requires `content-type` `application/json` and request body matching `DeleteTask` command domain model.

Include `idempotency-key` of type `uuid` to support idempotent `DeleteTask`.

Include `if-match` with current `etag` to provide optimistic locking.

**Parameters**

**Path:**

id\[String] - Task identifier

**Header:**

if-match\[String] - Task etag

**Responses:**

* **204 No Content** - **** Task deleted successfully
* **412 Precondition Failed** - **** Task delete failed, etag does not match

:::

![](./get-tasks.png)

::: details

**Get Tasks**

Retrieves all tasks, with `etag` representing the **** latest value.

**Parameters**

**Header:**

if-none-match\[String] - Tasks collection etag

**Responses:**

* **200 OK** - Returns an array of Tasks
* **304 Not Modified** - **** If Tasks collection etag matches

:::

Now we secure the Tasks API by requiring the caller to have `read:tasks` role for the `GET` request, and `write:tasks` role for the `POST`, `PUT` and `DELETE` requests.

#### Configure Zilla

The Zilla engine configuration defines a flow of named `bindings` representing each step in the pipeline as inbound network traffic is decoded and transformed then encoded into outbound network traffic as needed.

In [Build the Todo Application, Step 3: Zilla](build.md#step-3-zilla), you created `zilla.yaml` that defined the Tasks API without security.

When routing at each binding, Zilla can guard a route to require that specific roles have been granted to the caller. If the caller does not have the required roles, then the route is ignored. If no routes are viable, then the HTTP request fails with `404 Not Found`.

Zilla trusts JWT tokens based on the token `issuer`, `audience` and public `key` of the token provider.

In this example, tokens are issued by [`Auth0`](https://auth0.com/) at `https://aklivity.us.auth0.com/` and the intended token usage, or audience, is this local Todo app Tasks API at `http://localhost:8080/tasks`.

Using [Zilla Studio](https://zilla-studio.aklivity.io/), select the `Secure the Todo App` template from the `Load Template` dropdown and then press `Generate Config` to download the corresponding `zilla.yaml` configuration file.

![Zilla Studio](/assets/zilla-studio@2x.png)

Alternatively, copy the contents of `zilla.yaml` shown below to your local `zilla.yaml` file.

<details>

<summary>zilla.yaml</summary>

```yaml
---
name: Example
vaults: {}
bindings:
  tcp_serverab9279f6-00aa-40a9-b10a-268c5ebfd800:
    type: tcp
    kind: server
    options:
      host: 0.0.0.0
      port: 8080
    exit: http_serverab9279f6-00aa-40a9-b10a-268c5ebfd800
  http_serverab9279f6-00aa-40a9-b10a-268c5ebfd800:
    type: http
    kind: server
    options:
      access-control:
        policy: cross-origin
      authorization:
        jwt8b87272a-d681-4414-8697-a0ad1b2d5529:
          credentials:
            headers:
              authorization: Bearer {credentials}
            query:
              access_token: "{credentials}"
    routes:
      - when:
          - headers:
              :method: GET
              :path: /tasks
        exit: sse_serverab9279f6-00aa-40a9-b10a-268c5ebfd800
      - when:
          - headers:
              :method: POST
              :path: /tasks
          - headers:
              :method: PUT
              :path: /tasks/*
          - headers:
              :method: DELETE
              :path: /tasks/*
        exit: http-kafka_proxyab9279f6-00aa-40a9-b10a-268c5ebfd800
  sse_serverab9279f6-00aa-40a9-b10a-268c5ebfd800:
    type: sse
    kind: server
    exit: sse-kafka_proxyab9279f6-00aa-40a9-b10a-268c5ebfd800
  sse-kafka_proxyab9279f6-00aa-40a9-b10a-268c5ebfd800:
    type: sse-kafka
    kind: proxy
    routes:
      - when:
          - path: /tasks
        exit: kafka_cache_clientda6b9d8f-0846-4b2b-8ed6-b8db5605e50c
        with:
          event:
            id: '["${base64(key)}","${etag}"]'
          topic: task-snapshots
        guarded:
          jwt8b87272a-d681-4414-8697-a0ad1b2d5529:
            - read:tasks
  http-kafka_proxyab9279f6-00aa-40a9-b10a-268c5ebfd800:
    type: http-kafka
    kind: proxy
    routes:
      - when:
          - method: POST
            path: /tasks
        exit: kafka_cache_clientda6b9d8f-0846-4b2b-8ed6-b8db5605e50c
        with:
          capability: produce
          reply-to: task-replies
          topic: task-commands
          key: ${idempotencyKey}
          overrides:
            zilla:domain-model: CreateTaskCommand
        guarded:
          jwt8b87272a-d681-4414-8697-a0ad1b2d5529:
            - write:tasks
      - when:
          - method: PUT
            path: /tasks/{id}
        exit: kafka_cache_clientda6b9d8f-0846-4b2b-8ed6-b8db5605e50c
        with:
          capability: produce
          reply-to: task-replies
          topic: task-commands
          key: ${params.id}
          overrides:
            zilla:domain-model: RenameTaskCommand
        guarded:
          jwt8b87272a-d681-4414-8697-a0ad1b2d5529:
            - write:tasks
      - when:
          - method: DELETE
            path: /tasks/{id}
        exit: kafka_cache_clientda6b9d8f-0846-4b2b-8ed6-b8db5605e50c
        with:
          capability: produce
          reply-to: task-replies
          topic: task-commands
          key: ${params.id}
          overrides:
            zilla:domain-model: DeleteTaskCommand
        guarded:
          jwt8b87272a-d681-4414-8697-a0ad1b2d5529:
            - write:tasks
  kafka_cache_clientda6b9d8f-0846-4b2b-8ed6-b8db5605e50c:
    type: kafka
    kind: cache_client
    exit: kafka_cache_serverda6b9d8f-0846-4b2b-8ed6-b8db5605e50c
  kafka_cache_serverda6b9d8f-0846-4b2b-8ed6-b8db5605e50c:
    type: kafka
    kind: cache_server
    options:
      bootstrap:
        - task-replies
        - task-snapshots
    exit: kafka_clientda6b9d8f-0846-4b2b-8ed6-b8db5605e50c
  kafka_clientda6b9d8f-0846-4b2b-8ed6-b8db5605e50c:
    type: kafka
    kind: client
    exit: tcp_clientda6b9d8f-0846-4b2b-8ed6-b8db5605e50c
  tcp_clientda6b9d8f-0846-4b2b-8ed6-b8db5605e50c:
    type: tcp
    kind: client
    options:
      host: kafka.internal.net
      port: 29092
    routes:
      - when:
          - cidr: 0.0.0.0/0
guards:
  jwt8b87272a-d681-4414-8697-a0ad1b2d5529:
    type: jwt
    options:
      issuer: https://aklivity.us.auth0.com/
      audience: http://localhost:8080/tasks
      keys:
        - alg: RS256
          kty: RSA
          use: sig
          n: xpUpx4ytuhi0Tz4_l7qqigo_CleAGBs7zalBLHR68tRz3EM2rf6JZapeT7vA6FcdGJskcqNSEYZJsbX0RWsqH_2WwXKOV8HOJJ_XrUmWy1Eeeco8nqM7NoImvubQ_3pxwGq2RaW4Ll3jZ90tWEWoGlk9qo_oJc2WKfnHSjpzuQxX0v5xKxJ3qJN9-SzJ-hit89Uj67o9aC5qOYbZTNgYDOyuawhAN3MlVF_twj7iqogpJprQEeLZTMpsmQbx0DvAju4Za_edJXAkVQeAeQq04SgLU0cagEmk7raNAuk19mWjPAPDq8OldVoecxtsqCGF_I17xdWozI98tJPDS00YWw
          e: AQAB
          kid: x9YmmTzyWUxAj6683CkM-
          x5t: xKsfyirPoDUfrpgvjnKI5wmYzBg
          x5c:
            - MIIDBTCCAe2gAwIBAgIJfcoikPv8CQX+MA0GCSqGSIb3DQEBCwUAMCAxHjAcBgNVBAMTFWFrbGl2aXR5LnVzLmF1dGgwLmNvbTAeFw0yMjA1MzEyMTI5MzZaFw0zNjAyMDcyMTI5MzZaMCAxHjAcBgNVBAMTFWFrbGl2aXR5LnVzLmF1dGgwLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMaVKceMrboYtE8+P5e6qooKPwpXgBgbO82pQSx0evLUc9xDNq3+iWWqXk+7wOhXHRibJHKjUhGGSbG19EVrKh/9lsFyjlfBziSf161JlstRHnnKPJ6jOzaCJr7m0P96ccBqtkWluC5d42fdLVhFqBpZPaqP6CXNlin5x0o6c7kMV9L+cSsSd6iTffksyfoYrfPVI+u6PWguajmG2UzYGAzsrmsIQDdzJVRf7cI+4qqIKSaa0BHi2UzKbJkG8dA7wI7uGWv3nSVwJFUHgHkKtOEoC1NHGoBJpO62jQLpNfZlozwDw6vDpXVaHnMbbKghhfyNe8XVqMyPfLSTw0tNGFsCAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUUONbQh3M0n4qXgTRDu7F1XgFSN0wDgYDVR0PAQH/BAQDAgKEMA0GCSqGSIb3DQEBCwUAA4IBAQBdskJlljltBm+JPPEStfa264aKiKvdyjSuwQcvrqXPm5q5/GEmKjMdG3c+3R6BmgWOKCHL3Bg70aFWidqy6sYfbdZ806JctN2FGsJUa5hSTZSjkhn+VkER16/6iCNr5e/KVnZwkWd5U05asshoaMugHTLlFHISxJ2qMUKda2Wi3tkf7eMzc7+1BReY+6etT0ZMf1st1BPalj41cnaBSiLcO67s7XIvH2gkTdYABbzIwXBLuWvQUZ5pX73JdCOuXhfXN/3oE3ICZfOJjGcqeg4eAO8Ns/NFyho8U2xFP8pqhrHqyvxkNHh7eJZaB5gdfUodL4Ldtkmz351zFBCRey0g
        - alg: RS256
          kty: RSA
          use: sig
          n: zlx0IeG8Gzw77BPCuR9MvZVSbSTRkfkcAklS23roIr4mxLr8m5I2Q2bOj56qHztV8frPVTZ0GyesxwScdaSRkNomF2nnzibWRabcek50UmHbpgeA3dXAmxCMUR-Tah0w-eCSsbXu6PbtpWmLm_7niSJnRed45x7b876E2G_DitQFErGMZaLmSG7ewF0aHz-gn37Uio2l71-oXnvshpC7Y17-TUYUDKIiko6P1UKsY7fUBEaZk9-he6Khsny7KYUkcZ1F45q0WKlGwiZyZjU8jPhNGPIc8qj6QmjEhJ07IzjDR4x8pZN3F4go6mKB1thWWhGWrkaLI8UmluHDcD33RQ
          e: AQAB
          kid: sBT98m8u8lpwvV_Cm5ZAX
          x5t: vfM0DKkRNUmYxs13GJnM-NlADuU
          x5c:
            - MIIDBTCCAe2gAwIBAgIJevGCW7bs17g5MA0GCSqGSIb3DQEBCwUAMCAxHjAcBgNVBAMTFWFrbGl2aXR5LnVzLmF1dGgwLmNvbTAeFw0yMjA1MzEyMTI5MzZaFw0zNjAyMDcyMTI5MzZaMCAxHjAcBgNVBAMTFWFrbGl2aXR5LnVzLmF1dGgwLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAM5cdCHhvBs8O+wTwrkfTL2VUm0k0ZH5HAJJUtt66CK+JsS6/JuSNkNmzo+eqh87VfH6z1U2dBsnrMcEnHWkkZDaJhdp584m1kWm3HpOdFJh26YHgN3VwJsQjFEfk2odMPngkrG17uj27aVpi5v+54kiZ0XneOce2/O+hNhvw4rUBRKxjGWi5khu3sBdGh8/oJ9+1IqNpe9fqF577IaQu2Ne/k1GFAyiIpKOj9VCrGO31ARGmZPfoXuiobJ8uymFJHGdReOatFipRsImcmY1PIz4TRjyHPKo+kJoxISdOyM4w0eMfKWTdxeIKOpigdbYVloRlq5GiyPFJpbhw3A990UCAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUt/86Q4B1Xalsr8077ehQ9iqi3rkwDgYDVR0PAQH/BAQDAgKEMA0GCSqGSIb3DQEBCwUAA4IBAQBC6ejNbo9u7+qFvh+j1Zh7YZW+uz06Gd4WnwCU+926JP6U7NMNt3guvPVPYtFXSpKhdAom2t/UjBVZh3l7DATU48rE4E/9pzLu8Urg9AVkfRHhLQi+6JZv7ZXDyEcUPtl6jENYZhT1CS2lPsDQ35Ap4BUgWVV8AOOacLVsomHRtS8Q1MtKbNvR+7tJeUEqRxCE7RNXM+FXMDPtwtn5DeKgdDF1HJh95G2Pw4m2W0ZtV1h6NtTuMZMgJtQSqF2IDwaPghLCqdznecLtwuUrVZxjxpuxX2vdYlmtLi2SPf1coKhRHYb4AMj8NNKmBZs9hgPOJxkvQxu8sh7XFbKSQ0gY
```

</details>

This allows the Zilla engine to validate the API caller's JWT access token at the `http_server0` binding so that routes further along in the pipeline can verify the caller has the required roles.

The `sse_kafka_proxy0` binding is `guarded` on the `/tasks` route, requiring `read:tasks` role.

The `http_kafka_proxy0` binding is `guarded` on the `POST`, `PUT` and `DELETE` routes, requiring `write:tasks` role.

Then, add the `http_filesystem_proxy0` and `filesystem_server0` bindings to `zilla.yaml` giving the following updated configuration.

<details>

<summary>zilla.yaml (updated)</summary>

```yaml
---
name: Example
vaults: {}
bindings:
  tcp_serverab9279f6-00aa-40a9-b10a-268c5ebfd800:
    type: tcp
    kind: server
    options:
      host: 0.0.0.0
      port: 8080
    exit: http_serverab9279f6-00aa-40a9-b10a-268c5ebfd800
  http_serverab9279f6-00aa-40a9-b10a-268c5ebfd800:
    type: http
    kind: server
    options:
      access-control:
        policy: cross-origin
      authorization:
        jwt8b87272a-d681-4414-8697-a0ad1b2d5529:
          credentials:
            headers:
              authorization: Bearer {credentials}
            query:
              access_token: "{credentials}"
    routes:
      - when:
          - headers:
              :method: GET
              :path: /tasks
        exit: sse_serverab9279f6-00aa-40a9-b10a-268c5ebfd800
      - when:
          - headers:
              :method: POST
              :path: /tasks
          - headers:
              :method: PUT
              :path: /tasks/*
          - headers:
              :method: DELETE
              :path: /tasks/*
        exit: http-kafka_proxyab9279f6-00aa-40a9-b10a-268c5ebfd800
    exit: http_filesystem_proxy0
  sse_serverab9279f6-00aa-40a9-b10a-268c5ebfd800:
    type: sse
    kind: server
    exit: sse-kafka_proxyab9279f6-00aa-40a9-b10a-268c5ebfd800
  sse-kafka_proxyab9279f6-00aa-40a9-b10a-268c5ebfd800:
    type: sse-kafka
    kind: proxy
    routes:
      - when:
          - path: /tasks
        exit: kafka_cache_clientda6b9d8f-0846-4b2b-8ed6-b8db5605e50c
        with:
          event:
            id: '["${base64(key)}","${etag}"]'
          topic: task-snapshots
        guarded:
          jwt8b87272a-d681-4414-8697-a0ad1b2d5529:
            - read:tasks
  http-kafka_proxyab9279f6-00aa-40a9-b10a-268c5ebfd800:
    type: http-kafka
    kind: proxy
    routes:
      - when:
          - method: POST
            path: /tasks
        exit: kafka_cache_clientda6b9d8f-0846-4b2b-8ed6-b8db5605e50c
        with:
          capability: produce
          reply-to: task-replies
          topic: task-commands
          key: ${idempotencyKey}
          overrides:
            zilla:domain-model: CreateTaskCommand
        guarded:
          jwt8b87272a-d681-4414-8697-a0ad1b2d5529:
            - write:tasks
      - when:
          - method: PUT
            path: /tasks/{id}
        exit: kafka_cache_clientda6b9d8f-0846-4b2b-8ed6-b8db5605e50c
        with:
          capability: produce
          reply-to: task-replies
          topic: task-commands
          key: ${params.id}
          overrides:
            zilla:domain-model: RenameTaskCommand
        guarded:
          jwt8b87272a-d681-4414-8697-a0ad1b2d5529:
            - write:tasks
      - when:
          - method: DELETE
            path: /tasks/{id}
        exit: kafka_cache_clientda6b9d8f-0846-4b2b-8ed6-b8db5605e50c
        with:
          capability: produce
          reply-to: task-replies
          topic: task-commands
          key: ${params.id}
          overrides:
            zilla:domain-model: DeleteTaskCommand
        guarded:
          jwt8b87272a-d681-4414-8697-a0ad1b2d5529:
            - write:tasks
  kafka_cache_clientda6b9d8f-0846-4b2b-8ed6-b8db5605e50c:
    type: kafka
    kind: cache_client
    exit: kafka_cache_serverda6b9d8f-0846-4b2b-8ed6-b8db5605e50c
  kafka_cache_serverda6b9d8f-0846-4b2b-8ed6-b8db5605e50c:
    type: kafka
    kind: cache_server
    options:
      bootstrap:
        - task-replies
        - task-snapshots
    exit: kafka_clientda6b9d8f-0846-4b2b-8ed6-b8db5605e50c
  kafka_clientda6b9d8f-0846-4b2b-8ed6-b8db5605e50c:
    type: kafka
    kind: client
    exit: tcp_clientda6b9d8f-0846-4b2b-8ed6-b8db5605e50c
  tcp_clientda6b9d8f-0846-4b2b-8ed6-b8db5605e50c:
    type: tcp
    kind: client
    options:
      host: kafka.internal.net
      port: 29092
    routes:
      - when:
          - cidr: 0.0.0.0/0
  http_filesystem_proxy0:
    type: http-filesystem
    kind: proxy
    routes:
      - when:
          - path: /
        exit: filesystem_server0
        with:
          path: index.html
      - when:
          - path: /{path}
        exit: filesystem_server0
        with:
          path: ${params.path}
  filesystem_server0:
    type: filesystem
    kind: server
    options:
      location: /app/dist/
guards:
  jwt8b87272a-d681-4414-8697-a0ad1b2d5529:
    type: jwt
    options:
      issuer: https://aklivity.us.auth0.com/
      audience: http://localhost:8080/tasks
      keys:
        - alg: RS256
          kty: RSA
          use: sig
          n: xpUpx4ytuhi0Tz4_l7qqigo_CleAGBs7zalBLHR68tRz3EM2rf6JZapeT7vA6FcdGJskcqNSEYZJsbX0RWsqH_2WwXKOV8HOJJ_XrUmWy1Eeeco8nqM7NoImvubQ_3pxwGq2RaW4Ll3jZ90tWEWoGlk9qo_oJc2WKfnHSjpzuQxX0v5xKxJ3qJN9-SzJ-hit89Uj67o9aC5qOYbZTNgYDOyuawhAN3MlVF_twj7iqogpJprQEeLZTMpsmQbx0DvAju4Za_edJXAkVQeAeQq04SgLU0cagEmk7raNAuk19mWjPAPDq8OldVoecxtsqCGF_I17xdWozI98tJPDS00YWw
          e: AQAB
          kid: x9YmmTzyWUxAj6683CkM-
          x5t: xKsfyirPoDUfrpgvjnKI5wmYzBg
          x5c:
            - MIIDBTCCAe2gAwIBAgIJfcoikPv8CQX+MA0GCSqGSIb3DQEBCwUAMCAxHjAcBgNVBAMTFWFrbGl2aXR5LnVzLmF1dGgwLmNvbTAeFw0yMjA1MzEyMTI5MzZaFw0zNjAyMDcyMTI5MzZaMCAxHjAcBgNVBAMTFWFrbGl2aXR5LnVzLmF1dGgwLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMaVKceMrboYtE8+P5e6qooKPwpXgBgbO82pQSx0evLUc9xDNq3+iWWqXk+7wOhXHRibJHKjUhGGSbG19EVrKh/9lsFyjlfBziSf161JlstRHnnKPJ6jOzaCJr7m0P96ccBqtkWluC5d42fdLVhFqBpZPaqP6CXNlin5x0o6c7kMV9L+cSsSd6iTffksyfoYrfPVI+u6PWguajmG2UzYGAzsrmsIQDdzJVRf7cI+4qqIKSaa0BHi2UzKbJkG8dA7wI7uGWv3nSVwJFUHgHkKtOEoC1NHGoBJpO62jQLpNfZlozwDw6vDpXVaHnMbbKghhfyNe8XVqMyPfLSTw0tNGFsCAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUUONbQh3M0n4qXgTRDu7F1XgFSN0wDgYDVR0PAQH/BAQDAgKEMA0GCSqGSIb3DQEBCwUAA4IBAQBdskJlljltBm+JPPEStfa264aKiKvdyjSuwQcvrqXPm5q5/GEmKjMdG3c+3R6BmgWOKCHL3Bg70aFWidqy6sYfbdZ806JctN2FGsJUa5hSTZSjkhn+VkER16/6iCNr5e/KVnZwkWd5U05asshoaMugHTLlFHISxJ2qMUKda2Wi3tkf7eMzc7+1BReY+6etT0ZMf1st1BPalj41cnaBSiLcO67s7XIvH2gkTdYABbzIwXBLuWvQUZ5pX73JdCOuXhfXN/3oE3ICZfOJjGcqeg4eAO8Ns/NFyho8U2xFP8pqhrHqyvxkNHh7eJZaB5gdfUodL4Ldtkmz351zFBCRey0g
        - alg: RS256
          kty: RSA
          use: sig
          n: zlx0IeG8Gzw77BPCuR9MvZVSbSTRkfkcAklS23roIr4mxLr8m5I2Q2bOj56qHztV8frPVTZ0GyesxwScdaSRkNomF2nnzibWRabcek50UmHbpgeA3dXAmxCMUR-Tah0w-eCSsbXu6PbtpWmLm_7niSJnRed45x7b876E2G_DitQFErGMZaLmSG7ewF0aHz-gn37Uio2l71-oXnvshpC7Y17-TUYUDKIiko6P1UKsY7fUBEaZk9-he6Khsny7KYUkcZ1F45q0WKlGwiZyZjU8jPhNGPIc8qj6QmjEhJ07IzjDR4x8pZN3F4go6mKB1thWWhGWrkaLI8UmluHDcD33RQ
          e: AQAB
          kid: sBT98m8u8lpwvV_Cm5ZAX
          x5t: vfM0DKkRNUmYxs13GJnM-NlADuU
          x5c:
            - MIIDBTCCAe2gAwIBAgIJevGCW7bs17g5MA0GCSqGSIb3DQEBCwUAMCAxHjAcBgNVBAMTFWFrbGl2aXR5LnVzLmF1dGgwLmNvbTAeFw0yMjA1MzEyMTI5MzZaFw0zNjAyMDcyMTI5MzZaMCAxHjAcBgNVBAMTFWFrbGl2aXR5LnVzLmF1dGgwLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAM5cdCHhvBs8O+wTwrkfTL2VUm0k0ZH5HAJJUtt66CK+JsS6/JuSNkNmzo+eqh87VfH6z1U2dBsnrMcEnHWkkZDaJhdp584m1kWm3HpOdFJh26YHgN3VwJsQjFEfk2odMPngkrG17uj27aVpi5v+54kiZ0XneOce2/O+hNhvw4rUBRKxjGWi5khu3sBdGh8/oJ9+1IqNpe9fqF577IaQu2Ne/k1GFAyiIpKOj9VCrGO31ARGmZPfoXuiobJ8uymFJHGdReOatFipRsImcmY1PIz4TRjyHPKo+kJoxISdOyM4w0eMfKWTdxeIKOpigdbYVloRlq5GiyPFJpbhw3A990UCAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUt/86Q4B1Xalsr8077ehQ9iqi3rkwDgYDVR0PAQH/BAQDAgKEMA0GCSqGSIb3DQEBCwUAA4IBAQBC6ejNbo9u7+qFvh+j1Zh7YZW+uz06Gd4WnwCU+926JP6U7NMNt3guvPVPYtFXSpKhdAom2t/UjBVZh3l7DATU48rE4E/9pzLu8Urg9AVkfRHhLQi+6JZv7ZXDyEcUPtl6jENYZhT1CS2lPsDQ35Ap4BUgWVV8AOOacLVsomHRtS8Q1MtKbNvR+7tJeUEqRxCE7RNXM+FXMDPtwtn5DeKgdDF1HJh95G2Pw4m2W0ZtV1h6NtTuMZMgJtQSqF2IDwaPghLCqdznecLtwuUrVZxjxpuxX2vdYlmtLi2SPf1coKhRHYb4AMj8NNKmBZs9hgPOJxkvQxu8sh7XFbKSQ0gY
```

</details>

Now run the command below to update the `zilla` service and force a restart.

```bash:no-line-numbers
docker service update --force \
  $(docker stack services example -q -f name=example_zilla)
```

Let's verify the Tasks API using `curl` as shown below.

```bash:no-line-numbers
curl -v http://localhost:8080/tasks
```

```bash:no-line-numbers
> GET /tasks HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/7.79.1
> Accept: */*
>

< HTTP/1.1 404 Not Found
< Content-Length: 0
< Access-Control-Allow-Origin: *
< 
```

As you can see, the `GET /tasks` API is now secured against unauthorized access, _without_ leaking any information about failed security checks.

### Step 2: Test Drive

Open the browser and enter [`http://localhost:8080/`](http://localhost:8080/) to see the secured Todo Application.

Initially you will see an error message caused by attempting to list the current tasks as an unauthorized user without the `read:tasks` role.

Click the `Login` button and follow the flow to become an authorized user, then you will see your profile picture in the upper right corner in place of the login button.

For the purposes of this guide, all authorized users are implicitly granted both `read:tasks` and `write:tasks` roles for the Tasks API at `http://localhost:8080/tasks`.

The Todo Application now behaves as expected, with authorized-only access to the Tasks API.

![](./SecureTodoAppLoggedIn.png)
