# KOKK

[![NPM version](https://img.shields.io/npm/v/kokk.svg?style=flat)](https://npmjs.com/package/kokk) [![NPM downloads](https://img.shields.io/npm/dm/kokk.svg?style=flat)](https://npmjs.com/package/kokk) 

[DEMO](https://luyilin.github.io/kokk/)

[Github](https://github.com/luyilin/kokk)

A [documentation](https://vue-cute-rate.netlify.com/example/dist/) for vue-cute-rate which powered by kokk.

## Introduction

KOKK is a tool that fetches a Markdown file and renders it as a beautiful one-page documentation.

More than this, you can insert a vue component into the doc. In this example, it use [vue-juri](https://github.com/luyilin/vue-juri) to display a list of demos and usages, seems cool, right? 😉

The design is inspired by [Ant Design](https://ant.design/components/rate/)! I like the elegant way to display a documentation.

The name is inspired by *Kokkoku* 💃

## Install

```
yarn add kokk --save
```

CDN: [UNPKG](https://unpkg.com/kokk/) | [jsDelivr](https://cdn.jsdelivr.net/npm/kokk/) (available as `window.kokk`)

## Quick Start

Create an HTML file: `index.html` which will be be homepage of your documentation website:

```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
  <title>My Awesome Doc</title>
</head>
<body>
  <div id="app"></div>
  <!-- Script -->
  <script src="https://unpkg.com/kokk@latest/dist/kokk.js"></script>
  <!-- Start app -->
  <script>
    const doc = new Kokk()
    doc.start('#app')
  </script>
</body>
</html>
```

Then populate a `README.md` file to the same directory where `index.html` is located.

Finally serve this directory as a static website:

E.g. node.js: `npm i -g serve` && `serve ./docs`

## Guide

### Where to add a vue component?

Write `<!-- DEMO -->` on where you want them to be in the main markdown file. Examples will be rendered here. Here is a simple example of main markdown file.

```
## Install

<!-- DEMO -->

## Options

```

### How to add a vue component?

```
const doc = new Kokk()

doc.addComponent({
  order: 4,
  component: () => import('../components/Demo.vue')
})

doc.start('#app')
```

<!-- DEMO -->

## API

### Constructor

```
const doc = new Kokk(options)
```

#### Options

| Property | Description | type | Default |
| -------- | ----------- | ---- | ------- |
| root | The path of the markdown file. | string | /docs/ |
| mainDoc | The main markdown file. | string | README.md |
| titleClassname | The custom classname of title. The title defaults to the value of h1 title in the main markdown file. | string | - |
| highlight | Whether to highlight code blocks, you can supply a function to customize this, use prismjs to highlight code by default. | boolean / function | true |
| loadingColor | The color of the loading component. | string | #7175b1 |

### doc.addComponent(options)

#### Options

| Property | Description | type | Default |
| -------- | ----------- | ---- | ------- |
| title | The title of the example part. | string | Examples |
| order | The order of the example part in the documentation, set this to implement the menu. | number | 3 |
| component | The vue component which you want to import | function | () => {} |

### doc.start(target)

#### target

Type: `string` `HTMLElement`

The place to mount app to.

## Author

KOKK &copy; [luyilin](https://github.com/luyilin), released under the MIT License.

> [minemine.cc](https://minemine.cc) · GitHub [@luyilin](https://github.com/luyilin) · Twitter [@luyilin12](https://twitter.com/luyilin12)
