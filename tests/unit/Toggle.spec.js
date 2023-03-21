import { mount } from '@vue/test-utils'
import Toggle from '@/components/Toggle'

describe('Toggle', () => {
    test('If dark-theme checkbox is not checked as default', () => {
        const wrapper = mount(Toggle) 
        const radioInput = wrapper.find('input[type="checkbox"]')

        expect(radioInput.element.checked).toBeFalsy()
      })
})