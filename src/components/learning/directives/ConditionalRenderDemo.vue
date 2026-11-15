<script setup>
import { ref } from 'vue'
import { CheckCircle2, AlertTriangle, XCircle } from '@lucide/vue'

const statusType = ref('success')
</script>

<template>
  <div class="space-y-4">
    <div class="flex flex-wrap items-center gap-2">
      <span class="text-xs font-bold text-text-body">انتخاب وضعیت:</span>
      <button
        v-for="type in ['success', 'warning', 'error']"
        :key="type"
        @click="statusType = type"
        type="button"
        :class="[
          'px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer border',
          statusType === type
            ? 'bg-slate-900 text-white border-slate-900 dark:bg-emerald-600 dark:border-emerald-500'
            : 'bg-surface-card text-text-body border-border-medium hover:bg-surface-hover',
        ]"
      >
        {{ type }}
      </button>
    </div>

    <!-- شرط‌های رندر -->
    <div class="p-4 rounded-xl border transition-all text-sm">
      <div v-if="statusType === 'success'" class="text-primary-text font-semibold flex items-center gap-2">
        <CheckCircle2 class="w-4 h-4 text-primary-text shrink-0" />
        <span>عملیات با موفقیت انجام شد (شرط v-if برقرار است)</span>
      </div>
      <div
        v-else-if="statusType === 'warning'"
        class="text-amber-700 dark:text-amber-300 font-semibold flex items-center gap-2"
      >
        <AlertTriangle class="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
        <span>هشدار: مشکلی در سیستم وجود دارد (شرط v-else-if برقرار است)</span>
      </div>
      <div v-else class="text-rose-700 dark:text-rose-300 font-semibold flex items-center gap-2">
        <XCircle class="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
        <span>خطا رخ داده است (شرط v-else برقرار است)</span>
      </div>
    </div>
  </div>
</template>
