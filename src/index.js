import kokk from './App.vue'

export default kokk

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component(kokk.name, kokk)
}
