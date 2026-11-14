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
  <div class="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200 mb-6">
    <!-- هدر کارت -->
    <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
      <div class="flex items-center gap-2.5">
        <h3 class="text-lg sm:text-xl font-bold text-slate-800">
          {{ title }}
        </h3>
        <span
          v-if="badge"
          class="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200"
        >
          {{ badge }}
        </span>
      </div>
    </div>

    <!-- توضیحات متنی -->
    <p v-if="description" class="text-sm text-slate-600 mb-4 leading-relaxed">
      {{ description }}
    </p>

    <!-- اسلات توضیحات پیشرفته -->
    <slot name="explanation" />

    <!-- اسلات دموی تعاملی -->
    <div v-if="$slots.demo" class="my-4">
      <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>آزمایشگاه تعاملی (تست زنده)</span>
      </div>
      <div class="bg-slate-50/70 border border-slate-200 rounded-xl p-4">
        <slot name="demo" />
      </div>
    </div>

    <!-- اسلات نمایش کد -->
    <slot name="code" />

    <!-- اسلات نکات و هشدارها -->
    <slot name="callout" />
  </div>
</template>
