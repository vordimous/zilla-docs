### options

> `object`

The `schema-registry` specific options.

#### options.url

> `string`

Schema Registry URL to access schemas via API calls.

#### options.context

> `string` | Default: `default`

Schema context represents an independent scope in the Schema Registry.

#### options.max-age

> `integer` | Default: `300`

The maximum duration in seconds to keep a cached schema before fetching the schema again.
