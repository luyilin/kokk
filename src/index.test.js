import { mount } from 'vue-test-utils'
import Kokk from './'

test('it works', () => {
  const wrapper = mount(Kokk)
  expect(wrapper.isVueInstance()).toBe(true)
})
