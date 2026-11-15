<script setup>
import { ArrowLeft } from '@lucide/vue'

defineProps({
  chapter: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <router-link
    :to="chapter.path"
    class="group relative bg-surface-card border border-border-subtle rounded-2xl p-6 transition-all duration-200 hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-500/40 hover:-translate-y-0.5 flex flex-col justify-between"
  >
    <div>
      <!-- هدر کارت فصل -->
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2.5">
          <span
            class="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center justify-center font-mono"
          >
            {{ chapter.step }}
          </span>
          <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-surface-subtle text-text-body">
            {{ chapter.badge }}
          </span>
        </div>
        <ArrowLeft
          class="w-4 h-4 text-primary-text group-hover:translate-x-[-4px] transition-transform shrink-0"
        />
      </div>

      <!-- عنوان و متن -->
      <h3 class="text-base font-bold text-text-main group-hover:text-primary-text transition-colors mb-2">
        {{ chapter.title }}
      </h3>
      <p class="text-xs text-text-muted leading-relaxed mb-4">
        {{ chapter.description }}
      </p>
    </div>

    <!-- تگ‌های نکات آموزشی -->
    <div class="flex flex-wrap gap-1.5 pt-3 border-t border-border-subtle">
      <span
        v-for="h in chapter.highlights"
        :key="h"
        class="text-[10px] font-mono px-2 py-0.5 rounded-md bg-surface-subtle text-text-body border border-border-subtle"
      >
        {{ h }}
      </span>
    </div>
  </router-link>
</template>
