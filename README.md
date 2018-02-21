# kokk 

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

CDN: [UNPKG](https://unpkg.com/kokk/) | [jsDelivr](https://cdn.jsdelivr.net/npm/kokk/) (available as `window.kokk`)

## Usage

```vue
<template>
  <div id="app">
    <kokk>
      <span slot="demo">meow (ฅ>ω<*ฅ)</span>
    </kokk>
  </div>
</template>

<script>
import kokk from 'kokk'

export default {
  components: {
    kokk
  }
}
</script>
```

## Options

### title

Type: `string`<br>
Default: `Basic`

The title of the demo.

### desc

Type: `string`<br>
Default: `Basic`

The description of the demo.

### expandAll

Type: `boolean`<br>
Default: `false`

Whether to expand code.

### highlight

Type: `boolean` `function`<br>
Default: `true`

Whether to highlight code blocks, you can supply a function to customize this, use prismjs to highlight code by default. 

```js
function highlight(code, lang) {}
```

### root

Type: `string`<br>
Default: `./`

The path of the markdown file.

### doc

Type: `string`<br>
Default: `demo.md`

The name of the markdown file.

## Slot

The live demo which you want to display, make sure to use `demo` as the slot name.

Here is a simple example:

```vue
<template>
  <div id="app">
    <kokk root="./docs/">
      <star-rate slot="demo" :value="3"
                 type="star1"/>
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
