<script setup>
import { ref } from 'vue'

const isButtonActive = ref(false)
</script>

<template>
  <div class="space-y-3">
    <div class="flex items-center gap-3">
      <button
        @click="isButtonActive = !isButtonActive"
        type="button"
        class="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border dark:border-slate-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors min-h-9"
      >
        تغییر وضعیت دکمه
      </button>
      <span class="text-xs text-text-body">
        وضعیت متغیر isButtonActive:
        <b :class="isButtonActive ? 'text-primary-text' : 'text-rose-600 dark:text-rose-400'">
          {{ isButtonActive }}
        </b>
      </span>
    </div>

    <!-- المان با کلاس و استایل پویا -->
    <div
      :class="[
        'p-4 rounded-xl border text-sm transition-all duration-300',
        isButtonActive
          ? 'bg-primary-light border-emerald-300 dark:border-emerald-500/30 text-emerald-950 dark:text-emerald-200 shadow-sm'
          : 'bg-surface-subtle border-border-subtle text-text-muted',
      ]"
    >
      <span>این باکس به‌صورت پویا با استفاده از <code>:class</code> استایل خود را تغییر می‌دهد!</span>
    </div>
  </div>
</template>
