<script setup>
import { ref } from 'vue'

const liveText = ref('')
const lazyText = ref('')
const parentClicks = ref(0)
const stopClicks = ref(0)
const normalChildClicks = ref(0)
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- کارت .lazy -->
    <div class="bg-surface-card p-4 rounded-xl border border-border-subtle shadow-2xs space-y-3">
      <div>
        <div class="flex items-center justify-between mb-1">
          <h3 class="font-bold text-xs text-emerald-800 dark:text-emerald-300">
            ۱) فیلد v-model معمولی (لحظه‌ای):
          </h3>
          <span
            class="text-[10px] font-mono px-2 py-0.5 rounded bg-primary-light text-primary-text border border-emerald-200 dark:border-emerald-500/30"
          >
            @input
          </span>
        </div>
        <input
          v-model="liveText"
          placeholder="تایپ کنید (همزمان با هر کلید)..."
          class="w-full px-3 py-1.5 border border-border-medium rounded-lg text-sm mb-1 focus:outline-brand-500"
        />
        <p class="text-xs text-text-body font-mono">
          مقدار زنده: <b class="text-primary-text">{{ liveText || '—' }}</b>
        </p>
      </div>

      <div class="pt-2 border-t border-border-subtle">
        <div class="flex items-center justify-between mb-1">
          <h3 class="font-bold text-xs text-teal-800 dark:text-teal-300">
            ۲) فیلد v-model.lazy (تنبلی در سینک):
          </h3>
          <span
            class="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-500/30"
          >
            @change
          </span>
        </div>
        <input
          v-model.lazy="lazyText"
          placeholder="تایپ کنید و سپس بیرون کلیک کنید..."
          class="w-full px-3 py-1.5 border border-border-medium rounded-lg text-sm mb-1 focus:outline-teal-500"
        />
        <p class="text-xs text-text-body font-mono">
          مقدار پس از خروج فوکوس:
          <b class="text-teal-700 dark:text-teal-300">{{ lazyText || '—' }}</b>
        </p>
      </div>
    </div>

    <!-- کارت .stop -->
    <div class="bg-surface-card p-4 rounded-xl border border-border-subtle shadow-2xs">
      <div class="flex items-center justify-between mb-2">
        <h3 class="font-bold text-xs text-indigo-800 dark:text-indigo-300">۳) مودیفایر @click.stop</h3>
        <span
          class="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30"
        >
          Event Handling
        </span>
      </div>
      <p class="text-xs text-text-muted mb-3">
        با دو دکمه زیر مقایسه کنید؛ یکی نشت رویداد به والد را متوقف می‌کند و دیگری اجازه نشت می‌دهد:
      </p>
      <div
        @click="parentClicks++"
        class="p-3 border-2 border-dashed border-indigo-200 dark:border-indigo-500/30 rounded-lg bg-indigo-50/30 dark:bg-indigo-500/12 hover:bg-indigo-50/60 dark:hover:bg-indigo-500/20 transition-colors flex flex-col gap-2.5 cursor-pointer"
      >
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-indigo-900 dark:text-indigo-300">
            کادر والد (شنونده کلیک):
          </span>
          <span
            class="text-xs font-mono font-bold bg-surface-card text-indigo-700 dark:text-indigo-300 px-2.5 py-0.5 rounded border border-indigo-200 dark:border-indigo-500/30 shadow-2xs"
          >
            کلیک‌های والد: {{ parentClicks }}
          </span>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <button
            @click.stop="stopClicks++"
            type="button"
            class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-transform active:scale-95 shadow-2xs min-h-9"
          >
            کلیک با .stop (والد بی‌خبر)
          </button>
          <button
            @click="normalChildClicks++"
            type="button"
            class="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-transform active:scale-95 shadow-2xs min-h-9"
          >
            کلیک بدون stop (والد هم شمرده می‌شود!)
          </button>
        </div>
        <div
          class="text-[11px] font-mono text-text-body bg-surface-card/70 p-1.5 rounded border border-indigo-100 dark:border-indigo-500/30 flex items-center justify-between"
        >
          <span>
            کلیک‌های فرزند دارای stop: <b>{{ stopClicks }}</b>
          </span>
          <span>
            کلیک‌های فرزند بدون stop: <b>{{ normalChildClicks }}</b>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
