<script setup>
import { ref } from 'vue'

const lazyText = ref('')
const normalInputVal = ref('25')
const numberValue = ref(25)
const trimmedText = ref('')
</script>

<template>
  <div class="space-y-4">
    <!-- .lazy -->
    <div class="p-3 bg-surface-card rounded-xl border border-border-subtle">
      <h3 class="font-bold text-xs text-text-body mb-1">
        ۱) مودیفایر .lazy (همگام‌سازی پس از خارج شدن فوکوس یا اینتر):
      </h3>
      <div class="flex flex-col sm:flex-row gap-2 items-center">
        <input
          v-model.lazy="lazyText"
          placeholder="تایپ کنید و سپس در جای دیگری کلیک کنید..."
          class="flex-1 px-3 py-1.5 border border-border-medium rounded-lg text-sm w-full focus:outline-brand-500"
        />
        <span class="text-xs font-mono bg-surface-subtle text-text-body px-3 py-1.5 rounded-lg border w-full sm:w-auto">
          مقدار متغیر: <b class="text-primary-text">{{ lazyText || '—' }}</b>
        </span>
      </div>
    </div>

    <!-- .number -->
    <div class="p-3 bg-surface-card rounded-xl border border-border-subtle space-y-3">
      <h3 class="font-bold text-xs text-text-body">
        ۲) مودیفایر .number (تبدیل خودکار به عدد واقعی در جاوااسکریپت):
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <!-- ورودی معمولی -->
        <div class="p-2.5 bg-surface-subtle rounded-lg border border-border-subtle">
          <label class="block text-[11px] font-bold text-text-body mb-1">
            بدون .number (رفتار پیش‌فرض HTML):
          </label>
          <input
            v-model="normalInputVal"
            class="w-full px-2.5 py-1 border border-border-medium rounded text-xs mb-1 bg-surface-card focus:outline-brand-500"
          />
          <div class="text-[11px] font-mono text-text-body">
            نوع: <b class="text-rose-600 dark:text-rose-400">{{ typeof normalInputVal }}</b> | مقدار:
            <b class="text-text-main">"{{ normalInputVal }}"</b>
          </div>
        </div>

        <!-- ورودی با .number -->
        <div
          class="p-2.5 bg-emerald-50/50 dark:bg-emerald-500/12 rounded-lg border border-emerald-200 dark:border-emerald-500/30"
        >
          <label class="block text-[11px] font-bold text-emerald-800 dark:text-emerald-300 mb-1">
            همراه با v-model.number:
          </label>
          <input
            v-model.number="numberValue"
            class="w-full px-2.5 py-1 border border-emerald-300 dark:border-emerald-500/30 rounded text-xs mb-1 bg-surface-card focus:outline-brand-500"
          />
          <div class="text-[11px] font-mono text-text-body">
            نوع: <b class="text-primary-text">{{ typeof numberValue }}</b> | مقدار:
            <b class="text-text-main">{{ numberValue }}</b>
          </div>
        </div>
      </div>
      <p class="text-[11px] text-text-muted">
        نکته: اگر متنی غیرعددی تایپ شود، Vue به‌صورت خودکار مقدار را به‌عنوان رشته اولیه نگه می‌دارد (Fallback).
      </p>
    </div>

    <!-- .trim -->
    <div class="p-3 bg-surface-card rounded-xl border border-border-subtle">
      <h3 class="font-bold text-xs text-text-body mb-1">
        ۳) مودیفایر .trim (حذف فاصله‌های خالی ابتدا و انتها):
      </h3>
      <div class="flex flex-col sm:flex-row gap-2 items-center">
        <input
          v-model.trim="trimmedText"
          placeholder="چند فاصله قبل و بعد تایپ کنید..."
          class="flex-1 px-3 py-1.5 border border-border-medium rounded-lg text-sm w-full focus:outline-brand-500"
        />
        <span class="text-xs font-mono bg-surface-subtle text-text-body px-3 py-1.5 rounded-lg border w-full sm:w-auto">
          طول رشته (length): <b class="text-primary-text">{{ trimmedText.length }}</b> | مقدار:
          <b class="text-primary-text">"{{ trimmedText }}"</b>
        </span>
      </div>
    </div>
  </div>
</template>
