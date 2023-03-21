import { mount } from '@vue/test-utils'
import InvoicesModal from '@/components/InvoicesModal'

describe('InvoicesModal', () => {
  const wrapper = mount(InvoicesModal)
    test('Test that error message is empty when there are no errors', () => {
      const message = wrapper.find('.error__text')
      expect(message.html()).toBe('<p class="error__text"></p>')
    })
})