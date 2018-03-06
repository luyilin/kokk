import Kokk from './index.vue'

export default Kokk

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component(Kokk.name, Kokk)
}
