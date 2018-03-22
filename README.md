# KOKK

[![NPM version](https://img.shields.io/npm/v/kokk.svg?style=flat)](https://npmjs.com/package/kokk) [![NPM downloads](https://img.shields.io/npm/dm/kokk.svg?style=flat)](https://npmjs.com/package/kokk) 

[DEMO](https://luyilin.github.io/kokk/)

Here is another [DEMO](https://kokk.netlify.com/) which insert a component into the doc, the source code is in ```examples/insertComponent```.

<!-- show-on-kokk
[Github](https://github.com/luyilin/kokk)
-->

A [doc](https://vue-cute-rate.netlify.com) for vue-cute-rate which powered by kokk.

## Introduction

KOKK is a tool that fetches a Markdown file and renders it as a beautiful one-page documentation.

More than this, you can insert a vue component into the doc. In this [example](https://vue-cute-rate.netlify.com), it use [vue-juri](https://github.com/luyilin/vue-juri) to insert two demos of [vue-cute-rate](https://github.com/luyilin/vue-cute-rate) into the doc, seems cool, right? 😉

The design is inspired by [Ant Design](https://ant.design/components/rate/)! I like the elegant way to display a documentation.

The name is inspired by *Kokkoku* 💃

## Install

```
yarn add kokk --save
```

CDN: [UNPKG](https://unpkg.com/kokk/) | [jsDelivr](https://cdn.jsdelivr.net/npm/kokk/) (available as `window.Kokk`)

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

### Hide content in documentation

If you want to display some part on GitHub while keeping it invisible in kokk, you can use following html comment marks:

```

<!-- hide-on-kokk-start -->

This part is not visible while viewing as a kokk website.

<!-- hide-on-kokk-stop -->

```

For example, you can see an image down below while [viewing on GitHub](https://github.com/luyilin/kokk#hide-content-in-documentation).

<!-- hide-on-kokk-start -->

![hide-image](https://wx4.sinaimg.cn/mw690/a2117cdbly1fplz04usrhj20go09d45v.jpg)

<!-- hide-on-kokk-stop -->

### Show content in documentation

If you want to hide some part on GitHub while keeping it visible in kokk, you can use following html comment marks:

```
<!-- show-on-kokk
This part is not visible on github, as it's html comment :)
But it's visible on your kokk website.
All markdown features except html comments are supported here.
-->
```

If you're on the kokk website, you can see an image down below.

<!-- show-on-kokk
![hide-image](https://wx4.sinaimg.cn/mw690/a2117cdbly1fplz04usrhj20go09d45v.jpg)
-->

<!-- DEMO -->

## API

### Constructor

```
const doc = new Kokk(options)
```

#### Options

| Property | Description | type | Default |
| -------- | ----------- | ---- | ------- |
| root | The path of the markdown file. | string | ./ |
| mainDoc | The main markdown file. | string | README.md |
| titleClassname | The custom classname of title. The title defaults to the value of h1 title in the main markdown file. | string | - |
| highlight | Whether to highlight code blocks, you can supply a function to customize this, use prismjs to highlight code by default. | boolean / function | true |
| loadingColor | The color of the loading component. | string | #7175b1 |

For ```root```, in many cases you already have ```README.md``` in your repo, there is no need to populate another file at  ```./```, just use a markdown file from url directly, like this
```
const doc = new Kokk({
  root: 'https://raw.githubusercontent.com/luyilin/kokk/master/',
})
```

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
