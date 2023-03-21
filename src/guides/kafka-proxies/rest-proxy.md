# REST Proxy

Zilla lets you configure application-centric REST API endpoints that unlock `Apache Kafka` event-driven architectures. An application-centric REST API for Kafka gives the developer freedom to define their own HTTP mapping to Kafka, with control over the topic, message key, message headers, message value, and reply-to topic. This guide will explain all the aspects of configuring Zilla with REST API endpoints.

A brief explanation of replaceable values from the config examples below:

<table><thead><tr><th></th><th></th><th data-hidden></th></tr></thead><tbody><tr><td><code>ENDPOINT_PATH</code></td><td>HTTP path for example <code>/tasks</code></td><td></td></tr><tr><td><code>KAFKA_TOPIC</code></td><td>The Kafka topic that you want to produce to or fetch from.</td><td></td></tr><tr><td><code>KAFKA_REPLY_TO_TOPIC</code></td><td>The Kafka topic that you want to send a response with <code>correlation-id</code></td><td></td></tr><tr><td><code>AUTH_URL</code></td><td>JWT token provider URL</td><td></td></tr></tbody></table>

### Configure Endpoints

Zilla can be configured to map REST APIs to Kafka using the [http-kafka](https://docs.aklivity.io/zilla/reference/zilla.json/binding-http-kafka) binding in zilla.json.

Kafka **Produce** capability and HTTP request method types such as `POST`, `PUT`, `DELETE`, and `PATCH` .

#### zilla.json

```json
  {
      "bindings": {
      ...
        "http_kafka_proxy0": {
          "type": "http-kafka",
          "kind": "proxy",
          "routes": [
            {
              "when": [
                {
                  "method": "POST",
                  "path": "ENDPOINT_PATH"
                }
              ],
              "exit": "kafka_cache_client0",
              "with": {
                "capability": "produce",
                "topic": "KAFKA_TOPIC",
                "key": "${idempotencyKey}",
                 "reply-to": "KAFKA_REPLY_TO_TOPIC"
              }
            }
          ]
        }
        ...
      }
    }  
  
```


::: info NOTE
When the POST request is received by Zilla, a message is produced to the requests topic, with HTTP headers delivered as the Kafka message headers and the HTTP payload delivered as the Kafka message value. You have the option to [override headers](https://docs.aklivity.io/zilla/reference/zilla.json/binding-http-kafka#with-produce) as well.&#x20;
:::

Kafka **Fetch** capability with HTTP request methods such as `GET` :

#### zilla.json

```json
{
      "bindings": {
      ...
        "http_kafka_proxy0": {
          "type": "http-kafka",
          "kind": "proxy",
          "routes": [
            {
              "when": [
                {
                  "method": "GET",
                  "path": "ENDPOINT_PATH"
                }
              ],
              "exit": "kafka_cache_client0",
              "with": {
                "capability": "fetch",
                "topic": "KAFKA_TOPIC"
              }
            }
          ]
        }
        ...
      }
    }  
```


### Dynamic URL parameters

It's a common case when you want to work with a specific entity e.g. `/tasks/123`. To make sure the dynamic value `123` is correctly matched and forwarded API endpoint can be configured as in the following example:

#### zilla.json

```json
{
      "bindings": {
      ...
        "http_kafka_proxy0": {
          "type": "http-kafka",
          "kind": "proxy",
          "routes": [
            {
              "when": [
                {
                  "method": "GET",
                  "path": "/tasks/{id}"
                }
              ],
              "exit": "kafka_cache_client0",
              "with": {
                "capability": "fetch",
                "topic": "KAFKA_TOPIC"
              },
              "filters":
              [
                  {
                      "key": "${params.id}"
                  }
              ]
            }
          ]
        }
        ...
      }
    }  
```


### CORS

Zilla supports Cross-Origin Resource Sharing (CORS)  and allows you to specify fine-grained access control including specific request origins, methods and headers allowed, and specific response headers exposed. Since it acts more like a guard and has no dependency on Apache Kafka configuration, you need to define it in the [http binding](https://docs.aklivity.io/zilla/reference/zilla.json/binding-http).

#### zilla.json

```json
"http_server0":
{
    "type" : "http",
    "kind": "server",
    "options":
    {
        "access-control":
        {
            "policy": "cross-origin"
        }
    },
    "routes":
    [
        {
            "when":
            [
                {
                    "headers":
                    {
                        ":scheme": "https",
                        ":authority": "example.com:443"
                    }
                }
            ],
            "exit": "echo_server0"
        }
    ]
}

```


### Authorization

Since `Zilla` config is very much modular it has the concept of [`guard`](https://docs.aklivity.io/zilla/reference/zilla.json/guard) where you define your `guard` configuration and reference that `guard` to authorize a specific endpoint. Currently, `Zilla`  supports [`JSON Web Token (JWT)`](https://docs.aklivity.io/zilla/reference/zilla.json/guard-jwt)  mechanism to authorize the endpoint.&#x20;

The information about keys and other details such as issuer and audience you can get from `JWT` providers for example in the case of Auth0 you can use the command below.

```
curl -s https://AUTH_URL/.well-known/jwks.json | jq .keys
```

#### zilla.json

```json
{
    ...
    "guards": {
        "jwt0": {
		    "type": "jwt",
		    "options": {
		        "issuer": "https://auth.example.com",
		        "audience": "https://api.example.com",
		        "keys": [
		            {
		                "kty":"EC",
		                "crv":"P-256",
		                "x":"MKBCTNIcKUSDii11ySs3526iDZ8AiTo7Tu6KPAqv7D4",
		                "y":"4Etl6SRW2YiLUrN5vfvVHuhp7x8PxltmWWlbbM4IFyM",
		                "use":"enc",
		                "kid":"1"
		            }, {
		                "kty":"RSA",
		                "n": "0vx7agoebGcQSuuPiLJXZptN9nndrQmbXEps2aiAFbWhM78LhWx4cbbfAAtVT86zwu1RK7aPFFxuhDR1L6tSoc_BJECPebWKRXjBZCiFV4n3oknjhMstn64tZ_2W-5JsGY4Hc5n9yBXArwl93lqt7_RN5w6Cf0h4QyQ5v-65YGjQR0_FDW2QvzqY368QQMicAtaSqzs8KJZgnYb9c7d0zgdAZHzu6qMQvRL5hajrn1n91CbOpbISD08qNLyrdkt-bFTWhAI4vMQFh6WeZu0fM4lFd2NcRwr3XPksINHaQ-G_xBniIqbw0Ls1jF44-csFCur-kEgU8awapJzKnqDKgw",
		                "e":"AQAB",
		                "alg":"RS256",
		                "kid":"2011-04-29"
		            }
		        ],
		        "challenge": 30
		    }
		}
    },
    {
    "bindings": {
        ...
        "http_server0": {
            "type": "http",
            "kind": "server",
            "options": {
                ...
                "authorization": {
                    "jwt0": {
                        "credentials": {
                            "headers": {
                                "authorization": "Bearer {credentials}"
                            },
                            "query": {
                                "access_token": "{credentials}"
                            }
                        }
                    }
                }
            },
            ...
        },
        "http_kafka_proxy0": {
            "type": "http-kafka",
            "kind": "proxy",
            "routes": [
                {
                    "guarded": {
                        "jwt0": [ "write:tasks" ]
                    },
                    "when": [
                        {
                            "method": "POST",
                            "path": "ENDPOINT_PATH"
                        }
                    ],
                    "exit": "kafka_cache_client0",
                    "with": {
                        "capability": "produce",
                        "topic": "KAFKA_TOPIC",
                        "key": "${idempotencyKey}",
                        "reply-to": "KAFKA_REPLY_TO_TOPIC"
                    }
                }
            ]
        }
        ...
	}
    ...
 }
```


### More

For a more detailed explanation please check out Zilla Runtime Configuration Reference doc for [HTTP Binding](https://docs.aklivity.io/zilla/reference/zilla.json/binding-http), [HTTP-Kafka Binding](https://docs.aklivity.io/zilla/reference/zilla.json/binding-http-kafka), and [Guard(JWT)](https://docs.aklivity.io/zilla/reference/zilla.json/guard-jwt).
