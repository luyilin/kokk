# KOKK

[![NPM version](https://img.shields.io/npm/v/kokk.svg?style=flat)](https://npmjs.com/package/kokk) [![NPM downloads](https://img.shields.io/npm/dm/kokk.svg?style=flat)](https://npmjs.com/package/kokk) [![CircleCI](https://circleci.com/gh/luyilin/kokk/tree/master.svg?style=shield)](https://circleci.com/gh/luyilin/kokk/tree/master)

[DEMO](https://kokk.netlify.com/example/dist/)

A [examples page](https://vue-cute-rate.netlify.com/example/dist/) which powered by kokk.

## Introduction

A beautiful way to display a demo and the usage from markdown.

The design is inspired by [Ant Design](https://ant.design/)! I like the elegant design to display a demo.

The name is inspired by *Kokkoku* 💃

## Install

```bash
yarn add kokk --save
```

<!-- DEMO -->

## Options

| Property | Description | type | Default |
| -------- | ----------- | ---- | ------- |
| title-classname | The custom classname of title. The title defaults to the value of h1 title in the index markdown file. | string | '' |
| demo-title | The title of the demo part. | string | 'Examples' |
| root | The path of the markdown file. | string | '/docs/' |
| index-doc | The main markdown file. | string | 'index.md' |
| doc-list | Array of the example markdown files. | boolean | true |
| highlight | Whether to highlight code blocks, you can supply a function to customize this, use prismjs to highlight code by default. | boolean / function | true |

## Slot

The live demo which you want to display, make sure to use `demo-${index}` as the slot name.

Make sure to use the same index as the order of the makedown file in docList.

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
import kokk from '../src'
import StarRate from 'vue-cute-rate'

export default {
  components: {
    kokk,
    StarRate
  }
}
</script>
```

## License

MIT &copy; [luyilin](https://github.com/luyilin)

> [minemine.cc](https://minemine.cc) · GitHub [@luyilin](https://github.com/luyilin) · Twitter [@luyilin12](https://twitter.com/luyilin12)
