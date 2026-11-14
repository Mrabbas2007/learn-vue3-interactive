import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import NotFoundView from '../views/NotFoundView.vue'

async function mountView(path = '/missing') {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'home', component: { template: '<div />' } },
      { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
    ],
  })
  await router.push(path)
  await router.isReady()
  return mount(NotFoundView, { global: { plugins: [router] } })
}

describe('NotFoundView', () => {
  beforeEach(() => {
    history.replaceState({}, '', '/')
  })

  it('کد وضعیت 404، پیام فارسی و آدرس اشتباه را نشان می‌دهد', async () => {
    const wrapper = await mountView('/unknown/route')
    const text = wrapper.text()

    expect(text).toContain('404')
    expect(text).toContain('این صفحه در نقشه راه پیدا نشد')
    expect(text).toContain('/unknown/route')
  })

  it('یک عنوان h1 و لینک بازگشت به خانه دارد', async () => {
    const wrapper = await mountView('/unknown')
    expect(wrapper.findAll('h1').length).toBe(1)
    expect(wrapper.find('a[href="/"]').exists()).toBe(true)
  })

  it('پیشنهاد مسیرهای جایگزین را رندر می‌کند', async () => {
    const wrapper = await mountView('/unknown')
    const text = wrapper.text()
    expect(text).toContain('مفاهیم پایه')
    expect(text).toContain('چرخه‌ی حیات')
  })
})
