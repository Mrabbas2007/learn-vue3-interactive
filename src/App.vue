<script setup>
import AppHeader from './components/common/AppHeader.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-surface-bg text-text-main font-sans">
    <!-- لینک پرش به محتوا برای کاربران کیبورد و اسکرین‌ریدر -->
    <a href="#main-content" class="skip-to-content">رفتن به محتوای اصلی</a>

    <!-- نوار ناوبری اصلی برنامه -->
    <AppHeader />

    <!-- بخش محتوای اصلی صفحات -->
    <main id="main-content" tabindex="-1" class="flex-1 pb-16 focus:outline-none">
      <router-view />
    </main>

    <!-- پانویس ساده با لینک‌های مفید -->
    <footer class="border-t border-border-subtle bg-surface-card py-6">
      <div
        class="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-muted"
      >
        <p class="text-center sm:text-start">
          ساخته‌شده برای یادگیری عمیق
          <span class="font-semibold text-text-body">Vue 3</span>
          و
          <span class="font-semibold text-text-body">Tailwind CSS v4</span>
        </p>
        <nav class="flex items-center gap-4" aria-label="پیوندهای پانویس">
          <a
            class="inline-flex items-center min-h-9 px-1 hover:text-primary-text transition-colors"
            href="https://vuejs.org/guide/introduction.html"
            target="_blank"
            rel="noopener noreferrer"
            >مستندات Vue</a
          >
          <a
            class="inline-flex items-center min-h-9 px-1 hover:text-primary-text transition-colors"
            href="https://tailwindcss.com/docs/theme"
            target="_blank"
            rel="noopener noreferrer"
            >مستندات Tailwind</a
          >
          <router-link to="/" class="inline-flex items-center min-h-9 px-1 hover:text-primary-text transition-colors"
            >نقشه راه</router-link
          >
        </nav>
      </div>
    </footer>
  </div>
</template>
