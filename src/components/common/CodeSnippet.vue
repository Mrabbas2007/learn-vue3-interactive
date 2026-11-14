<script setup>
import { ref, useSlots, computed } from 'vue'
import { Copy, Check } from '@lucide/vue'

const props = defineProps({
  code: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  lang: {
    type: String,
    default: 'vue',
  },
})

const copied = ref(false)
const slots = useSlots()

const codeContent = computed(() => {
  if (props.code) return props.code.trim()
  if (slots.default) {
    const raw = slots.default()
    return raw
      .map((node) => (typeof node.children === 'string' ? node.children : ''))
      .join('')
      .trim()
  }
  return ''
})

async function copyCode() {
  try {
    await navigator.clipboard.writeText(codeContent.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('کپی انجام نشد:', err)
  }
}
</script>

<template>
  <div class="my-3 rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-sm text-left">
    <!-- هدر کد با عنوان و دکمه کپی -->
    <div class="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/90 text-xs font-mono text-slate-400">
      <div class="flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
        <span v-if="title" class="ml-2 text-slate-300 font-semibold text-xs">{{ title }}</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="uppercase tracking-wider text-[11px] text-slate-500 font-semibold">{{ lang }}</span>
        <button
          @click="copyCode"
          type="button"
          class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-sans transition-colors cursor-pointer flex items-center gap-1.5 border border-slate-700"
        >
          <span v-if="copied" class="text-emerald-400 font-bold flex items-center gap-1">
            <Check class="w-3.5 h-3.5" />
            <span>کپی شد!</span>
          </span>
          <span v-else class="flex items-center gap-1 text-slate-300">
            <Copy class="w-3.5 h-3.5 text-slate-400" />
            <span>کپی کد</span>
          </span>
        </button>
      </div>
    </div>

    <!-- محتوای کد (کاملاً LTR) -->
    <pre class="p-4 text-xs sm:text-sm text-emerald-300 font-mono overflow-x-auto whitespace-pre leading-relaxed select-all"><code>{{ codeContent }}</code></pre>
  </div>
</template>
