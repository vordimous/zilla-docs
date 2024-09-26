### routes

> `array` of `object`

Conditional `tcp` specific routes.

#### routes[].guarded

> `object` as map of named `array` of `string`

List of roles required by each named guard to authorize this route.

#### routes[].when

> `array` of `object`

List of conditions (any match) to match this route.
Read more: [When a route matches](../../../../../concepts/bindings.md#when-a-route-matches)

#### when[].authority

> `string`

Associated authority.

#### when[].cidr

> `string` | Pattern: `^[0-9a-fA-F:.]+/(\\d{1,3})$`

CIDR mask.

#### when[].port

> `integer`, `string`, `array`

Port number(s), including port number ranges.
