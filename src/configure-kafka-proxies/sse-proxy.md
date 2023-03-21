# SSE Proxy

There is an increasing rise in integrating the event stream into frontends where companies are starting to adopt Server-sent Events (SSE) standards. `SSE` naturally fits into the event-driven architecture and you will be able to take advantage of all the benefits it provides such as SDK-free and the ability to auto-reconnect in case of an unstable connection(Be resilient to faults). Zilla supports SSE protocol that you can easily configure the frontend SSE with Kafka topic.

A brief explanation of replaceable values from the config examples below:

<table><thead><tr><th></th><th></th><th data-hidden></th></tr></thead><tbody><tr><td><code>ENDPOINT_PATH</code></td><td>HTTP path for example <code>/tasks</code></td><td></td></tr><tr><td><code>KAFKA_TOPIC</code></td><td>The Kafka topic that you want to stream from</td><td></td></tr></tbody></table>

### Configure Endpoint

Configuring `Zilla` with SSE endpoint  and Kafka binding is as simple as it is shown below:

```json
{
    ...
    "sse_server0":
    {
        "type" : "sse",
        "kind": "server",
        "exit": "sse_kafka_proxy0"
    },
    "sse_kafka_proxy0":
    {
        "type" : "sse-kafka",
        "kind": "proxy",
        "routes":
        [
            {
                "when":
                [
                    {
                        "path": "ENDPOINT_PATH"
                    }
                ],
                "with":
                {
                    "topic": "KAFKA_TOPIC",
                    "event":
                    {
                        "id": "[\"${base64(key)}\",\"${etag}\"]"
                    }
                },
                "exit": "kafka_cache_client0",
            }
        ]
    }
    ...
}
```

As shown above you can describe your event id in case you want to retrieve the message `key` or `etag`.

### Authorization

Similar to [REST API](https://app.gitbook.com/o/-MgpzCvF5ASmql4KrimM/s/Vm9RaZVq9LSiRtVnjdT5/\~/changes/6egLxlGFQsSCpw1GICR4/configure-apis/rest-api) you can secure the `SSE` endpoints as well which allows you to continuously authorize the stream which unlike `HTTP` request, `SSE` is a long-lived connection.

### More

For the full capability of `SSE` configure you can check out Zilla Runtime Configuration Reference: [SSE Binding](https://docs.aklivity.io/zilla/reference/zilla.json/binding-sse), [SSE-Kafka Binding](https://docs.aklivity.io/zilla/reference/zilla.json/binding-sse-kafka).
