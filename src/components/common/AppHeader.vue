<script setup>
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)

const navLinks = [
  { path: '/', label: 'خانه' },
  { path: '/basics', label: 'مفاهیم پایه' },
  { path: '/lifecycle', label: 'چرخه حیات' },
  { path: '/directives', label: 'دستورها' },
  { path: '/modifiers', label: 'اصلاح‌کننده‌ها' },
  { path: '/compare', label: 'تفاوت‌ها' },
  { path: '/tokens', label: 'دیزاین توکن‌ها' },
]
</script>

<template>
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
      <!-- لوگو و عنوان پروژه -->
      <router-link to="/" class="flex items-center gap-2.5 group shrink-0">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
          V
        </div>
        <div class="flex items-center gap-2">
          <span class="font-extrabold text-slate-800 text-sm sm:text-base group-hover:text-emerald-600 transition-colors whitespace-nowrap">
            کارگاه یادگیری Vue 3
          </span>
          <span class="hidden 2xl:inline-block px-2 py-0.5 text-[11px] font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">
            Tailwind v4
          </span>
        </div>
      </router-link>

      <!-- منوی دسکتاپ -->
      <nav class="hidden md:flex items-center gap-0.5 lg:gap-1">
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="whitespace-nowrap px-2 lg:px-2.5 py-1.5 rounded-lg text-xs lg:text-[13px] font-semibold text-slate-600 hover:text-emerald-600 hover:bg-slate-100/70 transition-all"
          active-class="!text-emerald-700 !bg-emerald-50 font-bold shadow-xs"
        >
          {{ link.label }}
        </router-link>
      </nav>

      <!-- دکمه منوی موبایل -->
      <button
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        type="button"
        class="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none cursor-pointer"
        aria-label="منو"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            v-if="!isMobileMenuOpen"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- منوی کشویی موبایل -->
    <div
      v-show="isMobileMenuOpen"
      class="md:hidden border-b border-slate-200 bg-white px-4 py-3 space-y-1 shadow-lg"
    >
      <router-link
        v-for="link in navLinks"
        :key="link.path"
        :to="link.path"
        @click="isMobileMenuOpen = false"
        class="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
        active-class="bg-emerald-50 text-emerald-700 font-bold"
      >
        {{ link.label }}
      </router-link>
    </div>
  </header>
</template>
