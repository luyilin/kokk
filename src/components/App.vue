<template>
  <div class="main">
    <loading v-if="loading" :color="loadingColor"/>
    <div v-else>
      <div class="affix">
        <doc-menu :menu="menu" :activeTitle="activeTitle" @toggleJump="toggleJump"/>
      </div>
      <div class="content" ref="content">
        <div v-html="html"></div>
        <h2 class="demo-title" :id="exampleSlug"
            v-if="addComponent">
          <span v-html="exampleTitleWrap"></span>
          <svg @click="expandAll = !expandAll"
               t="1519462199298" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2155" xmlns:xlink="http://www.w3.org/1999/xlink"><defs></defs><path d="M411.485726 111.200056H138.199901a43.350032 43.350032 0 0 0-43.350032 43.350032v273.2786a43.350032 43.350032 0 0 0 43.350032 43.350032h273.285825a43.350032 43.350032 0 0 0 43.350032-43.350032V154.550088a43.350032 43.350032 0 0 0-43.350032-43.350032zM879.384294 111.200056H606.105694a43.350032 43.350032 0 0 0-43.350032 43.350032v273.2786a43.350032 43.350032 0 0 0 43.350032 43.350032h273.2786a43.350032 43.350032 0 0 0 43.350032-43.350032V154.550088a43.350032 43.350032 0 0 0-43.350032-43.350032zM411.485726 554.844281H138.199901a43.350032 43.350032 0 0 0-43.350032 43.350032v273.285825a43.350032 43.350032 0 0 0 43.350032 43.350032h273.285825a43.350032 43.350032 0 0 0 43.350032-43.350032V598.194313a43.350032 43.350032 0 0 0-43.350032-43.350032zM879.384294 554.844281H606.105694a43.350032 43.350032 0 0 0-43.350032 43.350032v273.285825a43.350032 43.350032 0 0 0 43.350032 43.350032h273.2786a43.350032 43.350032 0 0 0 43.350032-43.350032V598.194313a43.350032 43.350032 0 0 0-43.350032-43.350032z" fill="#515151" p-id="2156"></path></svg>
        </h2>
        <component
          :is="exampleComponent"
          :expandAll="expandAll"
          v-if="addComponent"/>
        <div v-html="htmlAfter"></div>
      </div>
    </div>
  </div>
</template>

<script>
import fetch from 'unfetch'
import marked from 'marked3'
import highlight from '../utils/highlight'
import Loading from 'vue-cute-loading'
import slugo from 'slugo'
import DocMenu from './Menu.vue'
import anchorIcon from '!raw-loader!../svg/anchor.svg'
import { findMax, findMin } from '../utils/index'
import throttle from 'throttleit'

export default {
  name: 'Kokk',
  props: ['config', 'component'],
  data () {
    let {titleClassname, root, mainDoc, highlight, loadingColor} = this.config
    let {addComponent, title, order, component} = this.component
    return {
      expandAll: false,
      html: '',
      htmlAfter: '',
      loading: true,
      menu: [],
      hash: '',
      activeTitle: '',
      jumping: false,
      titleClassname: titleClassname,
      root: root,
      mainDoc: mainDoc,
      highlight: highlight,
      addComponent: addComponent,
      loadingColor: loadingColor,
      exampleTitle: title,
      exampleOrder: order,
      exampleComponent: component
    }
  },

  computed: {
    exampleSlug () {
      return slugo(this.exampleTitle)
    },
    exampleTitleWrap () {
      return `<a class="Anchor" href="#${slugo(this.exampleTitle)}">${anchorIcon}</a>${this.exampleTitle}`
    }
  },

  async created () {
    const content = await fetch(`${this.root}${this.mainDoc}`).then(res => res.text())
    const highlightFn = typeof this.highlight === 'function' ? this.highlight : highlight
    const renderer = new marked.Renderer()
    const orginalHeading = renderer.heading.bind(renderer)
    const menu = []
    let addComponent = this.addComponent

    let DemoExist = 0
    const DEMO_START = /^<!--\s*DEMO\s*-->/
    const DEMO_HOLDER = '## DEMO-start'
    renderer.html = html => {
      if (DEMO_START.test(html)) {
        DemoExist++
        return DEMO_HOLDER
      }
      return html
    }

    renderer.heading = (text, depth, raw) => {
      if (depth === 1 && this.titleClassname) {
        text = `<span class="${this.titleClassname}">${text}</span>`
      }
      const slug = slugo(raw)
      if (depth === 2) {
        menu.push({
          title: text,
          slug
        })
      }
      text = `<a class="Anchor" href="#${slug}">${anchorIcon}</a>${text}`
      return orginalHeading(text, depth, raw)
    }

    let html = marked(content, {
      renderer,
      highlight: this.highlight && highlightFn
    })

    if (DemoExist) {
      const RE = new RegExp(`${DEMO_HOLDER}`, 'gi')
      if (addComponent) {
        let arr = html.split(RE)
        html = arr[0]
        this.htmlAfter = arr[1]

        menu.splice(this.exampleOrder, 0, {
          title: this.exampleTitle,
          slug: slugo(this.exampleTitle)
        })
      } else {
        html = html.replace(RE, '')
      }
    }

    this.html = html
    this.menu = menu
    this.loading = false
  },

  mounted () {
    this.scrollSpy()
  },

  components: {
    Loading,
    DocMenu
  },

  methods: {
    scrollSpy() {
      const handleScroll = () => {
        const headings = document.querySelectorAll('h2')
        if (this.jumping || headings.length === 0) {
          return
        }
        const els = [...headings].map(heading => {
          return {
            top: heading.getBoundingClientRect().top,
            id: heading.id
          }
        })
        const lastNegative = findMax(els.filter(el => el.top < 0), 'top')[0]
        const firstPositive = findMin(els.filter(el => el.top > 0), 'top')[0]

        let el = {}
        if (lastNegative && firstPositive && firstPositive.top > 100) {
          el = lastNegative
        } else if (firstPositive) {
          el = firstPositive
        } else {
          el = els[els.length - 1]
        }
        if (el.id) {
          this.activeTitle = el.id
        }
      }
      document.addEventListener('scroll', throttle(handleScroll, 300))
    },
    toggleJump (i) {
      this.jumping = i
    }
  }
}
</script>

