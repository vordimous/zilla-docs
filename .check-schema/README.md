# Schema Docs Comparison

This project compares the JSON Schema from the Zilla to the [Reference](../src/reference) section of the docs.

## Generate a the schema

You can generate the Zilla schema on startup by using the `zilla start` command with the `-Pzilla.engine.verbose.schema.plain` option. The `schema.plain` option is needed because we don't need to check the schema with the extra string validation options that get injected.

```bash
zilla start -v -Pzilla.engine.verbose.schema.plain
```

### Update schema from Docker

You can generate the schema from the docker image and pull it from the logs. Then just remove the none JSON lines from the beginning and end of each file.

In the repository root directory run:

```bash
brew install gsed
```

```bash
CONTAINER_ID=$(docker run -d --rm -e ZILLA_INCUBATOR_ENABLED=true ghcr.io/aklivity/zilla:develop-SNAPSHOT start -v -Pzilla.engine.verbose.schema.plain);
sleep 5;
docker logs $CONTAINER_ID > ./.check-schema/zilla-schema.json 2>&1;
docker stop $CONTAINER_ID;

gsed -i '1,2d' ./.check-schema/zilla-schema.json;
gsed -i '$d' ./.check-schema/zilla-schema.json;
```
