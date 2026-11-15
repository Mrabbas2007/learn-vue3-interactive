<script setup>
import { ref } from 'vue'

const parentClicks = ref(0)
const childClicks = ref(0)

function handleParentClick() {
  parentClicks.value++
}

function handleChildClick() {
  childClicks.value++
}
</script>

<template>
  <div class="space-y-4">
    <!-- باکسی که والد آن رویداد کلیک دارد -->
    <div
      @click="handleParentClick"
      class="p-5 border-2 border-dashed border-emerald-300 dark:border-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-500/12 rounded-2xl cursor-pointer transition-colors hover:bg-emerald-50/70 dark:hover:bg-emerald-500/20"
    >
      <div class="flex items-center justify-between mb-3">
        <span class="text-xs font-bold text-emerald-800 dark:text-emerald-300">
          کادر والد (دارای رویداد کلیک):
        </span>
        <span
          class="text-xs font-mono font-bold bg-surface-card text-primary-text px-2 py-1 rounded-md border border-emerald-200 dark:border-emerald-500/30 shadow-2xs"
        >
          تعداد کلیک‌های والد: {{ parentClicks }}
        </span>
      </div>

      <div class="flex flex-wrap gap-3">
        <!-- دکمه دارای stop -->
        <button
          @click.stop="handleChildClick"
          type="button"
          class="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs transition-transform active:scale-95"
        >
          دکمه فرزند دارای .stop (والد خبردار نمی‌شود)
        </button>

        <!-- دکمه معمولی بدون stop -->
        <button
          @click="handleChildClick"
          type="button"
          class="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs transition-transform active:scale-95"
        >
          دکمه فرزند بدون stop (والد هم کلیک می‌خورد!)
        </button>
      </div>

      <p class="text-xs text-text-muted mt-2 font-mono">
        کلیک‌های خود دکمه فرزند: {{ childClicks }}
      </p>
    </div>
  </div>
</template>
