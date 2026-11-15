<script setup>
import { CheckCircle2, XCircle } from '@lucide/vue'
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- در زمان setup -->
    <div class="p-4 bg-danger-surface border border-danger-border rounded-xl">
      <h3 class="font-bold text-xs text-danger-text mb-1 flex items-center gap-1.5">
        <XCircle class="w-4 h-4 text-rose-500 shrink-0" />
        <span>در فاز Creation / setup():</span>
      </h3>
      <p class="text-xs text-danger-subtle mb-3">
        کدهای اسکریپت هنوز به فایل HTML متصل نشده‌اند:
      </p>
      <div
        class="p-2.5 bg-surface-card border border-danger-border rounded-lg text-xs font-mono text-danger-text"
      >
        inputRef.value === null
      </div>
      <p class="text-[11px] text-danger-subtle mt-2">
        نتیجه فراخوانی متد:
        <code class="font-mono font-bold">TypeError: Cannot read properties of null</code>
      </p>
    </div>

    <!-- در زمان onMounted -->
    <div class="p-4 bg-success-surface border border-success-border rounded-xl">
      <h3 class="font-bold text-xs text-success-text mb-1 flex items-center gap-1.5">
        <CheckCircle2 class="w-4 h-4 text-primary shrink-0" />
        <span>در فاز onMounted():</span>
      </h3>
      <p class="text-xs text-success-subtle mb-3">
        المان روی صفحه کشیده شده و آماده‌ی دریافت رویداد و فوکوس است:
      </p>
      <div
        class="p-2.5 bg-surface-card border border-success-border rounded-lg text-xs font-mono text-success-text"
      >
        inputRef.value === &lt;input class="..."&gt;
      </div>
      <p class="text-[11px] text-success-subtle mt-2">
        نتیجه: متدهایی مثل <code>.focus()</code> یا مقداردهی چارت‌ها با موفقیت کامل اجرا می‌شوند!
      </p>
    </div>
  </div>
</template>
