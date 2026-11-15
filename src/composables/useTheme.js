import { ref, watch } from 'vue'

const STORAGE_KEY = 'vue3-workshop-theme'
const root = document.documentElement

/**
 * Reads the persisted preference, falling back to the OS level setting.
 * Module level state keeps every component in sync with a single source of truth.
 */
function resolveInitialTheme() {
  let stored = null
  try {
    stored = localStorage.getItem(STORAGE_KEY)
  } catch {
    // Storage can be unavailable in private mode or sandboxed iframes
  }
  if (stored === 'light' || stored === 'dark') return stored

  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches === true
  return prefersDark ? 'dark' : 'light'
}

const theme = ref('light')

/** Applies the theme to <html> so Tailwind's class based dark variant kicks in. */
function applyTheme(value) {
  root.classList.toggle('dark', value === 'dark')
  root.style.colorScheme = value
}

// Registered once at module scope so toggling works even if initTheme never ran
watch(theme, (value) => {
  applyTheme(value)
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // Persisting is best effort only
  }
})

/**
 * Applies the stored (or system) preference. Call this once during app bootstrap,
 * before mount, to avoid a flash of the wrong theme.
 */
export function initTheme() {
  theme.value = resolveInitialTheme()
  applyTheme(theme.value)
}

export function useTheme() {
  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  return { theme, toggleTheme }
}
