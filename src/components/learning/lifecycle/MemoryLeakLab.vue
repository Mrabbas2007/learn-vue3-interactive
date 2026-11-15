<script setup>
import { ref } from 'vue'
import MemoryLeakDemo from './MemoryLeakDemo.vue'

const showTimerComponent = ref(true)
const enableCleanup = ref(true)
const timerLog = ref('🟢 کامپوننت تایمر در صفحه فعال است...')
const isLeaking = ref(false)

function handleTimerTick(data) {
  if (data.isMounted) {
    isLeaking.value = false
    timerLog.value = `🟢 کامپوننت در صفحه زنده است: ثانیه ${data.seconds} (زمان: ${data.time})`
  } else if (data.cleanedUp) {
    isLeaking.value = false
    timerLog.value = `✅ کامپوننت با موفقیت بسته شد و تایمر با clearInterval در onUnmounted متوقف گردید (رم کاملاً پاک شد).`
  } else {
    isLeaking.value = true
    timerLog.value = `🚨 نشت حافظه (Memory Leak) فعال است! کامپوننت از درخت DOM حذف شد اما تایمر یتیم همچنان در RAM زنده است: ثانیه ${data.seconds}`
  }
}
</script>

<template>
  <div class="space-y-3">
    <div
      class="flex flex-wrap items-center justify-between gap-3 p-3 bg-surface-card border border-border-subtle rounded-xl"
    >
      <div class="flex items-center gap-2">
        <label class="text-xs font-bold text-text-body flex items-center gap-2 cursor-pointer">
          <input
            v-model="enableCleanup"
            type="checkbox"
            class="rounded text-primary-text focus:ring-emerald-500 w-4 h-4"
          />
          <span>توقف و پاک‌سازی صحیح تایمر در onUnmounted فعال باشد</span>
        </label>
      </div>

      <button
        @click="showTimerComponent = !showTimerComponent"
        type="button"
        class="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border dark:border-slate-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors min-h-9"
      >
        {{ showTimerComponent ? 'بستن کامپوننت تایمر' : 'باز کردن مجدد کامپوننت تایمر' }}
      </button>
    </div>

    <!-- کامپوننت تایمر آزمایشی -->
    <div v-if="showTimerComponent">
      <MemoryLeakDemo :enable-cleanup="enableCleanup" @tick="handleTimerTick" />
    </div>

    <!-- لاگ وضعیت تایمر -->
    <div
      :class="[
        'p-3 rounded-xl border text-xs font-mono transition-colors flex items-center justify-between',
        isLeaking
          ? 'bg-danger-surface border-danger-border text-danger-text font-bold'
          : 'bg-surface-subtle border-border-subtle text-text-body',
      ]"
    >
      <span>{{ timerLog }}</span>
      <span
        v-if="isLeaking"
        class="px-2 py-0.5 rounded bg-rose-200 dark:bg-rose-500/25 text-rose-900 dark:text-rose-200 text-[10px] uppercase font-bold tracking-wider shrink-0 mr-2"
      >
        Leak Detected
      </span>
    </div>
  </div>
</template>
