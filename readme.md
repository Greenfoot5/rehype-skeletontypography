# rehype-skeletontypography

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]

**[rehype][]** plugin to add skeleton.dev typography classes.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`unified().use(rehypeSkeleton[, options])`](#unifieduserehypeskeletontypography-options)
    *   [`Options`](#options)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [License](#license)

## What is this?

This package is a [unified][] ([rehype][]) plugin to add skeleton.dev typography classes.
It looks for tags that have a skeleton.dev typography class and adds it.
The algorithm that does this is [`github-slugger`][github-slugger], which
matches how GitHub works.

**unified** is a project that transforms content with abstract syntax trees
(ASTs).
**rehype** adds support for HTML to unified.
**hast** is the HTML AST that rehype uses.
This is a rehype plugin to add skeleton.dev typography classes.

## When should I use this?

If you are using [skeleton.dev's typography](https://www.skeleton.dev/docs/svelte/design/typography)
and want it automatically included

## Install

This package is [ESM only][esm].
In Node.js (version 16+), install with [npm][]:

```sh
pnpm install rehype-skeletontypography
```

In Deno with [`esm.sh`][esmsh]:

```js
import rehypeSkeleton from 'https://esm.sh/rehype-skeletontypography@1'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import rehypeSkeleton from 'https://esm.sh/rehype-skeletontypography@1?bundle'
</script>
```

## Use

Say we have the following file `example.html`:

```html
<h1 class="some-class">Lorem ipsum</h1>
<h2>Dolor sit amet 😪</h2>
<h3>consectetur &amp; adipisicing</h3>
<pre>elit</pre>
<h5>elit</h5>
```

…and our module `example.js` looks as follows:

```js
import {read} from 'to-vfile'
import {rehype} from 'rehype'
import rehypeSkeleton from 'rehype-skeletontypography'

const file = await rehype()
  .data('settings', {fragment: true})
  .use(rehypeSkeleton)
  .process(await read('example.html'))

console.log(String(file))
```

…then running `node example.js` yields:

```html
<h1 class="some-class h1">Lorem ipsum</h1>
<h2 class="h2">Dolor sit amet 😪</h2>
<h3 class="h3">consectetur &#x26; adipisicing</h3>
<pre class="pre">elit</pre>
<h5 class="h5">elit</h5>
```

## API

This package exports no identifiers.
The default export is [`rehypeSkeleton`][api-rehype-skeletontypography].

### `unified().use(rehypeSlug[, options])`

Add classes to tags.

###### Parameters

*   `options` ([`Options`][api-options], optional)
    — configuration

###### Returns

Transform ([`Transformer`][unified-transformer]).

### `Options`

Configuration (TypeScript type).

###### Fields

*   `prefix` (`string`, default: `''`)
    — prefix to add in front of class names

## Types

This package is fully typed with [TypeScript][].
It exports the additional type [`Options`][api-options].

## Compatibility

Projects maintained by the unified collective are compatible with maintained
versions of Node.js.

When we cut a new major release, we drop support for unmaintained versions of
Node.
This means we try to keep the current release line, `rehype-skeletontypography@^1`,
compatible with Node.js 20.

This plugin works with `rehype-parse` version 1+, `rehype-stringify` version 1+,
`rehype` version 1+, and `unified` version 4+.

## Security

Use of `rehype-skeletontypography` can open you up to a [cross-site scripting (XSS)][xss]
attack as it sets class attributes on headings, which causes what is known
as “DOM clobbering”.
Please use [`rehype-sanitize`][rehype-sanitize] and see its
[Example: headings (DOM clobbering)][rehype-sanitize-example] for information on
how to properly solve it.

## License

[MIT][license] © [Greenfoot5][author]

<!-- Definitions -->

[build-badge]: https://github.com/greenfoot5/rehype-skeletontypography/workflows/main/badge.svg

[build]: https://github.com/greenfoot5/rehype-seketontypography/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/greenfoot5/rehype-skeletontypography

[coverage]: https://codecov.io/github/greenfoot5/rehype-skeletontypography

[downloads-badge]: https://img.shields.io/npm/dm/rehype-skeletontypograhy.svg

[downloads]: https://www.npmjs.com/package/rehype-skeletontypography

[size-badge]: https://img.shields.io/bundlejs/size/rehype-skeletontypography

[size]: https://bundlejs.com/?q=rehype-skeletontypography

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[npm]: https://docs.npmjs.com/cli/install

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[license]: license

[author]: https://harvey.alchemix.dev

[github-slugger]: https://github.com/Flet/github-slugger

[rehype]: https://github.com/rehypejs/rehype

[rehype-autolink-headings]: https://github.com/rehypejs/rehype-autolink-headings

[rehype-sanitize]: https://github.com/rehypejs/rehype-sanitize

[rehype-sanitize-example]: https://github.com/rehypejs/rehype-sanitize#example-headings-dom-clobbering

[typescript]: https://www.typescriptlang.org

[unified]: https://github.com/unifiedjs/unified

[unified-transformer]: https://github.com/unifiedjs/unified#transformer

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[api-options]: #options

[api-rehype-skeletontypography]: #unifieduserehypeskeletontypography-options
