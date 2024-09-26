### options

> `object`

The `sse` specific options.

```yaml
options:
  retry: 2000
```

#### options.retry

> `integer` | Default: `2000`

Retry delay in milliseconds.

#### options.requests

> `array` of `object`

The `requests` specific options.

#### requests[].path

> `string`

The path selector.

#### requests[].content

> `enum` [ `double`, `float`, `int32`, `int64`, `json`, `string` ], `object`

Enforce validation for the request content.

#### content.model\*

> `enum` [ `double`, `float`, `int32`, `int64`, `json`, `string` ]

A schema or type to validate the request content. Refer to the individual [model](../../../models/) docs for type specific implementation.
