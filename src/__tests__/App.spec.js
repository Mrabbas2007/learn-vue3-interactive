import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import App from '../App.vue'
import HomeView from '../views/HomeView.vue'

function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/', name: 'home', component: HomeView }],
  })
}

describe('App', () => {
  it('نوار ناوبری و تمام لینک‌های آموزشی را رندر می‌کند', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()

    const wrapper = mount(App, { global: { plugins: [router] } })
    const text = wrapper.text()

    expect(text).toContain('مفاهیم پایه')
    expect(text).toContain('چرخه حیات')
    expect(text).toContain('دستورها')
    expect(text).toContain('اصلاح‌کننده‌ها')
    expect(text).toContain('تفاوت‌ها')
    expect(text).toContain('دیزاین توکن‌ها')
  })

  it('لینک پرش به محتوای اصلی و ناحیه‌ی main را برای دسترس‌پذیری دارد', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()

    const wrapper = mount(App, { global: { plugins: [router] } })

    const skipLink = wrapper.find('a.skip-to-content')
    expect(skipLink.exists()).toBe(true)
    expect(skipLink.attributes('href')).toBe('#main-content')
    expect(wrapper.find('main#main-content').exists()).toBe(true)
  })

  it('با کلیک روی کلید تم، حالت تاریک روی html فعال و ذخیره می‌شود', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()

    const wrapper = mount(App, { global: { plugins: [router] } })
    const toggle = wrapper.find('header button[aria-label*="حالت"]')
    expect(toggle.exists()).toBe(true)

    await toggle.trigger('click')

    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem('vue3-workshop-theme')).toBe('dark')
  })

  it('منوی موبایل با کلید Escape بسته می‌شود', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()

    const wrapper = mount(App, { global: { plugins: [router] } })
    const menuButton = wrapper.find('header button[aria-controls="mobile-navigation"]')
    expect(menuButton.attributes('aria-expanded')).toBe('false')

    await menuButton.trigger('click')
    expect(menuButton.attributes('aria-expanded')).toBe('true')

    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(menuButton.element)
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await wrapper.vm.$nextTick()

    expect(menuButton.attributes('aria-expanded')).toBe('false')
  })
})
