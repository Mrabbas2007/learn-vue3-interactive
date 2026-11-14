<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Compass } from '@lucide/vue'

const route = useRoute()
const router = useRouter()

// مسیرهایی که کاربر واقعاً می‌تواند به آن‌ها برگردد
const suggestions = [
  { path: '/', label: 'نقشه راه یادگیری' },
  { path: '/basics', label: 'مفاهیم پایه و واکنش‌پذیری' },
  { path: '/lifecycle', label: 'چرخه‌ی حیات کامپوننت' },
]
</script>

<template>
  <section class="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
    <div
      class="w-16 h-16 mx-auto rounded-2xl bg-primary-light border border-border-subtle flex items-center justify-center mb-6"
    >
      <Compass class="w-8 h-8 text-primary-text" aria-hidden="true" />
    </div>

    <p class="font-mono text-sm font-bold text-primary-text tracking-wider mb-2">404</p>

    <h1 class="text-2xl sm:text-3xl font-extrabold text-text-main mb-3">
      این صفحه در نقشه راه پیدا نشد
    </h1>

    <p class="text-sm sm:text-base text-text-muted leading-relaxed mb-2">
      آدرسی که باز کرده‌اید وجود ندارد یا جابه‌جا شده است:
      <code class="text-xs bg-surface-subtle px-1.5 py-0.5 rounded border border-border-subtle">{{
        route.fullPath
      }}</code>
    </p>

    <p class="text-sm text-text-muted mb-8">
      از یکی از ایستگاه‌های زیر ادامه دهید:
    </p>

    <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
      <button
        type="button"
        @click="router.back()"
        class="inline-flex items-center justify-center gap-2 min-h-11 px-5 rounded-lg border border-border-medium text-sm font-semibold text-text-body hover:bg-surface-subtle transition-colors cursor-pointer"
      >
        بازگشت به صفحه‌ی قبل
      </button>
      <router-link
        to="/"
        class="inline-flex items-center justify-center gap-2 min-h-11 px-5 rounded-lg bg-brand-600 text-white text-sm font-bold hover:bg-brand-700 transition-colors"
      >
        رفتن به خانه
        <ArrowLeft class="w-4 h-4" aria-hidden="true" />
      </router-link>
    </div>

    <ul class="mt-8 flex flex-wrap items-center justify-center gap-2">
      <li v-for="item in suggestions" :key="item.path">
        <router-link
          :to="item.path"
          class="inline-flex items-center min-h-9 px-3 rounded-full text-xs font-semibold text-text-muted bg-surface-subtle border border-border-subtle hover:text-primary-text hover:border-brand-400 transition-colors"
        >
          {{ item.label }}
        </router-link>
      </li>
    </ul>
  </section>
</template>
