# KOKK

[![NPM version](https://img.shields.io/npm/v/kokk.svg?style=flat)](https://npmjs.com/package/kokk) [![NPM downloads](https://img.shields.io/npm/dm/kokk.svg?style=flat)](https://npmjs.com/package/kokk) [![CircleCI](https://circleci.com/gh/luyilin/kokk/tree/master.svg?style=shield)](https://circleci.com/gh/luyilin/kokk/tree/master)

[DEMO](https://kokk.netlify.com/example/dist/)

A [examples page](https://vue-cute-rate.netlify.com/example/dist/) which powered by kokk.

## Introduction

KOKK is a component for Vue.js that fetches a list of Markdown files and renders them as a beautiful one-page documentation.

The design is inspired by [Ant Design](https://ant.design/components/rate/)! I like the elegant design to display a list of examples.

The name is inspired by *Kokkoku* 💃

## Install

```bash
yarn add kokk --save
```

CDN: [UNPKG](https://unpkg.com/kokk/) | [jsDelivr](https://cdn.jsdelivr.net/npm/kokk/) (available as `window.kokk`)

## Quick Start

* import Kokk as a component.

* Then mkdir a directory to the same directory where kokk is imported, the directory defaults to `/docs/`.

* Then populate a main.md in the directory, which is your main markdown file.

* Then populate a list of example markdown files in the directory. And implement the `doc-list` prop. The order of the prop is the display order.

* Then write the live demo as a slot in `<kokk></kokk>`, use `demo-${index}` as the slot name, `index` is the order of the doc in `doc-list`.

## Guide

### What are example docs

Example docs is a list of markdown files that contain the code blocks of the examples' usage. We render the code blocks in the example part of the doc. For example:

```vue
<template>
  <star-rate :value="4"/>
</template>

<script>
import StarRate from 'vue-cute-rate'

export default {
  components: {
    StarRate
  }
}
</script>
```

### Where to show examples

Write `<!-- DEMO -->` on where you want them to be in the main markdown file. Examples will be rendered here. Here is a simple example of main markdown file.

```
## Install

<!-- DEMO -->

## Options

```

### Set the examples' custom title and description

You can use following html comment marks in each example markdown file to set custom title and description of it.

```
<!-- title-start -->

title: Half star

<!-- title-stop -->

<!-- desc-start -->

desc: Support select half star.

<!-- desc-stop -->
```

<!-- DEMO -->

## Options

| Property | Description | type | Default |
| -------- | ----------- | ---- | ------- |
| title-classname | The custom classname of title. The title defaults to the value of h1 title in the main markdown file. | string | - |
| example-title | The title of the example part. | string | Examples |
| root | The path of the markdown file. | string | /docs/ |
| main-doc | The main markdown file. | string | main.md |
| doc-list | Array of the example markdown files. | array | ['demo.md'] |
| highlight | Whether to highlight code blocks, you can supply a function to customize this, use prismjs to highlight code by default. | boolean / function | true |

## Slot

The live demo which you want to display, make sure to use `demo-${index}` as the slot name, `index` is the order of the markdown file in `doc-list`.

Here is a simple example:

```vue
<template>
  <div id="app">
    <kokk :doc-list="['demo.md']">
      <star-rate slot="demo-0" :value="4"/>
    </kokk>
  </div>
</template>

<script>
import Kokk from 'kokk'
import StarRate from 'vue-cute-rate'

export default {
  components: {
    Kokk,
    StarRate
  }
}
</script>
```

## License

MIT &copy; [luyilin](https://github.com/luyilin)

> [minemine.cc](https://minemine.cc) · GitHub [@luyilin](https://github.com/luyilin) · Twitter [@luyilin12](https://twitter.com/luyilin12)