<style src="prismjs/themes/prism-coy.css"></style>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --ease: cubic-bezier(.82, 0, .12, 1);
  --width: 800px;
  --header-height: 400px;

  --dark: #000;
  --blue: #3584de;
  --light-gray: #fafafa;

  --bg: #fff;
  --fg: #868E96;
  --fg-dark: #212529;

  --selection-bg: var(--blue);
  --selection-fg: white;
}

body {
  margin: 0;
  font: 16px/1.4 -apple-system, BlinkMacSystemFont,
  "Segoe UI", "Roboto", "Oxygen",
  "Ubuntu", "Cantarell", "Fira Sans",
  "Droid Sans", "Helvetica Neue", sans-serif;
  font-weight: 300;
}

.main {
  width: 72%;
  margin: 10px auto;
  padding-bottom: 60px;
  margin-right: 140px;
  @media only screen and (max-width: 768px) {
    width: 100%;
    padding: 0 25px;
    box-sizing: border-box;
    & .affix {
      display: none;
    }
    & .content {
      padding-right: 0 !important;
    }
  }
  .content {
    padding-right: 50px;
  }
  .affix {
    position: fixed;
    top: 20px;
    right: 30px;
    width: 110px;
  }
  .demo-title {
    margin-bottom: 65px;
    svg {
      color: #555;
      width: 15px;
      vertical-align: middle;
      cursor: pointer;
    }
  }
}

h1 {
  line-height: 2;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 68px;
  font-weight: 100;
  letter-spacing: 3px;
}

h2, h3, h4 {
  margin-top: 65px;
  margin-bottom: 0;
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.5rem;
  color: var(--fg-dark);
}

h2 {
  margin-top: 70px;
  padding-top: 20px;
  font-size: 1.5rem;
}

h2:first-child {
  /*margin-top: 0;*/
  /*padding-top: 0;*/
}

.highlightFirstParagraph h2 + p {
  font-size: 1.6rem;
  line-height: 1.6;
}

h2 + iframe, h3 + iframe, h4 + iframe {
  margin-top: 25px;
}

a {
  color: inherit;
  text-decoration: none;
}

p {
  margin: 25px 0;
  line-height: 1.6;
}

li strong,
p strong {
  color: var(--fg-dark);
  font-weight: 500;
}

li a,
p a {
  color: var(--blue);
  font-weight: 400;
  padding-bottom: 3px;
  border-bottom: 1px dotted #ddd;
}

li a:hover,
p a:hover {
  border-bottom: none;
}

ul {
  margin: 30px 0 30px 30px;
  padding: 0;
}

ul ul {
  margin: 10px 0 10px 30px;
}

ul li {
  margin: 5px 0;
  line-height: 1.5em;
}

ul li strong {
  font-weight: 500;
}

img {
  max-width: 100%;
}

pre {
  background: transparent;
  border: 1px solid #f0f0f0;
  padding: 30px;
  border-radius: 2px;
  overflow-x: auto;
  font: "Source Code Pro", Menlo, monospace;
  font-size: .8em;
  line-height: 1.5em;
  margin: 40px 0;
}

code {
  font-family: Menlo, Monaco, "Lucida Console", "Liberation Mono", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Courier New", monospace, serif;
}

li > code,
p > code {
  border: 1px solid #DEE2E6;
  font-size: 0.75rem;
  padding: 3px 10px;
  border-radius: 3px;
  white-space: nowrap;
  font-weight: 600;
  font-family: inherit;
}

hr {
  border: none;
  background-color: #f9f9f9;
  height: 1px;
  margin: 25px 0;
  height: 1px;
}

table {
  display: block;
  width: 100%;
  overflow: auto;
  border-spacing: 0;
  border-collapse: collapse;
  margin-top: 30px;
}
tr {
  background-color: #fff;
  border-top: 1px solid #c6cbd1;
}
th, td {
  padding: 13px 15px;
  border: 1px solid #dfe2e5;
}
th {
  font-weight: 600;
}
table tr:nth-child(2n) {
  background-color: #f6f8fa;
}
.Anchor {
  position: relative;
  margin-left: -14px;
  opacity: 0.35;
  display: inline-block;
  width: 14px;
  height: 14px;
  visibility: hidden;
}

.Anchor:hover {
  opacity: 1;
}

.Anchor svg {
  position: absolute;
  right: 5px;
  top: 0;
}

h2:hover .Anchor,
h3:hover .Anchor,
h4:hover .Anchor {
  visibility: visible;
}
</style>
