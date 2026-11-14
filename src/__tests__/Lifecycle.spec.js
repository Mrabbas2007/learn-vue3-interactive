import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LifecycleDemoChild from '../components/learning/LifecycleDemoChild.vue'
import LifecycleStageVisualizer from '../components/learning/LifecycleStageVisualizer.vue'

describe('Lifecycle Components', () => {
  it('کامپوننت LifecycleDemoChild هوک‌های ساخت و اتصال به DOM را emit می‌کند', () => {
    const wrapper = mount(LifecycleDemoChild)

    const emitted = wrapper.emitted('hookTriggered')
    expect(emitted).toBeTruthy()

    // بررسی ثبت شدن هوک‌های ابتدایی
    const hookNames = emitted.map((e) => e[0].hook)
    expect(hookNames).toContain('script setup')
    expect(hookNames).toContain('onBeforeMount')
    expect(hookNames).toContain('onMounted')
  })

  it('با کلیک دکمه افزایش شمارنده، هوک‌های آپدیت اجرا می‌شوند', async () => {
    const wrapper = mount(LifecycleDemoChild)

    const button = wrapper.find('button')
    await button.trigger('click')

    const emitted = wrapper.emitted('hookTriggered')
    const hookNames = emitted.map((e) => e[0].hook)
    expect(hookNames).toContain('onBeforeUpdate')
    expect(hookNames).toContain('onUpdated')
  })

  it('با حذف کامپوننت هوک‌های unmount اجرا می‌شوند', () => {
    const wrapper = mount(LifecycleDemoChild)
    wrapper.unmount()

    const emitted = wrapper.emitted('hookTriggered')
    const hookNames = emitted.map((e) => e[0].hook)
    expect(hookNames).toContain('onBeforeUnmount')
    expect(hookNames).toContain('onUnmounted')
  })

  it('کامپوننت LifecycleStageVisualizer فاز فعال را هایلایت می‌کند', () => {
    const wrapper = mount(LifecycleStageVisualizer, {
      props: {
        activeStage: 'mount',
      },
    })

    const text = wrapper.text()
    expect(text).toContain('در حال اجرا')
    expect(text).toContain('۲. ورود به صفحه (Mount)')
  })
})
