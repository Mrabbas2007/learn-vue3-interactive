<script setup>
import { ClipboardList } from '@lucide/vue'

const hooks = [
  {
    name: 'setup()',
    nameClass: 'text-primary-text',
    timing: 'اولین گام پس از تعریف',
    usage: 'تعریف متغیرهای ref و reactive، فرمول‌های computed',
    legacy: 'beforeCreate / created',
  },
  {
    name: 'onMounted',
    nameClass: 'text-teal-700 dark:text-teal-300',
    timing: 'پس از اتصال کامل به DOM',
    usage: 'درخواست‌های API اولیه، فوکوس ورودی، چارت‌ها و تایمرها',
    legacy: 'mounted',
  },
  {
    name: 'onUpdated',
    nameClass: 'text-amber-700 dark:text-amber-300',
    timing: 'پس از اعمال تغییرات در DOM',
    usage: 'واکنش به رندر مجدد المان‌ها، اسکرول خودکار به انتهای چت',
    legacy: 'updated',
  },
  {
    name: 'onUnmounted',
    nameClass: 'text-rose-700 dark:text-rose-300',
    timing: 'پس از حذف کامل از صفحه',
    usage: 'لغو تایمرها، پاک‌سازی رویداد‌های window، بستن سوکت‌ها',
    legacy: 'unmounted',
  },
]
</script>

<template>
  <div class="my-8 bg-surface-card border border-border-subtle rounded-2xl p-5 shadow-xs">
    <h3 class="text-base font-bold text-text-main mb-3 flex items-center gap-2">
      <ClipboardList class="w-4 h-4 text-primary-text shrink-0" />
      <span>جدول راهنمای سریع هوک‌های Lifecycle در Vue 3</span>
    </h3>
    <div class="overflow-x-auto">
      <table class="w-full text-right text-xs">
        <thead class="bg-surface-subtle text-text-body font-bold border-b border-border-subtle">
          <tr>
            <th class="p-2.5">هوک در Vue 3</th>
            <th class="p-2.5">زمان اجرا</th>
            <th class="p-2.5">کارهای مجاز و پیشنهادی</th>
            <th class="p-2.5 text-text-muted">معادل در Options API</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-border-subtle">
          <tr v-for="h in hooks" :key="h.name">
            <td :class="['p-2.5 font-mono font-bold', h.nameClass]">{{ h.name }}</td>
            <td class="p-2.5 text-text-body">{{ h.timing }}</td>
            <td class="p-2.5 text-text-body">{{ h.usage }}</td>
            <td class="p-2.5 font-mono text-text-subtle">{{ h.legacy }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
