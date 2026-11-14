<script setup>
import AppHeader from './components/common/AppHeader.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-surface-bg text-text-main font-sans">
    <!-- نوار ناوبری اصلی برنامه -->
    <AppHeader />

    <!-- بخش محتوای اصلی صفحات -->
    <main class="flex-1 pb-16">
      <router-view />
    </main>
  </div>
</template>
