const fs = require("fs");
const { marked } = require("marked");
const schema = require("./zilla-schema.json");
var errors = [];

function getPageProps(tokens) {
    var foundHeadings = [];
    tokens
        .filter(({ depth }) => depth > 2)
        .forEach((t) => {
            if (t.text && t.type && t.type === "heading") {
                t.tokens
                    .filter(({ type }) => type === "text")
                    .forEach(({ text }) => foundHeadings.push(text));
            }
        });
    return foundHeadings;
}

function getObjProps(attr, obj, reqKeys) {
    var props = [];
    // console.log(attr, reqKeys)
    Object.keys(obj || {}).forEach((k) => {

        if (!!obj[k].deprecated) return

        //recurse
        if (obj[k].properties) {
            props.push(...getObjProps(k, obj[k].properties, obj[k].required));
        }
        if (obj[k].items && obj[k].items.properties) {
            props.push(
                ...getObjProps(`${k}[]`, obj[k].items.properties, obj[k].items.required)
            );
        }
        if (obj[k].items && obj[k].items.anyOf) {
            obj[k].items.anyOf
                .filter(({ properties }) => !!properties)
                .forEach(({ properties, required }) =>
                    props.push(...getObjProps(`${k}[]`, properties, required))
                );
        }
        if (obj[k].patternProperties) {
            var ppObj =
                obj[k].patternProperties[Object.keys(obj[k].patternProperties)[0]];
            if (ppObj.properties)
                props.push(...getObjProps(`${k}`, ppObj.properties, ppObj.properties));
        }
        if (obj[k].additionalProperties && obj[k].additionalProperties.oneOf) {
            obj[k].additionalProperties.oneOf
                .filter(({ properties }) => !!properties)
                .forEach(({ properties, required }) =>
                    props.push(...getObjProps(`${k}`, properties, required))
                );
        }
        if (obj[k].anyOf) {
            obj[k].anyOf
                .filter(({ properties }) => !!properties)
                .forEach(({ properties, required }) =>
                    props.push(...getObjProps(`${k}`, properties, required))
                );
        }
        if (obj[k].oneOf) {
            obj[k].oneOf
                .filter(({ properties }) => !!properties)
                .forEach(({ properties, required }) =>
                    props.push(...getObjProps(`${k}`, properties, required))
                );
        }

        //base
        if (!!!obj[k]) return
        if (reqKeys && !reqKeys.include) {
            reqKeys = Object.keys(reqKeys);
        }
        var req = !!reqKeys?.includes(k);
        var path = [attr, k].filter((s) => !!s).join(".");
        if (obj[k].properties) {
            props.push([path, "object", req, obj[k].const]);
        } else if (obj[k].additionalProperties) {
            if (obj[k].additionalProperties.oneOf) {
                props.push([
                    path,
                    obj[k].additionalProperties.oneOf.map(({ type }) => type).join(","),
                    req,
                    obj[k].const,
                ]);
            } else {
                props.push([path, obj[k].additionalProperties.type, req, obj[k].const]);
            }
        } else if (obj[k].items) {
            props.push([path, "array", req, obj[k].const]);
        } else if (obj[k].type) {
            if (obj[k].const) path = `${path}: ${obj[k].const}`;
            props.push([path, obj[k].type, req, obj[k].const]);
        } else if (obj[k].const) {
            props.push([`${path}: ${obj[k].const}`, "string", req, obj[k].const]);
        } else if (obj[k].enum) {
            props.push([path, obj[k].enum.join(","), req, obj[k].const]);
        } else if (obj[k].const) {
            props.push([path, obj[k].const, req, obj[k].const]);
        } else if (obj[k].oneOf) {
            props.push([
                path,
                obj[k].oneOf
                    .filter(({ type }) => !!type)
                    .map(({ type }) => type)
                    .join(","),
                req,
                obj[k].const,
            ]);
        }
    });
    return props;
}

var sections = ["binding", "guard", "vault", "catalog"]
    .map((type) =>
        schema.$defs[type]?.allOf.map(({ if: fi, then }) => ({
            type,
            folder: `${type}s`,
            name: fi.properties.type.const,
            props: { ...(schema.$defs[type].properties || {}), ...then.properties },
        }))
    )
    .flat(1);

sections.push(
    ...schema.$defs.telemetry.exporter?.allOf.map(({ if: fi, then }) => ({
        type: "exporter",
        folder: "telemetry.exporters",
        name: fi.properties.type.const,
        props: then.properties,
    }))
);

sections.forEach(({ type, folder, name, props }) => {
    delete props.type;
    var attrs = getObjProps(null, props, []);
    var filename = `src/reference/config/${folder.replaceAll(".", "/")}/${type
        .split(".")
        .findLast((n) => !!n)}-${name}.md`;
    // console.log('parsing', filename)
    if (
        fs.existsSync(filename)
    ) {
        var headers = getPageProps(
            marked.lexer(
                fs.readFileSync(filename, "utf8")
                    .toString()
            )
        ).sort();
        var sorted = attrs.map((a) => a[0]).sort();
        // console.log("findings", type, name, sorted, headers);
        var addList = sorted.filter((x) =>
            !headers.includes(x) &&
            !["telemetry", "telemetry.metrics", "type", "catalog"].includes(x)
        );
        var removeList = headers.filter((x) =>
            !sorted.includes(x) &&
            !["routes[].exit", "routes[].guarded"].includes(x)
        );
        if(addList.length) console.log(type,name,"add",addList);
        if(removeList.length) console.log(type,name,"remove",removeList);
        // if (name == "mqtt" ) console.log(sorted, headers)
    } else {
        errors.push(`missing ${name}`);
    }
});

//check metrics
// {
//     type: 'telemetry.metrics',
//     name: 'grpc',
//     props: schema.$defs.telemetry.metrics.items.enum.filter((m) => m.startsWith('grpc')),
// }

// console.log(errors)
