<script setup>
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from 'vue'
import { Zap } from '@lucide/vue'

const emit = defineEmits(['hookTriggered'])

const counter = ref(0)
const domBoxRef = ref(null)

function log(hookName, phase, details) {
  emit('hookTriggered', {
    hook: hookName,
    phase,
    details,
    time: new Date().toLocaleTimeString('fa-IR', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3,
    }),
    domReady: !!domBoxRef.value,
  })
}

// ۱. فاز راه‌اندازی (Creation): همین جا در اسکریپت اجرا می‌شود
log('script setup', 'create', 'توابع و متغیرها در حافظه ساخته شدند. هنوز DOM وجود ندارد!')

// ۲. فاز ورود به صفحه (Mounting)
onBeforeMount(() => {
  log('onBeforeMount', 'mount', 'قالب HTML کامپایل شده اما هنوز روی صفحه کشیده نشده است.')
})

onMounted(() => {
  log(
    'onMounted',
    'mount',
    'المان با موفقیت به صفحه واقعی (DOM) متصل شد! اکنون می‌توان به المان دسترسی پیدا کرد.',
  )
})

// ۳. فاز به‌روزرسانی (Updating)
onBeforeUpdate(() => {
  log(
    'onBeforeUpdate',
    'update',
    `متغیر شمارنده تغییر کرد (مقدار جدید: ${counter.value})؛ اما DOM هنوز بازسازی نشده است.`,
  )
})

onUpdated(() => {
  log(
    'onUpdated',
    'update',
    `تغییرات در صفحه منعکس شد و متن المان به "${counter.value}" به‌روزرسانی گردید.`,
  )
})

// ۴. فاز خروج و تخریب (Unmounting)
onBeforeUnmount(() => {
  log('onBeforeUnmount', 'unmount', 'دستور حذف صادر شد؛ کامپوننت هنوز در صفحه هست اما در حال آماده‌سازی برای خروج است.')
})

onUnmounted(() => {
  log('onUnmounted', 'unmount', 'کامپوننت به طور کامل از صفحه (DOM) پاک شد و حافظه آزاد گردید.')
})
</script>

<template>
  <div
    ref="domBoxRef"
    class="p-5 bg-gradient-to-tr from-emerald-500 to-teal-600 text-white rounded-2xl shadow-md border border-emerald-400/40 my-3 transition-all"
  >
    <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-surface-card animate-pulse"></span>
        <span class="font-extrabold text-sm sm:text-base">
          من یک کامپوننت زنده در DOM هستم!
        </span>
      </div>
      <span class="text-xs bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full font-mono">
        وضعیت: Mounted & Active
      </span>
    </div>

    <p class="text-xs text-emerald-50 dark:text-emerald-300 leading-relaxed mb-4">
      با کلیک روی دکمه زیر، مقدار متغیر را تغییر دهید تا اجرای هوک‌های
      <code class="bg-black/20 px-1.5 py-0.5 rounded font-mono text-emerald-200 dark:text-emerald-300">onBeforeUpdate</code>
      و
      <code class="bg-black/20 px-1.5 py-0.5 rounded font-mono text-emerald-200 dark:text-emerald-300">onUpdated</code>
      را به صورت زنده ببینید:
    </p>

    <div class="flex items-center gap-4">
      <button
        @click="counter++"
        type="button"
        class="px-4 py-2 bg-surface-card text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 font-bold text-xs rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5"
      >
        <Zap class="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
        <span>افزایش مقدار شمارنده</span>
      </button>

      <span class="text-sm font-mono font-bold bg-emerald-700/60 px-3 py-1.5 rounded-xl border border-emerald-400/30">
        مقدار فعلی: {{ counter }}
      </span>
    </div>
  </div>
</template>
