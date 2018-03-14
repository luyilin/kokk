import Kokk from '../../src'

const doc = new Kokk({
  root: 'https://raw.githubusercontent.com/luyilin/kokk/master/',
  titleClassname: 'title'
})

doc.addComponent({
  order: 4,
  component: () => import('../components/Demo.vue')
})

export default doc.start('#app')
