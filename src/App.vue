<template>
  <div class="box" :class="{expand: codeExpand}">
    <div class="box-demo">
      <slot name="demo"/>
    </div>
    <div class="box-meta">
      <div class="box-title">
        <a>{{ title }}</a>
      </div>
      <p>{{ desc }}</p>
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
    name: 'kokk',

    props: {
      title: {
        type: String,
        default: 'Basic'
      },
      desc: {
        type: String,
        default: 'The simplest usage.'
      },
      expandAll: {
        type: Boolean,
        default: false
      },
      highlight: {
        default: true
      },
      root: {
        type: String,
        default: './'
      },
      doc: {
        type: String,
        default: 'demo.md'
      }
    },

    data () {
      return {
        codeExpand: this.expandAll,
        html: '',
        tip: 'show code'
      }
    },

    watch: {
      expandAll(i) {
        this.codeExpand = i
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

    async created () {
      const content = await fetch(`${this.root}${this.doc}`).then(res => res.text())
      const highlightFn = typeof this.highlight === 'function' ? this.highlight : highlight
      this.html = marked(content, {
        highlight: this.highlight && highlightFn,
      })
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
    .box-demo {
      border-bottom: 1px solid #ebedf0;
      padding: 42px 24px 50px;
      color: rgba(0, 0, 0, 0.65);
    }
    .box-meta {
      position: relative;
      padding: 18px 32px;
      border-radius: 0 0 2px 2px;
      font-size: 14px;
      color: #314659;
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
