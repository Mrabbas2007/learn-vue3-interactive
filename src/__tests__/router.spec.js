import { describe, it, expect } from 'vitest'
import { createRouter, createMemoryHistory } from 'vue-router'
import router from '../router'

describe('Router', () => {
  const paths = ['/', '/basics', '/lifecycle', '/directives', '/modifiers', '/compare', '/tokens']

  it.each(paths)('مسیر %s یک رکورد معتبر و نام‌دار دارد', (path) => {
    const record = router.resolve(path)
    expect(record.matched.length).toBe(1)
    expect(record.name).toBeTruthy()
  })

  it('آدرس نامعتبر به رکورد not-found نگاشت می‌شود نه به یک صفحه‌ی خالی', () => {
    const record = router.resolve('/this-page-does-not-exist')
    expect(record.name).toBe('not-found')
    expect(record.matched.length).toBe(1)
  })

  it('مسیرهای تودرتو و نامعتبر هم توسط catch-all گرفته می‌شوند', () => {
    const record = router.resolve('/basics/extra/deep')
    expect(record.name).toBe('not-found')
  })

  it('عنوان هر صفحه در متای رکورد تعریف شده است', () => {
    for (const path of paths) {
      expect(router.resolve(path).meta.title).toBeTruthy()
    }
  })

  it('هر مسیر فقط یک بار تعریف شده و نام‌ها یکتا هستند', () => {
    const names = router.getRoutes().map((record) => record.name)
    expect(new Set(names).size).toBe(names.length)
  })
})

describe('Router (memory history)', () => {
  it('با تاریخچه‌ی حافظه‌ای هم ناوبری برنامه‌ای کار می‌کند', async () => {
    const memoryRouter = createRouter({ history: createMemoryHistory(), routes: router.getRoutes() })
    await memoryRouter.push('/tokens')
    await memoryRouter.isReady()
    expect(memoryRouter.currentRoute.value.name).toBe('tokens')
  })
})
