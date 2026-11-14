import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ReactivityComparisonDemo from '../components/learning/ReactivityComparisonDemo.vue'
import VIfVsVShowChild from '../components/learning/VIfVsVShowChild.vue'
import MemoryLeakDemo from '../components/learning/MemoryLeakDemo.vue'

describe('Learning Interactive Demos', () => {
  describe('ReactivityComparisonDemo', () => {
    it('متغیر معمولی در قالب رندر شده روی 0 قفل می‌ماند اما در حافظه DOM بالا می‌رود', async () => {
      const wrapper = mount(ReactivityComparisonDemo)

      const normalBtn = wrapper.findAll('button')[0]
      await normalBtn.trigger('click')
      await normalBtn.trigger('click')

      // در قالب Vue مقدار normalCount همچنان 0 است
      expect(wrapper.text()).toContain('رندر شده توسط Vue: 0')
    })

    it('متغیر ref با کلیک مقدارش در قالب افزایش می‌یابد', async () => {
      const wrapper = mount(ReactivityComparisonDemo)

      const refBtn = wrapper.findAll('button')[1]
      await refBtn.trigger('click')

      expect(wrapper.text()).toContain('رندر شده توسط Vue: 1')
    })
  })

  describe('VIfVsVShowChild', () => {
    it('وضعیت داخلی محلی و دکمه افزایش شمارنده دارد', async () => {
      const wrapper = mount(VIfVsVShowChild, {
        props: { type: 'if' },
      })

      expect(wrapper.text()).toContain('شمارنده محلی: 0')

      const button = wrapper.find('button')
      await button.trigger('click')

      expect(wrapper.text()).toContain('شمارنده محلی: 1')
    })
  })

  describe('MemoryLeakDemo', () => {
    it('در حالت پاک‌سازی فعال، هنگام unmount هوک clearInterval را صدا می‌زند', () => {
      vi.useFakeTimers()
      const wrapper = mount(MemoryLeakDemo, {
        props: { enableCleanup: true },
      })

      wrapper.unmount()
      const emitted = wrapper.emitted('tick')
      expect(emitted).toBeTruthy()
      const lastTick = emitted[emitted.length - 1][0]
      expect(lastTick.cleanedUp).toBe(true)
      expect(lastTick.alive).toBe(false)
      vi.useRealTimers()
    })

    it('در حالت پاک‌سازی غیرفعال، هنگام unmount هشدار عدم پاک‌سازی صادر می‌شود', () => {
      vi.useFakeTimers()
      const wrapper = mount(MemoryLeakDemo, {
        props: { enableCleanup: false },
      })

      wrapper.unmount()
      const emitted = wrapper.emitted('tick')
      expect(emitted).toBeTruthy()
      const lastTick = emitted[emitted.length - 1][0]
      expect(lastTick.cleanedUp).toBe(false)
      expect(lastTick.alive).toBe(false)
      vi.useRealTimers()
    })
  })
})
