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
      <router-link to="/" class="flex items-center gap-3 group shrink-0">
        <div class="w-9 h-9 rounded-xl bg-slate-900/5 border border-slate-200/80 p-1.5 flex items-center justify-center shadow-2xs group-hover:scale-105 group-hover:border-emerald-400 group-hover:bg-emerald-500/10 transition-all duration-300">
          <!-- لوگوی رسمی و دقیق Vue.js -->
          <svg
            viewBox="0 0 261.76 226.69"
            class="w-full h-full drop-shadow-xs"
            aria-label="لوگوی Vue.js"
          >
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
        <span class="font-extrabold text-slate-800 text-sm sm:text-base group-hover:text-emerald-600 transition-colors whitespace-nowrap">
          کارگاه یادگیری Vue 3
        </span>
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
