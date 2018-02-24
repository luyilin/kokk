<template>
  <div class="main">
    <div class="content" v-html="html"></div>
    <h2 class="demo-title">
      {{ title }}
      <svg @click="expandAll = !expandAll"
           t="1519462199298" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2155" xmlns:xlink="http://www.w3.org/1999/xlink"><defs></defs><path d="M411.485726 111.200056H138.199901a43.350032 43.350032 0 0 0-43.350032 43.350032v273.2786a43.350032 43.350032 0 0 0 43.350032 43.350032h273.285825a43.350032 43.350032 0 0 0 43.350032-43.350032V154.550088a43.350032 43.350032 0 0 0-43.350032-43.350032zM879.384294 111.200056H606.105694a43.350032 43.350032 0 0 0-43.350032 43.350032v273.2786a43.350032 43.350032 0 0 0 43.350032 43.350032h273.2786a43.350032 43.350032 0 0 0 43.350032-43.350032V154.550088a43.350032 43.350032 0 0 0-43.350032-43.350032zM411.485726 554.844281H138.199901a43.350032 43.350032 0 0 0-43.350032 43.350032v273.285825a43.350032 43.350032 0 0 0 43.350032 43.350032h273.285825a43.350032 43.350032 0 0 0 43.350032-43.350032V598.194313a43.350032 43.350032 0 0 0-43.350032-43.350032zM879.384294 554.844281H606.105694a43.350032 43.350032 0 0 0-43.350032 43.350032v273.285825a43.350032 43.350032 0 0 0 43.350032 43.350032h273.2786a43.350032 43.350032 0 0 0 43.350032-43.350032V598.194313a43.350032 43.350032 0 0 0-43.350032-43.350032z" fill="#515151" p-id="2156"></path></svg>
    </h2>
    <div class="examples">
      <div class="left" v-for="i, index in leftDoc">
        <demo :expandAll="expandAll" :doc="i"
              :root="root" :highlight="highlight"
              :length="docList.length">
          <slot :name="demoIndex('left', index)"
                :slot="demoIndex('left', index)"/>
        </demo>
      </div>
      <div class="right" v-for="i, index in rightDoc">
        <demo :expandAll="expandAll" :doc="i"
              :root="root" :highlight="highlight"
              :length="docList.length">
          <slot :name="demoIndex('right', index)"
                :slot="demoIndex('right', index)"/>
        </demo>
      </div>
    </div>
    <div class="content" v-html="htmlAfter"></div>
  </div>
</template>

<script>
  import Demo from './demo.vue'
  import fetch from 'unfetch'
  import marked from 'marked3'
  import highlight from './utils/highlight'

  export default {
    name: 'Kokk',

    props: {
      title: {
        type: String,
        default: 'Examples'
      },
      titleclassName: {
        type: String,
        default: ''
      },
      root: {
        type: String,
        default: '/docs/'
      },
      docList: {
        type: Array,
        default: () => {
          return ['demo.md']
        }
      },
      indexDoc: {
        type: String,
        default: 'index.md'
      },
      highlight: {
        type: [Boolean, Function],
        default: true
      },
      demoOrder: {
        type: Number,
        default: 3
      }
    },

    data () {
      return {
        expandAll: false,
        html: '',
        htmlAfter: ''
      }
    },

    computed: {
      leftDoc () {
        return this.docList.filter((i, index) => {
          if (index % 2 === 0) return i
        })
      },
      rightDoc () {
        return this.docList.filter((i, index) => {
          if (index % 2 !== 0) return i
        })
      }
    },

    async created () {
      const content = await fetch(`${this.root}${this.indexDoc}`).then(res => res.text())
      const highlightFn = typeof this.highlight === 'function' ? this.highlight : highlight
      const renderer = new marked.Renderer()
      const orginalHeading = renderer.heading.bind(renderer)
      renderer.heading = (text, depth, raw) => {
        if (depth === 1) {
          text = `<span class="${this.titleclassName}">${text}</span>`
        }
        return orginalHeading(text, depth, raw)
      }
      let DemoExist = 0
      const DEMO_START = /^<!--\s*DEMO\s*-->/
      const DEMO_HOLDER = '#!!!DEMO-start!!!'
      renderer.html = html => {
        if (DEMO_START.test(html)) {
          DemoExist++
          return DEMO_HOLDER + DemoExist
        }
        return html
      }

      let html = marked(content, {
        renderer,
        highlight: this.highlight && highlightFn
      })

      if (DemoExist) {
        const RE = new RegExp(`${DEMO_HOLDER}1([\\s\\S]*)`, 'gi')
        let arr = html.split(RE)
        html = arr[0]
        this.htmlAfter = arr[1]
      }

      this.html = html
    },

    components: {
      Demo
    },

    methods: {
      demoIndex (i, index) {
        return 'demo-' + (i === 'left' ? 2 * index : 2 * index + 1)
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
    @media only screen and (max-width: 768px) {
      width: 100%;
      padding: 0 25px;
      box-sizing: border-box;
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
    .examples {
      margin: 0 -8px;
      display: inline-block;
      width: 100%;
      .left, .right {
        width: 50%;
        display: inline-block;
        float: left;
        padding: 0 8px;
        box-sizing: border-box;
        @media only screen and (max-width: 768px) {
          float: none;
          width: 100%;
        }
      }
    }
  }

  h1 {
    font-size: 52px;
    line-height: 2;
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
</style>
