const process = require('node:process');
const fs = require("fs");
const path = require("path");
const { marked } = require("marked");
const { $RefParser } = require("@apidevtools/json-schema-ref-parser");
const schema = require("./zilla-schema.json");

const OBJECT_MAP_TYPE = "`object` as map of named ";

const main = async () => {
    await $RefParser.dereference(schema);
    // console.log("RefParser", JSON.stringify(schema))
    var errors = [];

    function getExtraProps(o) {
        return {
            default: (o.default ? "`" + o.default + "`" : undefined),
            pattern: (o.pattern ? "`" + (o.pattern?.replaceAll("\\", "\\\\") || "") + "`" : undefined),
            minimum: (o.minimum ? "`" + o.minimum + "`" : undefined),
            maximum: (o.maximum ? "`" + o.maximum + "`" : undefined)
        };
    }

    function getType(i, patternProperties) {
        // console.log(i);
        var type = "`" + (i.type || "object") + "`" + (patternProperties ? " properties" : "");
        if (i.enum) type = "`enum`" + ` [ ${i.enum.map((e) => ("`" + e + "`")).join(", ")} ]`;
        if (i.items?.enum) type = `${"`array`"}${i.items.enum ? " of `enum`" + ` [ ${i.items.enum.map((e) => ("`" + e + "`")).join(", ")} ]` : ""}`;
        else if (i.items) type = `${"`array`"}${(i.items.type ? " of `" + (i.items.type) + "`" : "")}`;
        // else if (i.oneOf?.filter(({ items }) => items?.length).length) type = "`array` of `object`";
        if (patternProperties) type = OBJECT_MAP_TYPE + type;
        return type;
    }

    function getOptions(name, parent, childProps) {
        var anyOfProps = parent.anyOf?.filter(({ properties }) => ((properties?.kind.const) === name && properties?.options)).map(({ properties }) => (properties?.options?.properties));
        var oneOfProps = parent.oneOf?.filter(({ properties }) => ((properties?.kind.const) === name && properties?.options)).map(({ properties }) => (properties?.options?.properties));
        return (childProps?.options !== false && parent?.properties?.options !== false ? {
            ...parent?.properties?.options,
            ...childProps?.options,
            properties: {
                ...(parent?.properties?.options?.properties || {}),
                ...(anyOfProps?.[0] || {}),
                ...(oneOfProps?.[0] || {}),
                ...(childProps?.options?.properties || {}),
            }
        } : {});
    }

    function getRoutes(name, root, parent, childProps) {
        var anyOfProps = parent.anyOf?.filter(({ properties }) => ((properties?.kind.const) === name && properties?.routes)).map(({ properties }) => (properties?.routes?.items?.properties));
        var oneOfProps = parent.oneOf?.filter(({ properties }) => ((properties?.kind.const) === name && properties?.routes)).map(({ properties }) => (properties?.routes?.items?.properties));
        return (parent?.properties?.routes !== false ? {
            ...parent?.properties?.routes,
            items: {
                ...parent?.properties?.routes?.items,
                properties: {
                    ...(root?.properties?.routes?.items?.properties || {}),
                    ...(parent?.properties?.routes?.items?.properties || {}),
                    ...(childProps?.routes?.items?.properties || {}),
                    ...(anyOfProps?.[0] || {}),
                    ...(oneOfProps?.[0] || {}),
                }
            }
        } : {});
    }

    function getRequired(name, parent, childRequired) {
        return [
            ...(parent?.anyOf?.reduce(({ required: r1 }, { required: r2 }) => ([...(r1 || []), ...(r2 || [])]), []) || []),
            ...(parent?.required || []),
            ...(childRequired || [])
        ];
    }

    function getPageProps(pageTokens) {
        var foundHeadings = [];
        // console.log("tokens", tokens);
        pageTokens
            .forEach(({ type, depth, tokens }, i) => {
                if (type === "heading" && depth >= 3) {
                    var h = []
                    // console.log("tokens", tokens);
                    // console.log("heading", tokens[i + 1]);
                    // h.push(text)
                    tokens
                        .filter(({ type }) => type === "text")
                        .forEach(({ text }) => {
                            h.push(text)
                        });
                    tokens
                        .filter(({ type }) => type === "escape")
                        .forEach(({ text }) => h.push(text === "*"));
                    if (h.length == 1) h.push(false);
                    if (pageTokens.length > i + 1 && pageTokens[i + 1].type === "blockquote") {
                        var b = pageTokens[i + 1];
                        // console.log("blockquote", b);
                        b.tokens
                            .filter(({ type }) => type === "paragraph")
                            .forEach(({ text }) => {
                                h.push(...text.split(" | "))
                            });
                    }
                    foundHeadings.push(h)
                }
            });
        return foundHeadings;
    }

    function getObjProps(attr, obj, reqKeys) {
        var props = [];
        // console.log(attr, Object.keys(obj || {}));
        // if (attr === "options") console.log(JSON.stringify(obj));
        Object.entries(obj).forEach(([k, i]) => {
            if (!i || !!i.deprecated) return

            // spread extra props
            i = i.anyOf?.reduce((a, b) => ({ ...a, ...b }), i) || i;
            i = i.allOf?.reduce((a, b) => ({ ...a, ...b }), i) || i;
            // console.log(k, JSON.stringify(i));

            //recurse
            var patternProperties = false;
            if (i.patternProperties) {
                patternProperties = true;
                i = i.patternProperties[Object.keys(i.patternProperties)[0]];
            }
            if (i.properties && Object.keys(i.properties).length) {
                props.push(...getObjProps(k, i.properties, i.required));
            }
            if (i.items?.properties && Object.keys(i.items?.properties).length) {
                props.push(
                    ...getObjProps(`${k}[]`, i.items.properties, i.items.required)
                );
            }

            i.anyOf?.filter(({ properties }) => !!properties)
                .forEach(({ properties, required }) =>
                    props.push(...getObjProps(k, properties, required))
                );
            i.items?.anyOf?.filter(({ properties }) => !!properties)
                .forEach(({ properties, required }) =>
                    props.push(...getObjProps(`${k}[]`, properties, required))
                );
            i.items?.oneOf?.filter(({ properties }) => !!properties)
                .forEach(({ properties, required }) =>
                    props.push(...getObjProps(`${k}[]`, properties, required))
                );
            i.oneOf?.filter(({ properties }) => !!properties)
                .forEach(({ properties, required }) =>
                    props.push(...getObjProps(k, properties, [...(i.required || []), ...(required || [])]))
                );
            var oneOfItems = i.oneOf?.filter(({ items }) => items?.length)
                ?.reduce((a, b) => ([...a, ...b.items]), []);
            if (oneOfItems?.length) {
                props.push(...getObjProps(`${k}[]`, oneOfItems.reduce((a, b) => ({ ...a, ...b.properties }), {}), []))
            }

            i.additionalProperties?.oneOf?.filter(({ properties }) => !!properties)
                .forEach(({ properties, required }) =>
                    props.push(...getObjProps(k, properties, required))
                );

            //collect
            if (!i) return
            var req = !!reqKeys?.includes(k);
            var path = [attr, k].filter((s) => !!s).join(".");
            var type = getType(i, patternProperties);

            if (i.properties && Object.keys(i.properties).length) {
                props.push([path, req, type, getExtraProps(i)]);
            } else if (i.additionalProperties) {
                if (i.additionalProperties.oneOf) {
                    props.push([
                        path,
                        req,
                        OBJECT_MAP_TYPE + i.additionalProperties.oneOf
                            .map((p) => (getType(p, patternProperties)))
                            .join(" or ") + " properties"
                        ,
                        getExtraProps(i)
                    ]);
                } else {
                    type = OBJECT_MAP_TYPE + "`" + i.additionalProperties.type + "` properties";
                    props.push([path, req, type, getExtraProps(i)]);
                }
            } else if (i.items) {
                props.push([path, req, type, getExtraProps(i)]);
            } else if (i.type) {
                if (i.const) {
                    path = `${path}: ${i.const}`;
                    type = "`const`";
                }
                props.push([path, req, type, getExtraProps(i)]);
            } else if (i.const) {
                props.push([`${path}: ${i.const}`, req, "`const`", getExtraProps(i)]);
            } else if (i.enum?.length) {
                i.enum.forEach((e) => props.push([`${path}: ${e}`, req, type, getExtraProps(i)]));
            } else if (i.oneOf) {
                props.push([
                    path,
                    req,
                    i.oneOf
                        .map((p) => (getType(p, patternProperties)))
                        .filter((value, index, array) =>
                            array.indexOf(value) === index
                        )
                        .join(", "),
                    getExtraProps(i)
                ]);
            }
            // console.log('props', JSON.stringify(props));
        });
        return props;
    }

    var sections = Object.entries({
        guard: schema.properties.guards.patternProperties[Object.keys(schema.properties.guards.patternProperties)[0]],
        vault: schema.properties.vaults.patternProperties[Object.keys(schema.properties.vaults.patternProperties)[0]],
        catalog: schema.properties.catalogs.patternProperties[Object.keys(schema.properties.catalogs.patternProperties)[0]],
    }).map(([section, props]) =>
        props?.allOf?.map(({ if: fi, then }) => ({
            folder: `${section}s`,
            name: fi.properties.type.const || fi.properties.type.enum?.[0],
            props: {
                ...(props?.properties || {}),
                ...(then.properties || {}),
                options: getOptions(fi.properties.type.const || fi.properties.type.enum?.[0], props, then.properties),
                allOf: [...(then.allOf || [])],
                anyOf: [...(then.anyOf || [])],
                oneOf: [...(then.oneOf || [])],
            },
            required: [...(props?.required || []), ...(then.required || [])],
        }))
    ).flat(1);

    var bindings = schema.properties.bindings.patternProperties[Object.keys(schema.properties.bindings.patternProperties)[0]];
    var kindsGlobalIs = bindings.anyOf?.filter(({ properties }) => (properties?.kind?.const))
        .reduce((o, a) => {
            // eslint-disable-next-line no-unused-vars
            const { kind: _, ...properties } = a.properties;
            return {
                ...o,
                [a.properties?.kind?.const]: { ...a, properties }
            };
        }, {})
    var kindsGlobalNot = bindings.anyOf?.filter(({ properties }) => (properties?.kind?.not?.const))
        .reduce((o, a) => {
            // eslint-disable-next-line no-unused-vars
            const { kind: _, ...properties } = a.properties;
            return {
                ...o,
                [a.properties?.kind?.not.const]: { properties: {}, required: [] },
                all: { ...o.all, ...a, properties }
            };
        }, { all: {} });
    var getGlobalProps = (kind) => ({
        ...bindings.properties,
        ...(kindsGlobalIs[kind]?.properties || {}),
        ...(kindsGlobalNot[kind]?.properties || kindsGlobalNot.all?.properties || {}),
    });
    var getGlobalReqs = (kind) => ([
        ...bindings.required,
        ...(kindsGlobalIs[kind]?.required || []),
        ...(kindsGlobalNot[kind]?.required || kindsGlobalNot.all?.required || []),
    ]);
    bindings.allOf?.forEach(({ if: fi, then }) => {
        var folder = `bindings.${fi.properties.type.const}`;
        if (then.oneOf) {
            sections.push(...then.oneOf.map(({ properties, required, oneOf, anyOf, allOf }) => ({
                folder,
                name: properties.kind.const,
                props: {
                    ...getGlobalProps(properties.kind.const),
                    ...(then.properties || {}),
                    ...(properties || {}),
                    options: getOptions(properties.kind.const, then, properties),
                    routes: getRoutes(properties.kind.const, bindings, then, properties),
                    allOf: [...(then.allOf || []), ...(allOf || [])],
                    anyOf: [...(then.anyOf || []), ...(anyOf || [])],
                    oneOf: [...(then.oneOf || []), ...(oneOf || [])],
                },
                required: getRequired(properties.kind.const, then, [...(getGlobalReqs(properties.kind.const) || []), ...(required || [])]),
            })));
        } else {
            sections.push({
                folder,
                name: then.properties.kind.enum[0],
                props: {
                    ...getGlobalProps(then.properties.kind.enum[0]),
                    ...(then.properties || {}),
                    options: getOptions(then.properties.kind.enum[0], bindings, then.properties),
                    routes: getRoutes(then.properties.kind.enum[0], bindings, then),
                    allOf: [...(then.allOf || [])],
                    anyOf: [...(then.anyOf || [])],
                    oneOf: [...(then.oneOf || [])],
                },
                required: [...(getGlobalReqs(then.properties.kind.enum[0]) || []), ...(then.required || [])],
            });
        }
    })

    var exporterProps = schema.properties.telemetry.properties.exporters.patternProperties[Object.keys(schema.properties.telemetry.properties.exporters.patternProperties)[0]]
    sections.push(
        ...exporterProps?.allOf?.map(({ if: fi, then }) => ({
            folder: "telemetry.exporters",
            name: fi.properties.type.const,
            props: {
                ...(exporterProps?.properties || {}),
                ...(then.properties || {}),
                anyOf: [...(then.anyOf || [])],
            },
            required: [...(exporterProps?.required || []), ...(then.required || [])],
        })) || {}
    );
    sections.push(
        ...schema.$defs.converter.model?.allOf.map(({ if: fi, then }) => ({
            folder: "models",
            name: fi.properties.model.const,
            props: {
                ...(then.properties || {}),
                anyOf: (then.anyOf || []),
            },
            required: (then.required || []),
        })) || {}
    );

    // console.log("sections", JSON.stringify(sections));
    sections.forEach(({ folder, name, props, required }) => {
        delete props.type;
        delete props.kind;
        var foldername = `src/reference/config/${folder.replaceAll(".", "/")}`;
        var filename = `${name}.md`;
        var filePath = `${foldername}/${filename}`;
        // console.log(filePath, props);
        var schemaAttrs = getObjProps(null, props, required);
        if (fs.existsSync(filePath)) {

            var fullMdContent = fs.readFileSync(filePath, "utf8")
                .toString();
            fullMdContent = fullMdContent.replace(/<!--\s@include:\s(.+\.md)\s-->/g, (_, p1) =>
                (fs.readFileSync(path.resolve(foldername, p1), "utf8").toString())
            );
            var mdAttrs = getPageProps(marked.lexer(fullMdContent));

            // console.log('mdAttrs', mdAttrs)
            // console.log('schemaAttrs', schemaAttrs)

            // get page headers and schema props
            var pageHeaders = mdAttrs.reduce((o, a) => (
                {
                    ...o, [a[0]]: {
                        name: a[0],
                        required: a[1] || false,
                        type: a[2] || '',
                        extra: (a[3] || ''),
                    }
                }), {});
            var schemaProps = schemaAttrs.reduce((o, a) => (
                {
                    ...o, [a[0]]: {
                        name: a[0],
                        required: a[1] || false,
                        type: a[2] || '',
                        extra: (a[3] ? Object.entries(a[3]).filter((e) => (!!e[1])).map(([k, o]) => (`${k.charAt(0).toUpperCase() + k.slice(1).toLowerCase()}: ${o}`)).join(' ') : ''),
                    }
                }), {});

            // console.log('pageHeaders', pageHeaders)
            // console.log('schemaProps', schemaProps)

            // print diff check
            // Object.entries(obj).forEach(([k, i]) { name, required, type, default }
            var addDiff = Object.entries(schemaProps).map(([k, o]) => {
                // console.log(k, o, pageHeaders[k]);
                if (pageHeaders[k] &&
                    (pageHeaders[k].name != o.name
                        || pageHeaders[k].required != o.required
                        || pageHeaders[k].type != o.type
                        || pageHeaders[k].extra != o.extra)
                ) {
                    var p = {
                        name: o.name
                    };
                    if (pageHeaders[k].required != o.required) p.required = o.required;
                    if (pageHeaders[k].type != o.type) p.type = o.type;
                    if (pageHeaders[k].extra != o.extra) p.extra = o.extra?.replaceAll("\\\\", "\\");
                    return p
                } else if (!pageHeaders[k]) {
                    return o
                }
            }).filter((x) => !!x);
            var removeDiff = Object.entries(pageHeaders).map(([k, o]) => {
                if (schemaProps[k] &&
                    (schemaProps[k].name != o.name
                        || schemaProps[k].required != o.required
                        || schemaProps[k].type != o.type
                        || schemaProps[k].extra != o.extra)
                ) {
                    var p = {
                        name: o.name
                    };
                    if (schemaProps[k].required != o.required) p.required = o.required;
                    if (schemaProps[k].type != o.type) p.type = o.type;
                    if (schemaProps[k].extra != o.extra) p.extra = o.extra?.replaceAll("\\\\", "\\");
                    return p
                } else if (!schemaProps[k]) {
                    return o
                }
            }).filter((x) => !!x);
            console.log(folder, name, "add", addDiff, "remove", removeDiff);
            if (addDiff.length + removeDiff.length) {
                process.exitCode = 1;
                // console.log(folder, name, "add", addDiff, "remove", removeDiff);
                // console.log("findings", folder, name, schemaProps, pageHeaders);
            }
        } else {
            errors.push(`missing ${folder} ${name}`);
            process.exitCode = 1;
        }
    });

    if (errors.length) console.log("errors", errors)

};
main();
