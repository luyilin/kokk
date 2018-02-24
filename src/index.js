import Kokk from './list.vue'

export default Kokk

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component(Kokk.name, Kokk)
}
