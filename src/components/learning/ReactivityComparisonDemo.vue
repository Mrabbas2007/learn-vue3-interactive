<script setup>
import { ref } from 'vue'
import { XCircle, CheckCircle2 } from '@lucide/vue'

// ۱. متغیر معمولی جاوااسکریپت (بدون واکنش‌پذیری)
let normalCount = 0

// ۲. متغیر واکنش‌پذیر ویو
const reactiveCount = ref(0)

// ارجاع مستقیم به المان بدون فعال کردن ری‌اکتیویتی ویو
const rawDomRef = ref(null)

function incrementNormal() {
  normalCount++
  // بدون تغییر هیچ متغیر واکنش‌پذیری، مستقیماً مقدار را در المان DOM می‌نویسیم
  // تا اثبات شود متغیر در حافظه RAM زیاد شده اما قالب Vue آن را آپدیت نمی‌کند!
  if (rawDomRef.value) {
    rawDomRef.value.textContent = normalCount
  }
}

function incrementRef() {
  reactiveCount.value++
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- تست متغیر معمولی (غیر واکنش‌پذیر) -->
    <div class="bg-white p-4 rounded-xl border border-rose-200/90 shadow-2xs flex flex-col justify-between">
      <div>
        <h4 class="font-bold text-sm text-rose-700 mb-2 flex items-center gap-1.5">
          <XCircle class="w-4 h-4 text-rose-500 shrink-0" />
          <span>متغیر معمولی جاوااسکریپت (let)</span>
        </h4>
        <p class="text-xs text-slate-500 mb-3 leading-relaxed">
          روی دکمه کلیک کنید؛ متغیر در حافظه RAM زیاد می‌شود اما قالب صفحه (DOM) تغییر نمی‌کند چون Vue متوجه تغییر متغیر معمولی نمی‌شود!
        </p>

        <div class="flex flex-wrap items-center gap-2 mb-3">
          <button
            @click="incrementNormal"
            type="button"
            class="px-3.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-lg transition-transform active:scale-95 cursor-pointer"
          >
            افزایش متغیر معمولی
          </button>
          <span class="text-xs font-mono bg-rose-50 border border-rose-200 text-rose-700 px-2.5 py-1 rounded-lg">
            رندر شده توسط Vue: <b>{{ normalCount }}</b>
          </span>
        </div>
      </div>

      <!-- نمایش مقدار واقعی در حافظه جاوااسکریپت -->
      <div class="text-[11px] text-slate-600 font-mono bg-slate-100 p-2.5 rounded-lg border border-slate-200 flex items-center justify-between">
        <span>مقدار در حافظه جاوااسکریپت (RAM):</span>
        <b ref="rawDomRef" class="text-rose-700 font-bold text-sm">0</b>
      </div>
    </div>

    <!-- تست متغیر ref (واکنش‌پذیر) -->
    <div class="bg-white p-4 rounded-xl border border-emerald-200/90 shadow-2xs flex flex-col justify-between">
      <div>
        <h4 class="font-bold text-sm text-emerald-700 mb-2 flex items-center gap-1.5">
          <CheckCircle2 class="w-4 h-4 text-emerald-600 shrink-0" />
          <span>متغیر واکنش‌پذیر Vue با ref()</span>
        </h4>
        <p class="text-xs text-slate-500 mb-3 leading-relaxed">
          روی دکمه کلیک کنید؛ پروکسی Vue بلافاصله تغییر را متوجه شده و قالب صفحه را همگام می‌سازد.
        </p>

        <div class="flex flex-wrap items-center gap-2 mb-3">
          <button
            @click="incrementRef"
            type="button"
            class="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-transform active:scale-95 cursor-pointer shadow-xs"
          >
            افزایش ref
          </button>
          <span class="text-xs font-mono font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-lg border border-emerald-200">
            رندر شده توسط Vue: <b>{{ reactiveCount }}</b>
          </span>
        </div>
      </div>

      <div class="text-[11px] text-slate-600 font-mono bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-200 flex items-center justify-between">
        <span>وضعیت همگام‌سازی با DOM:</span>
        <b class="text-emerald-700 font-bold text-xs">۱۰۰٪ خودکار و آنی</b>
      </div>
    </div>
  </div>
</template>
