<script setup>
import { ref } from 'vue'

const selectedColor = ref('#fef08a')

const vFocus = {
  mounted(el) {
    el.focus()
  },
}

const vRedBold = {
  mounted(el) {
    el.style.color = '#ef4444'
    el.style.fontWeight = 'bold'
  },
}
</script>

<template>
  <div class="space-y-4">
    <!-- دستور محلی v-focus -->
    <div class="bg-surface-card p-3.5 rounded-xl border border-border-subtle">
      <h3 class="font-bold text-xs text-text-body mb-1">دستور محلی v-focus (فوکوس خودکار در زمان لود):</h3>
      <p class="text-xs text-text-muted mb-2">به محض لود صفحه، کرسر داخل این فیلد قرار گرفته است:</p>
      <input
        v-focus
        placeholder="من با v-focus به‌طور خودکار فوکوس شدم!"
        class="w-full px-3 py-1.5 border border-border-medium rounded-lg text-sm focus:outline-brand-500"
      />
    </div>

    <!-- دستور محلی v-red-bold -->
    <div class="bg-surface-card p-3.5 rounded-xl border border-border-subtle">
      <h3 class="font-bold text-xs text-text-body mb-1">دستور محلی v-red-bold:</h3>
      <p v-red-bold class="text-sm">این متن مستقیماً توسط دایرکتیو v-red-bold قرمز و ضخیم شده است.</p>
    </div>

    <!-- دستور سراسری v-highlight -->
    <div class="bg-surface-card p-3.5 rounded-xl border border-border-subtle space-y-3">
      <h3 class="font-bold text-xs text-text-body">دستور سراسری v-highlight با پارامترها و Modifierها:</h3>

      <div class="flex flex-wrap items-center gap-3">
        <label class="text-xs font-bold text-text-body">انتخاب رنگ داینامیک:</label>
        <select
          v-model="selectedColor"
          class="px-2.5 py-1 border border-border-medium rounded-lg text-xs bg-surface-card focus:outline-brand-500"
        >
          <option value="#fef08a">زرد پاستلی (#fef08a)</option>
          <option value="#a7f3d0">سبز نعنایی (#a7f3d0)</option>
          <option value="#bae6fd">آبی آسمانی (#bae6fd)</option>
          <option value="#fbcfe8">صورتی ملایم (#fbcfe8)</option>
        </select>
      </div>

      <div class="space-y-2 text-sm">
        <p>
          ۱. هایلایت ثابت با مقدار داینامیک:
          <span v-highlight="selectedColor">متن هایلایت شده با رنگ انتخابی</span>
        </p>
        <p>
          ۲. هایلایت فقط در زمان هاور (<code class="text-xs font-mono">v-highlight.hover</code>):
          <span
            v-highlight.hover="selectedColor"
            class="cursor-pointer border-b border-dashed border-border-medium"
          >
            ماوس را روی من بیاورید تا هایلایت شوم!
          </span>
        </p>
        <p>
          ۳. همراه با مودیفایر سایز بزرگ (<code class="text-xs font-mono">v-highlight.big</code>):
          <span v-highlight.big="'#fde047'">متن بزرگ و هایلایت شده</span>
        </p>
      </div>
    </div>
  </div>
</template>
