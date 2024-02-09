# Aklivity Zilla Docs

<!-- markdownlint-disable -->
<div align="center">
  <img src="./src/.vuepress/public/logo.png#gh-light-mode-only" height="100">
  <img src="./src/.vuepress/public/logo-dark.png#gh-dark-mode-only" height="100">
</div>

</br>
<h1 align="center">Event-driven API Gateway</h1>

<div align="center">
 
  [![Build Status][build-status-image]][build-status]
  [![Slack Community][community-image]][community-join]
 
</div>

<h3 align="center">
  <a href="https://docs.aklivity.io/zilla/"><b>Documentation</b></a> &bull;
  <a href="https://docs.aklivity.io/zilla/latest/guides/install/"><b>Get Started</b></a> &bull;
  <a href="https://github.com/aklivity/zilla-examples"><b>Examples</b></a> &bull;
  <a href="https://www.aklivity.io/blog"><b>Blog</b></a> 
</h3>
<!-- markdownlint-restore -->

This repository contains the documentation website code and Markdown source files for [docs.aklivity.io/zilla/](https://docs.aklivity.io/zilla/).

## Contributing Guide

Before submitting your contribution, please read through the following guide. We also suggest you read the [Writing Guide](./.github/contributing/writing-guide.md) in this repo.

### Repo Setup

To develop locally, fork this repository and clone it in your local machine. Then run these commands from the root directory:

```sh
pnpm i
```

```sh
pnpm dev
```

### Running Lints

- Markdown linting

  run:

  ```sh
  pnpm lint
  ```

- Spelling, grammar, and style lints

  Install [Vale](https://github.com/errata-ai/vale) then run:

  ```sh
  vale src
  ```

  ```sh
  vale --ignore-syntax src/.vuepress/sidebar/en.ts
  ```

- Link checking

  Install [Lychee](https://github.com/lycheeverse/lychee) then run:

  ```sh
  lychee --exclude-mail src
  ```

  Running compiled site link checking:

  ```sh
  pnpm link-checker && lychee --exclude-mail --base="src/.vuepress/dist" src/.vuepress/dist
  ```

### Reference docs Structure

Pages in the reference section describe, as briefly as possible and in an orderly way, the properties and interface of a feature.

- h1(#) - Title
  - Include description and Full example codeblock
- h2(##) - Page section
- h3-6 - Properties
  - h3(###) - Top level
    - Top level props should(not mandatory) include an addition codeblock example including the entire example
  - h4-6 - Header level correlates with path depth
  - Child property headers reference the parent
    - `#### parent.child`
  - Arrays of objects have brackets `[]` only when describing child properties
    - `#### parentArray[].child`

Table of Contents (ToC) anchor links are generated using the [Markdown All in One](https://markdown-all-in-one.github.io/docs/guide/table-of-contents.html#overview) extension with the `gitea` slug mode.

- Required props have an escaped splat `\*` at the end of the header and ToC link
  - `### topLevelProp\*`
  - `- [topLevelProp\*](#toplevelprop)`

````markdown
# Title

Description.

```yaml
topLevelProp:
  child: example
array:
  - one
  - two
parentArray:
  - child: one
  - child: two
```

## Section

:::: note ToC

- [topLevelProp\*](#toplevelprop)
  - [topLevelProp.child\*](#toplevelprop-child)
- [array](#array)
- [parentArray](#parentarray)
  - [parentArray\[\].child](#parentarray-child)

::: right
\* required
:::

::::

### topLevelProp\*

> `object`

Description.

```yaml
topLevelProp:
  child: example
```

#### topLevelProp.child\*

> `type` | Default: `value`

Description.

### array

> `array` of `primitive`

Description.

```yaml
array:
  - one
  - two
```

### parentArray

> `array` of `object`

Description.

```yaml
parentArray:
  - child: one
  - child: two
```

#### parentArray[].child

> `type`

Description.

````

## Provide feedback

We’d love to hear your feedback. Please file documentation issues only in the docs GitHub repository. You can file a new issue to suggest improvements or if you see any errors in the existing documentation.

Every page has an `Edit this page on GitHub` link at the bottom for you to check the page source and report specific issues.

## Copyright and license

Copyright Aklivity, Inc. 2023, released under the [Apache 2.0 license](https://github.com/aklivity/zilla/blob/main/LICENSE).

[build-status-image]: https://github.com/aklivity/zilla/workflows/build/badge.svg
[build-status]: https://github.com/aklivity/zilla/actions
[community-image]: https://img.shields.io/badge/slack-@aklivitycommunity-blue.svg?logo=slack
[community-join]: https://www.aklivity.io/slack
