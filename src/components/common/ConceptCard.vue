<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  badge: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="bg-surface-card border border-border-subtle rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200 mb-6">
    <!-- هدر کارت -->
    <div class="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle pb-3 mb-4">
      <div class="flex items-center gap-2.5">
        <h2 class="text-lg sm:text-xl font-bold text-text-main">
          {{ title }}
        </h2>
        <span
          v-if="badge"
          class="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-primary-light text-primary-text border border-emerald-200 dark:border-emerald-500/30"
        >
          {{ badge }}
        </span>
      </div>
    </div>

    <!-- توضیحات متنی -->
    <p v-if="description" class="text-sm text-text-body mb-4 leading-relaxed">
      {{ description }}
    </p>

    <!-- اسلات توضیحات پیشرفته -->
    <slot name="explanation" />

    <!-- اسلات دموی تعاملی -->
    <div v-if="$slots.demo" class="my-4">
      <div class="text-xs font-bold text-text-subtle uppercase tracking-wider mb-2 flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
        <span>آزمایشگاه تعاملی (تست زنده)</span>
      </div>
      <div class="bg-slate-50/70 dark:bg-slate-500/12 border border-border-subtle rounded-xl p-4">
        <slot name="demo" />
      </div>
    </div>

    <!-- اسلات نمایش کد -->
    <slot name="code" />

    <!-- اسلات نکات و هشدارها -->
    <slot name="callout" />
  </div>
</template>
