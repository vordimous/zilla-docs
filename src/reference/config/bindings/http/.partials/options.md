
#### options.requests

> `array` of `object`

Options to configure typed validations for request fields.

#### requests[].content

> `enum` [ `double`, `float`, `int32`, `int64`, `json`, `string` ], `object`

Enforce validation for the request content.

#### content.model\*

> `enum` [ `double`, `float`, `int32`, `int64`, `json`, `string` ]

A schema or type to validate the request content. Refer to the individual [model](../../../models/) docs for type specific implementation.

#### requests[].content-type

> `array` of `string`

Content type of the HTTP request.

#### requests[].headers

> `object` as map of named `enum` [ `double`, `float`, `int32`, `int64`, `json`, `string` ], `object` as map of named `object` properties

Enforce validation for request headers.

#### requests[].method

> `enum` [ `GET`, `PUT`, `POST`, `DELETE`, `OPTIONS`, `HEAD`, `PATCH`, `TRACE` ]

HTTP request method.

#### requests[].params

> `object`

Query parameters of the HTTP request.

#### params.path

> `object` as map of named `enum` [ `double`, `float`, `int32`, `int64`, `json`, `string` ], `object` as map of named `object` properties

Enforce validation for path

#### path.model\*

> `enum` [ `double`, `float`, `int32`, `int64`, `json`, `string` ]

A schema or type to validate the path content. Refer to the individual [model](../../../models/) docs for type specific implementation.

#### params.query

> `object` as map of named `enum` [ `double`, `float`, `int32`, `int64`, `json`, `string` ], `object` as map of named `object` properties

Enforce validation for query

#### query.model\*

> `enum` [ `double`, `float`, `int32`, `int64`, `json`, `string` ]

A schema or type to validate the query content. Refer to the individual [model](../../../models/) docs for type specific implementation.

#### requests[].path

> `string`

URL path of the HTTP request.

#### requests[].responses

> `array` of `object`

Options to configure typed validations for response fields.

#### responses[].content

> `enum` [ `double`, `float`, `int32`, `int64`, `json`, `string` ], `object`

Enforce validation for the response content.

<!-- markdownlint-disable MD024 -->
#### content.model\*

> `enum` [ `double`, `float`, `int32`, `int64`, `json`, `string` ]

A schema or type to validate the response content. Refer to the individual [model](../../../models/) docs for type specific implementation.
<!-- markdownlint-enable MD024 -->

#### responses[].content-type

> `array` of `string`

Content type of the HTTP response.

#### responses[].headers

> `object` as map of named `enum` [ `double`, `float`, `int32`, `int64`, `json`, `string` ], `object` as map of named `object` properties

Enforce validation for response headers.

```yaml
headers:
  my-header:
    model: string
    maxLength: 100
```

#### headers.model\*

> `enum` [ `double`, `float`, `int32`, `int64`, `json`, `string` ]

A schema or type to validate the headers content. Refer to the individual [model](../../../models/) docs for type specific implementation.

#### responses[].status

> `integer`, `array` of `integer`

HTTP status code or codes for the response

#### options.versions

> `array` of `enum` [ `http/1.1`, `h2` ] | Default: `http/1.1,h2`

Supported protocol versions.

#### options.overrides

> `object` as map of named `string` properties

Request header overrides.
