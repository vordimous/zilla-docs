### catalog\*

> `object` as map of named `array`

To map defined catalog for schema retrieval based on catalog specific parameters. Any of the possible combination can be configured.

> `id`
-----
> `strategy`
> `version`
-----
> `subject`
> `version`

#### catalog[].id\*

> `integer`

Define specific schema id to refer from catalog.

#### catalog[].version

> `string` | Default: `latest`

Specific iteration or version of a registered schema in the defined catalog.

#### catalog[].strategy\*

> `enum` [ `topic` ]

To determine the subject based on the specified strategy

#### catalog[].subject\*

> `string`

Unique identifier for schema categorization in the catalog.
