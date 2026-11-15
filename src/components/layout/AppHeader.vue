<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { Sun, Moon, Menu, X } from '@lucide/vue'
import { useTheme } from '../../composables/useTheme'

const { theme, toggleTheme } = useTheme()
const route = useRoute()

const isMobileMenuOpen = ref(false)
const menuButton = ref(null)

const navLinks = [
  { path: '/', label: 'خانه' },
  { path: '/basics', label: 'مفاهیم پایه' },
  { path: '/lifecycle', label: 'چرخه‌ی حیات' },
  { path: '/directives', label: 'دستورها' },
  { path: '/modifiers', label: 'اصلاح‌کننده‌ها' },
  { path: '/compare', label: 'تفاوت‌ها' },
  { path: '/tokens', label: 'دی‌زاین توکن‌ها' },
]

// بستن خودکار منوی موبایل بعد از تغییر مسیر
watch(
  () => route.fullPath,
  () => {
    isMobileMenuOpen.value = false
  },
)

// بستن منو و بازگرداندن فوکوس با کلید Escape (دسترس‌پذیری)
function handleKeydown(event) {
  if (event.key === 'Escape' && isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false
    nextTick(() => menuButton.value?.focus())
  }
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <header
    class="sticky top-0 z-50 bg-surface-header backdrop-blur-md border-b border-border-subtle shadow-xs"
  >
    <div class="max-w-6xl mx-auto flex h-14 sm:h-16 items-center justify-between gap-2 px-3 sm:px-6">
      <!-- لوگو و عنوان پروژه -->
      <router-link
        to="/"
        class="flex items-center gap-2.5 sm:gap-3 group min-w-0 shrink"
        aria-label="خانه — کارگاه یادگیری Vue 3"
      >
        <div
          class="w-9 h-9 shrink-0 rounded-xl bg-surface-subtle border border-border-subtle p-1.5 flex items-center justify-center shadow-2xs group-hover:scale-105 group-hover:border-brand-400 group-hover:bg-primary-light transition-all duration-300"
        >
          <!-- لوگوی رسمی و دقیق Vue.js -->
          <svg viewBox="0 0 261.76 226.69" class="w-full h-full drop-shadow-xs" aria-hidden="true">
            <path
              d="M161.096.001l-30.225 52.351L100.647.001H-.005l130.877 226.688L261.749.001z"
              fill="#41B883"
            />
            <path
              d="M161.096.001l-30.225 52.351L100.647.001H52.346l78.526 136.01L209.398.001z"
              fill="#34495E"
            />
          </svg>
        </div>
        <span
          class="font-extrabold text-text-main text-sm sm:text-base truncate group-hover:text-primary-text transition-colors"
        >
          کارگاه یادگیری Vue 3
        </span>
      </router-link>

      <!-- منوی دسکتاپ -->
      <nav class="hidden lg:flex items-center gap-0.5 lg:gap-1" aria-label="ناوبری اصلی">
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="whitespace-nowrap px-2 lg:px-2.5 py-2.5 rounded-lg text-xs lg:text-[13px] font-semibold text-text-muted hover:text-primary-text hover:bg-surface-subtle transition-all"
          active-class="!text-primary-text !bg-primary-light font-bold shadow-xs"
        >
          {{ link.label }}
        </router-link>
      </nav>

      <div class="flex items-center gap-1 sm:gap-1.5 shrink-0">
        <!-- کلید تغییر تم روشن/تاریک -->
        <button
          @click="toggleTheme"
          type="button"
          class="w-10 h-10 flex items-center justify-center rounded-lg text-text-muted hover:text-primary-text hover:bg-surface-subtle transition-colors cursor-pointer"
          :aria-label="theme === 'dark' ? 'تغییر به حالت روشن' : 'تغییر به حالت تاریک'"
          :title="theme === 'dark' ? 'حالت روشن' : 'حالت تاریک'"
        >
          <Sun v-if="theme === 'dark'" class="w-5 h-5" aria-hidden="true" />
          <Moon v-else class="w-5 h-5" aria-hidden="true" />
        </button>

        <!-- دکمه منوی موبایل -->
        <button
          ref="menuButton"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          type="button"
          class="w-10 h-10 flex items-center justify-center rounded-lg text-text-muted hover:text-text-main hover:bg-surface-subtle transition-colors cursor-pointer lg:hidden"
          :aria-label="isMobileMenuOpen ? 'بستن منو' : 'باز کردن منو'"
          :aria-expanded="isMobileMenuOpen"
          aria-controls="mobile-navigation"
        >
          <X v-if="isMobileMenuOpen" class="w-6 h-6" aria-hidden="true" />
          <Menu v-else class="w-6 h-6" aria-hidden="true" />
        </button>
      </div>
    </div>

    <!-- منوی کشویی موبایل / تبلت -->
    <transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="-translate-y-2 opacity-0"
      leave-active-class="transition duration-100 ease-in"
      leave-to-class="-translate-y-2 opacity-0"
    >
      <nav
        v-show="isMobileMenuOpen"
        id="mobile-navigation"
        class="lg:hidden border-b border-border-subtle bg-surface-card px-3 pb-3 shadow-lg"
        aria-label="ناوبری موبایل"
      >
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          @click="isMobileMenuOpen = false"
          class="flex items-center min-h-11 px-3 rounded-lg text-sm font-medium text-text-body hover:bg-primary-light hover:text-primary-text transition-colors"
          active-class="bg-primary-light text-primary-text font-bold"
        >
          {{ link.label }}
        </router-link>
      </nav>
    </transition>
  </header>
</template>
