# mdast-util-from-span-markdown

The aim of this repo is to have a minimalistic parser (TypeScript) for [span elements](https://daringfireball.net/projects/markdown/syntax#span) written in [markdown](https://daringfireball.net/projects/markdown/syntax) syntax.  
The output is an abstract syntax tree mostly compatible to [mdast](https://github.com/syntax-tree/mdast).

## Install

```bash
npm i mdast-util-from-span-markdown
```

## Use

```js
import fromMarkdown from "mdast-util-from-span-markdown";
const md = "Say **Hello** [World](https://example.com) in `code`! *Thanks!*";

fromMarkdown(md);
```

## Return

```js
[
  {
    type: "text",
    value: "Say ",
  },
  {
    type: "strong",
    children: [
      {
        type: "text",
        value: "Hello",
      },
    ],
  },
  {
    type: "text",
    value: " ",
  },
  {
    type: "link",
    url: "https://example.com",
    children: [
      {
        type: "text",
        value: "World",
      },
    ],
  },
  {
    type: "text",
    value: " in ",
  },
  {
    type: "inlineCode",
    value: "code",
  },
  {
    type: "text",
    value: "! ",
  },
  {
    type: "emphasis",
    children: [
      {
        type: "text",
        value: "Thanks!",
      },
    ],
  },
];
```

## Technical decission

1. The code has to be as small as possible (regex instead of regular parsing)
2. The output has to be as «correct» as possible according to [mast specs](https://github.com/syntax-tree/mdast) and [CommonMark](https://commonmark.org/)

## Why

Because this is not a full markdown parser (see [remark](https://github.com/remarkjs/remark) otherwise) with support for block elements, this code is especially handy for «one-line markdown». Think for example about translations comming from a system that does not support rich text formatting.

## Render
If you like to render the output of `fromMarkdown()` in a frontend-framework have a look at the [`examples/md.tsx`](./examples/md.tsx) for react or [`examples/md.vue`](./examples/md.vue) for vue.  
The examples are not included in the npm-package. You need to get a copy of the example and adjust it to your needs:

```sh
# react
curl https://raw.githubusercontent.com/signalwerk/mdast-util-from-span-markdown/main/examples/md.tsx > md.tsx

# vue
curl https://raw.githubusercontent.com/signalwerk/mdast-util-from-span-markdown/main/examples/md.vue > md.vue
```

## Thank you

- [TypeScript + Node.js Project Boilerplate](https://github.com/metachris/typescript-nodejs-boilerplate)
