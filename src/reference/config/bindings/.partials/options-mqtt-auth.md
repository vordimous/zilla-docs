#### authorization.credentials\*

> `object`

Defines how to extract credentials from the MQTT connect packet.

#### credentials.connect\*

> `object`

MQTT connect packet properties

#### connect.username

> `string`

Extract credentials from the MQTT connect packet username property with `{credentials}`, e.g. `"Bearer` `{credentials}"`.

#### connect.password

> `string`

Extract credentials from the MQTT connect packet password property with `{credentials}`, e.g. `"Bearer` `{credentials}"`.
