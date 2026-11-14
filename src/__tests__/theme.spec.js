import { describe, it, expect, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { initTheme, useTheme } from '../composables/useTheme'

const STORAGE_KEY = 'vue3-workshop-theme'

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
    initTheme()
    const { theme } = useTheme()
    theme.value = 'light'
  })

  it('پیش‌فرض را روی تم روشن تنظیم می‌کند', () => {
    const { theme } = useTheme()
    expect(theme.value).toBe('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('با toggleTheme تم را به تاریک تغییر می‌دهد و کلاس dark را اضافه می‌کند', async () => {
    const { theme, toggleTheme } = useTheme()
    toggleTheme()
    await nextTick()

    expect(theme.value).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem(STORAGE_KEY)).toBe('dark')
  })

  it('ترجیح ذخیره شد‌ه‌ی کاربر را در initTheme برمی‌گرداند', () => {
    localStorage.setItem(STORAGE_KEY, 'dark')
    initTheme()

    const { theme } = useTheme()
    expect(theme.value).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('مقدار نامعتبر در localStorage را نادیده می‌گیرد', () => {
    localStorage.setItem(STORAGE_KEY, 'purple')
    initTheme()

    const { theme } = useTheme()
    expect(['light', 'dark']).toContain(theme.value)
  })
})
