# Schema Docs Comparison

This project compares the JSON Schema from the Zilla to the [Reference](../src/reference) section of the docs.

## Update schema

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

Once the docker container has printed "started" it must be deleted for the command to complete.

Remove the none JSON lines from the beginning and end of each file.
