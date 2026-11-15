<script setup>
import { ref } from 'vue'
import { Play, Trash2, RotateCcw, Check, X } from '@lucide/vue'
import LifecycleStageVisualizer from './LifecycleStageVisualizer.vue'
import LifecycleDemoChild from './LifecycleDemoChild.vue'

const isComponentMounted = ref(true)
const activeStage = ref('idle')
const logs = ref([])

function handleHookTriggered(event) {
  activeStage.value = event.phase
  logs.value.unshift(event)
}

function mountComponent() {
  isComponentMounted.value = true
}

function unmountComponent() {
  isComponentMounted.value = false
  activeStage.value = 'unmount'
}

function clearLogs() {
  logs.value = []
  activeStage.value = 'idle'
}
</script>

<template>
  <div>
    <!-- دیاگرام مراحل لایف‌سایکل -->
    <LifecycleStageVisualizer :active-stage="activeStage" />

    <!-- پنل دکمه‌های کنترل -->
    <div
      class="flex flex-wrap items-center justify-between gap-2 p-3 bg-surface-card border border-border-subtle rounded-xl mb-4"
    >
      <div class="flex flex-wrap items-center gap-2">
        <button
          v-if="!isComponentMounted"
          @click="mountComponent"
          type="button"
          class="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
        >
          <Play class="w-3.5 h-3.5 fill-current" />
          <span>متولد کردن کامپوننت (Mount)</span>
        </button>

        <button
          v-else
          @click="unmountComponent"
          type="button"
          class="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
        >
          <Trash2 class="w-3.5 h-3.5" />
          <span>حذف کامپوننت از صفحه (Unmount)</span>
        </button>
      </div>

      <button
        @click="clearLogs"
        type="button"
        class="px-3 py-1.5 bg-surface-subtle hover:bg-slate-200 dark:hover:bg-surface-hover text-text-body text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
      >
        <RotateCcw class="w-3.5 h-3.5" />
        <span>پاک‌سازی کنسول لاگ‌ها</span>
      </button>
    </div>

    <!-- کامپوننت فرزند زنده (در صورت فعال بودن) -->
    <div v-if="isComponentMounted" class="transition-all">
      <LifecycleDemoChild @hook-triggered="handleHookTriggered" />
    </div>
    <div
      v-else
      class="p-6 bg-surface-subtle border-2 border-dashed border-border-medium rounded-2xl text-center text-text-muted text-xs my-3 font-mono"
    >
      کامپوننت در حال حاضر در درخت DOM وجود ندارد (Unmounted). برای تولد مجدد روی دکمه "متولد کردن" کلیک کنید.
    </div>

    <!-- کنسول وقایع زنده (Live Event Log) -->
    <div class="mt-4 rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-sm text-left">
      <div
        class="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/90 text-xs font-mono text-text-subtle"
      >
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-brand-500 animate-pulse"></span>
          <span class="text-slate-300 font-bold font-sans">کنسول ثبت آنی رویدادهای Lifecycle</span>
        </div>
        <span class="text-[11px] text-text-muted font-mono">تعداد رویداد: {{ logs.length }}</span>
      </div>

      <div class="p-3 max-h-56 overflow-y-auto space-y-2 font-mono text-xs">
        <div
          v-for="(item, idx) in logs"
          :key="idx"
          class="p-2 rounded bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
        >
          <div class="flex items-center gap-2">
            <span class="text-[10px] text-text-muted">{{ item.time }}</span>
            <span
              :class="[
                'px-2 py-0.5 rounded text-[11px] font-bold',
                item.phase === 'create' &&
                  'bg-emerald-950 text-emerald-400 border border-emerald-800',
                item.phase === 'mount' && 'bg-teal-950 text-teal-400 border border-teal-800',
                item.phase === 'update' && 'bg-amber-950 text-amber-400 border border-amber-800',
                item.phase === 'unmount' && 'bg-rose-950 text-rose-400 border border-rose-800',
              ]"
            >
              {{ item.hook }}
            </span>
            <span class="text-slate-300 font-sans text-xs">{{ item.details }}</span>
          </div>

          <span
            :class="[
              'text-[10px] px-1.5 py-0.5 rounded shrink-0 font-sans flex items-center gap-1',
              item.domReady ? 'text-emerald-400 bg-emerald-950/60' : 'text-text-muted bg-slate-800/60',
            ]"
          >
            <Check v-if="item.domReady" class="w-3 h-3" />
            <X v-else class="w-3 h-3" />
            <span>{{ item.domReady ? 'DOM آماده' : 'قبل از DOM' }}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
