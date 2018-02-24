<template>
  <div class="box" :class="{expand: codeExpand}">
    <div class="box-demo">
      <slot :name="slotName"/>
    </div>
    <div class="box-meta">
      <div class="box-title">
        <a>{{ docTitle }}</a>
      </div>
      <p>{{ docDesc }}</p>
      <span class="expand-icon btn-hover btn-hover-slide" :data-tip="tip">
        <img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg"
             :class="iconShow"
             @click="handleCodeExpand">
        <img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg"
             :class="iconHide"
             @click="handleCodeExpand">
      </span>
    </div>
    <div class="code" v-html="html"/>
  </div>
</template>

<script>
  import fetch from 'unfetch'
  import marked from 'marked3'
  import highlight from './utils/highlight'

  export default {
    name: 'Demo',

    props: {
      title: {
        type: String,
        default: ''
      },
      desc: {
        type: String,
        default: ''
      },
      expandAll: {
        type: Boolean,
        default: false
      },
      highlight: {
        type: [Boolean, Function],
        default: true
      },
      root: {
        type: String,
        default: '/docs/'
      },
      doc: {
        type: String,
        default: 'demo.md'
      },
      slotName: {
        type: String,
        default: 'demo-0'
      }
    },

    data () {
      return {
        codeExpand: this.expandAll,
        html: '',
        tip: 'show code',
        docTitle: this.title,
        docDesc: this.desc
      }
    },

    computed: {
      iconShow () {
        return this.codeExpand ? 'icon-hide' : 'icon-show'
      },
      iconHide () {
        return this.codeExpand ? 'icon-show' : 'icon-hide'
      }
    },

    watch: {
      expandAll(i) {
        this.codeExpand = i
      }
    },

    async created () {
      const content = await fetch(`${this.root}${this.doc}`).then(res => res.text())
      const renderer = new marked.Renderer()
      const highlightFn = typeof this.highlight === 'function' ? this.highlight : highlight

      let titleExist = 0
      let descExist = 0
      const TITLE_START = /^<!--\s*title-start\s*-->/
      const TITLE_STOP = /^<!--\s*title-stop\s*-->/
      const TITLE_START_HOLDER = '#!!!title-start!!!'
      const TITLE_STOP_HOLDER = '#!!!title-stop!!!'
      const DESC_START = /^<!--\s*desc-start\s*-->/
      const DESC_STOP = /^<!--\s*desc-stop\s*-->/
      const DESC_START_HOLDER = '#!!!desc-start!!!'
      const DESC_STOP_HOLDER = '#!!!desc-stop!!!'
      renderer.html = html => {
        if (TITLE_START.test(html)) {
          titleExist++
          return TITLE_START_HOLDER
        }
        if (TITLE_STOP.test(html)) {
          return TITLE_STOP_HOLDER
        }
        if (DESC_START.test(html)) {
          descExist++
          return DESC_START_HOLDER
        }
        if (DESC_STOP.test(html)) {
          return DESC_STOP_HOLDER
        }
        return html
      }

      let html = marked(content, {
        renderer,
        highlight: this.highlight && highlightFn
      })

      const TAG_RE = new RegExp(`<\\S*>`, 'gi')
      if (titleExist || descExist) {
        const TITLE_RE = new RegExp(`${TITLE_START_HOLDER}([\\s\\S]*)${TITLE_STOP_HOLDER}`, 'gi')
        this.docTitle = (html.match(TITLE_RE))[0].replace(TITLE_START_HOLDER, '').replace(TITLE_STOP_HOLDER, '')
          .replace(TAG_RE, '').split(':')[1]
        html = html.replace(TITLE_RE, '')
      }
      if (descExist) {
        const DESC_RE = new RegExp(`${DESC_START_HOLDER}([\\s\\S]*)${DESC_STOP_HOLDER}`, 'gi')
        this.docDesc = (html.match(DESC_RE))[0].replace(DESC_START_HOLDER, '').replace(DESC_STOP_HOLDER, '')
          .replace(TAG_RE, '').split(':')[1]
        html = html.replace(DESC_RE, '')
      }
      this.html = html
    },

    methods: {
      handleCodeExpand () {
        this.codeExpand = !this.codeExpand
        this.tip = this.tip === 'show code' ? 'hide code' : 'show code'
      }
    }
  }
</script>

<style src="prismjs/themes/prism-coy.css"></style>

<style lang="scss">
  .box {
    border: 1px solid #ebedf0;
    border-radius: 2px;
    display: inline-block;
    width: 100%;
    position: relative;
    margin: 0 0 16px;
    transition: all .2s;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
    color: #314659;
    .box-demo {
      border-bottom: 1px solid #ebedf0;
      padding: 42px 24px 50px;
    }
    .box-meta {
      position: relative;
      padding: 18px 32px;
      border-radius: 0 0 2px 2px;
      font-size: 14px;
      line-height: 2;
      .box-title {
        position: absolute;
        top: -14px;
        padding: 1px 8px;
        margin-left: -8px;
        color: #777;
        border-radius: 2px 2px 0 0;
        background: #fff;
        a {
          color: #314659;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        }
      }
      .expand-icon {
        position: absolute;
        right: 16px;
        bottom: 23px;
        cursor: pointer;
        width: 16px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        img {
          transition: all 0.4s;
          user-select: none;
          position: absolute;
          left: 0;
          top: 0;
          margin: 0;
          max-width: 100%;
          vertical-align: baseline;
          box-shadow: none;
        }
        &:hover .icon-show {
          opacity: 1;
        }
        .icon-show {
          opacity: 0.55;
          pointer-events: auto;
        }
        .icon-hide {
          opacity: 0;
          pointer-events: none;
        }
      }
    }
    .code {
      display: none;
      overflow: auto;
      border-radius: 0 0 2px 2px;
      pre {
        margin: 0;
        border: none;
        padding: 10px;
      }
    }
    &.expand .box-meta {
      border-radius: 0;
      border-bottom: 1px dashed #ebedf0;
    }
    &.expand .code {
      display: block;
    }
    a {
      outline: none;
      text-decoration: none;
    }
    code {
      display: block;
      line-height: 1.5;
      padding: 16px 32px;
      border-radius: 2px;
      font-size: 14px;
      white-space: pre;
      font-family: Menlo, Monaco, "Lucida Console", "Liberation Mono", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Courier New", monospace, serif;
    }
    .btn-hover {
      display: inline-block;
      color: #fff;
      outline: none;
      border: none;
      cursor: pointer;
      position: relative;
    }
    .btn-hover:hover {
      opacity: 1;
    }
    .btn-hover:before,
    .btn-hover:after {
      position: absolute;
      opacity: 0;
      pointer-events: none;
      left: 50%;
      transform: translate(-50%, -13px);
      transition: all .08s ease-out;
      z-index: 2;
    }
    .btn-hover:before {
      content: "";
      width: 0;
      height: 0;
      border: 5px solid transparent;
      border-top: 5px solid #333;
    }
    .btn-hover:after {
      content: attr(data-tip);
      transform: translate(-50%, -45px);
      padding: 3px 10px;
      line-height: 26px;
      font-size: 12px;
      color: #fff;
      background-color: #333;
      border-radius: 5px;
      text-align: center;
      white-space: nowrap;

    }
    .btn-hover-slide:hover:before {
      opacity: 1;
    }
    .btn-hover-slide:hover:after {
      opacity: 1;
    }
  }
</style>
