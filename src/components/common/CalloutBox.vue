<script setup>
import { computed } from 'vue'
import { Lightbulb, AlertTriangle, Settings, Info } from '@lucide/vue'

const props = defineProps({
  type: {
    type: String,
    default: 'info',
    validator: (v) => ['tip', 'warning', 'info', 'under-the-hood'].includes(v),
  },
  title: {
    type: String,
    default: '',
  },
})

const styles = computed(() => {
  switch (props.type) {
    case 'tip':
      return {
        wrapper: 'bg-emerald-50/80 border-emerald-200 text-emerald-950',
        badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        title: 'text-emerald-900',
        icon: Lightbulb,
        iconColor: 'text-emerald-600',
        label: 'نکته کاربردی',
      }
    case 'warning':
      return {
        wrapper: 'bg-amber-50/80 border-amber-200 text-amber-950',
        badge: 'bg-amber-100 text-amber-800 border-amber-300',
        title: 'text-amber-900',
        icon: AlertTriangle,
        iconColor: 'text-amber-600',
        label: 'دام رایج (مراقب باشید)',
      }
    case 'under-the-hood':
      return {
        wrapper: 'bg-indigo-50/80 border-indigo-200 text-indigo-950',
        badge: 'bg-indigo-100 text-indigo-800 border-indigo-300',
        title: 'text-indigo-900',
        icon: Settings,
        iconColor: 'text-indigo-600',
        label: 'زیر کاپوت چطور کار می‌کند؟',
      }
    default:
      return {
        wrapper: 'bg-sky-50/80 border-sky-200 text-sky-950',
        badge: 'bg-sky-100 text-sky-800 border-sky-300',
        title: 'text-sky-900',
        icon: Info,
        iconColor: 'text-sky-600',
        label: 'توضیح مفهومی',
      }
  }
})
</script>

<template>
  <div :class="['border rounded-xl p-4 my-4 shadow-2xs transition-all', styles.wrapper]">
    <div class="flex items-center gap-2 mb-2 font-bold">
      <component :is="styles.icon" :class="['w-4 h-4 shrink-0', styles.iconColor]" />
      <span :class="['text-xs font-semibold px-2 py-0.5 rounded-md border', styles.badge]">
        {{ styles.label }}
      </span>
      <span v-if="title" :class="['text-sm font-bold', styles.title]">
        {{ title }}
      </span>
    </div>
    <div class="text-sm leading-relaxed space-y-1">
      <slot />
    </div>
  </div>
</template>
