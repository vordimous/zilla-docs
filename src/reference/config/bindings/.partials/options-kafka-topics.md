#### topics[].name

> `string`

Topic name.

#### topics[].key

> `enum` [ `avro`, `double`, `float`, `int32`, `int64`, `json`, `protobuf`, `string` ], `object`

Enforce validation for key

#### key.model\*

> `enum` [ `avro`, `double`, `float`, `int32`, `int64`, `json`, `protobuf`, `string` ]

A schema or type to validate the topic's key. Refer to the individual [model](../../models/) docs for type specific implementation.

#### topics[].value

> `enum` [ `avro`, `double`, `float`, `int32`, `int64`, `json`, `protobuf`, `string` ], `object`

Enforce validation for value

#### value.model\*

> `enum` [ `avro`, `double`, `float`, `int32`, `int64`, `json`, `protobuf`, `string` ]

A schema or type to validate the topic's value. Refer to the individual [model](../../models/) docs for type specific implementation.
