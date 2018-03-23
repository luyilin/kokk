import Kokk from 'kokk'

const doc = new Kokk({
  root: 'https://raw.githubusercontent.com/luyilin/kokk/master/',
  titleClassname: 'title'
})

doc.addComponent({
  order: 4,
  component: () => import('./components/Demo.vue'),
  showExpandIcon: true
})

export default doc.start('#app')
