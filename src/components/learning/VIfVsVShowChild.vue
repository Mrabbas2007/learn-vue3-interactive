<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Plus } from '@lucide/vue'

defineProps({
  type: {
    type: String,
    default: 'if', // 'if' or 'show'
  },
})

// وضعیت داخلی محلی کامپوننت (Local Internal State)
const message = ref('')
const counter = ref(0)
const mountTime = ref('')

onMounted(() => {
  mountTime.value = new Date().toLocaleTimeString('fa-IR')
})

onUnmounted(() => {
  // این فقط در v-if اجرا می‌شود نه در v-show!
})
</script>

<template>
  <div
    :class="[
      'p-3.5 rounded-xl border transition-all text-xs space-y-2.5',
      type === 'if'
        ? 'bg-rose-50/50 border-rose-200 text-rose-900'
        : 'bg-emerald-50/50 border-emerald-200 text-emerald-900',
    ]"
  >
    <div class="flex items-center justify-between">
      <span class="font-bold">کامپوننت فرزند مستقل (دارای حافظه محلی):</span>
      <span class="font-mono text-[10px] px-2 py-0.5 rounded bg-white/80 border">
        زمان ایجاد در DOM: {{ mountTime }}
      </span>
    </div>

    <div>
      <label class="block text-[11px] font-semibold mb-1">
        متنی در کادر بنویسید (در حافظه داخلی کامپوننت ذخیره می‌شود):
      </label>
      <input
        v-model="message"
        placeholder="مثلاً: اطلاعات مهم کاربر..."
        :class="[
          'w-full px-2.5 py-1.5 border rounded-lg bg-surface-card text-xs focus:outline-none',
          type === 'if'
            ? 'border-rose-300 focus:ring-1 focus:ring-rose-400'
            : 'border-emerald-300 focus:ring-1 focus:ring-emerald-400',
        ]"
      />
    </div>

    <div class="flex items-center justify-between pt-1 border-t border-black/5">
      <button
        @click="counter++"
        type="button"
        :class="[
          'px-2.5 py-1 text-white font-bold rounded-lg cursor-pointer transition-transform active:scale-95 flex items-center gap-1',
          type === 'if' ? 'bg-rose-600 hover:bg-rose-700' : 'bg-emerald-600 hover:bg-emerald-700',
        ]"
      >
        <Plus class="w-3.5 h-3.5" />
        <span>افزایش شمارنده داخلی</span>
      </button>

      <span class="font-mono font-bold bg-surface-card px-2.5 py-1 rounded-md border text-xs">
        شمارنده محلی: {{ counter }}
      </span>
    </div>
  </div>
</template>
