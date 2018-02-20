import { mount } from 'vue-test-utils'
import DemoShow from './'

test('it works', () => {
  const wrapper = mount(DemoShow)
  expect(wrapper.isVueInstance()).toBe(true)
})
