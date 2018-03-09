import Kokk from '../../src'

const doc = new Kokk({
  root: '/docs/',
  titleClassname: 'title'
})

doc.addComponent({
  order: 4,
  component: () => import('../components/Demo.vue')
})

export default doc.start('#app')
