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
        wrapper: 'bg-emerald-50/80 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-950 dark:text-emerald-200',
        badge: 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-500/40',
        title: 'text-emerald-900 dark:text-emerald-200',
        icon: Lightbulb,
        iconColor: 'text-primary-text',
        label: 'نکته کاربردی',
      }
    case 'warning':
      return {
        wrapper: 'bg-amber-50/80 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30 text-amber-950 dark:text-amber-200',
        badge: 'bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-500/40',
        title: 'text-amber-900 dark:text-amber-200',
        icon: AlertTriangle,
        iconColor: 'text-amber-600 dark:text-amber-400',
        label: 'دام رایج (مراقب باشید)',
      }
    case 'under-the-hood':
      return {
        wrapper: 'bg-indigo-50/80 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/30 text-indigo-950 dark:text-indigo-200',
        badge: 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-800 dark:text-indigo-200 border-indigo-300 dark:border-indigo-500/40',
        title: 'text-indigo-900 dark:text-indigo-200',
        icon: Settings,
        iconColor: 'text-indigo-600 dark:text-indigo-400',
        label: 'زیر کاپوت چطور کار می‌کند؟',
      }
    default:
      return {
        wrapper: 'bg-sky-50/80 dark:bg-sky-500/10 border-sky-200 dark:border-sky-500/30 text-sky-950 dark:text-sky-200',
        badge: 'bg-sky-100 dark:bg-sky-500/20 text-sky-800 dark:text-sky-200 border-sky-300 dark:border-sky-500/40',
        title: 'text-sky-900 dark:text-sky-200',
        icon: Info,
        iconColor: 'text-sky-600 dark:text-sky-400',
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
