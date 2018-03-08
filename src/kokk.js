import Vue from 'vue'
import App from './components/App.vue'

class Kokk {
  constructor(config) {
    this.config = {
      titleClassname: '',
      root: './',
      mainDoc: 'main.md',
      highlight: true,
      highlightFirstParagraph: false,
      loadingColor: '#7175b1',
      ...config
    }
  }
  addComponent(i){
    this.component = {
      title: 'Examples',
      order: 3,
      component: () => {},
      ...i
    }
    return this
  }

  start(el) {
    const app = new Vue({
      el,
      render: h => h(App, {
        props: {
          config: this.config,
          component: this.component
        }
      })
    })
    return app
  }
}

export default function kokk(options) {
  return new Kokk(options)
}

if (process.env.NODE_ENV === 'development') {
  window.Kokk = kokk
}
