import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('App', () => {
  it('نوار ناوبری و تمام لینک‌های آموزشی را رندر می‌کند', () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          'router-link': { template: '<a><slot /></a>' },
          'router-view': { template: '<div />' },
        },
      },
    })
    const text = wrapper.text()
    expect(text).toContain('مفاهیم پایه')
    expect(text).toContain('چرخه حیات')
    expect(text).toContain('دستورها')
    expect(text).toContain('اصلاح‌کننده‌ها')
    expect(text).toContain('تفاوت‌ها')
    expect(text).toContain('دیزاین توکن‌ها')
  })
})
