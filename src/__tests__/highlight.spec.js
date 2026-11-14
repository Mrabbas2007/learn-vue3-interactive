import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import highlight from '../directives/highlight'

describe('Custom Directive: v-highlight', () => {
  it('رنگ هایلایت پیش‌فرض را اعمال می‌کند', () => {
    const Component = {
      template: '<div v-highlight>متن تست</div>',
    }

    const wrapper = mount(Component, {
      global: {
        directives: { highlight },
      },
    })

    const el = wrapper.find('div').element
    expect(el.style.backgroundColor).toBe('rgb(254, 240, 138)') // معادل #fef08a
  })

  it('رنگ سفارشی پاس داده شده را اعمال می‌کند', () => {
    const Component = {
      template: '<div v-highlight="\'#a7f3d0\'">متن تست</div>',
    }

    const wrapper = mount(Component, {
      global: {
        directives: { highlight },
      },
    })

    const el = wrapper.find('div').element
    expect(el.style.backgroundColor).toBe('rgb(167, 243, 208)') // معادل #a7f3d0
  })

  it('مودیفایر .big فونت را بزرگ می‌کند', () => {
    const Component = {
      template: '<div v-highlight.big>متن بزرگ</div>',
    }

    const wrapper = mount(Component, {
      global: {
        directives: { highlight },
      },
    })

    const el = wrapper.find('div').element
    expect(el.style.fontSize).toBe('1.25rem')
    expect(el.style.fontWeight).toBe('700')
  })

  it('مودیفایر .hover هنگام ورود و خروج ماوس استایل را تغییر می‌دهد', async () => {
    const Component = {
      template: '<div v-highlight.hover="\'#bae6fd\'">متن هاور</div>',
    }

    const wrapper = mount(Component, {
      global: {
        directives: { highlight },
      },
    })

    const div = wrapper.find('div')
    // در ابتدا قبل از هاور پس‌زمینه خالی است
    expect(div.element.style.backgroundColor).toBe('')

    // ورود ماوس
    await div.trigger('mouseenter')
    expect(div.element.style.backgroundColor).toBe('rgb(186, 230, 253)') // #bae6fd

    // خروج ماوس
    await div.trigger('mouseleave')
    expect(div.element.style.backgroundColor).toBe('transparent')
  })
})
