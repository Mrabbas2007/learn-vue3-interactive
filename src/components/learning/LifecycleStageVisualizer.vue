<script setup>
import { Sprout, Layers, Zap, Trash2 } from '@lucide/vue'

defineProps({
  activeStage: {
    type: String,
    default: 'idle', // 'idle' | 'create' | 'mount' | 'update' | 'unmount'
  },
})

const stages = [
  {
    id: 'create',
    title: '۱. آفرینش (Creation)',
    hooks: ['setup() / <script setup>'],
    desc: 'تعریف متغیرها و توابع. هنوز هیچ المان HTML در صفحه وجود ندارد!',
    icon: Sprout,
    iconColor: 'text-brand-500',
  },
  {
    id: 'mount',
    title: '۲. ورود به صفحه (Mount)',
    hooks: ['onBeforeMount', 'onMounted'],
    desc: 'المان به درخت DOM وصل می‌شود و در صفحه ظاهر می‌گردد (لحظه طلایی اتصال به سرور).',
    icon: Layers,
    iconColor: 'text-teal-500',
  },
  {
    id: 'update',
    title: '۳. به‌روزرسانی (Update)',
    hooks: ['onBeforeUpdate', 'onUpdated'],
    desc: 'متغیر واکنش‌پذیر تغییر می‌کند و ظاهر صفحه مجدداً بازنویسی (Re-render) می‌شود.',
    icon: Zap,
    iconColor: 'text-amber-500',
  },
  {
    id: 'unmount',
    title: '۴. خروج و تخریب (Unmount)',
    hooks: ['onBeforeUnmount', 'onUnmounted'],
    desc: 'المان از صفحه پاک می‌شود. زمان توقف تایمرها و تمیزکاری پشت صحنه.',
    icon: Trash2,
    iconColor: 'text-rose-500',
  },
]
</script>

<template>
  <div class="my-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <div
        v-for="st in stages"
        :key="st.id"
        :class="[
          'relative p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between',
          activeStage === st.id
            ? 'bg-surface-card border-emerald-500 shadow-md ring-2 ring-emerald-400/30 -translate-y-1'
            : 'bg-slate-50/70 border-border-subtle opacity-75 hover:opacity-100',
        ]"
      >
        <!-- نشانگر اجرای زنده -->
        <div v-if="activeStage === st.id" class="absolute -top-2.5 right-4">
          <span class="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow-2xs animate-pulse">
            <span class="w-1.5 h-1.5 rounded-full bg-surface-card"></span>
            <span>در حال اجرا</span>
          </span>
        </div>

        <div>
          <!-- آیکون و عنوان مرحله -->
          <div class="flex items-center gap-2 mb-2">
            <component :is="st.icon" :class="['w-5 h-5 shrink-0', st.iconColor]" />
            <h3 class="text-xs sm:text-sm font-bold text-text-main">
              {{ st.title }}
            </h3>
          </div>

          <!-- هوک‌های مربوطه -->
          <div class="flex flex-wrap gap-1 mb-2">
            <span
              v-for="h in st.hooks"
              :key="h"
              class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface-card text-text-body border border-border-subtle"
            >
              {{ h }}
            </span>
          </div>

          <!-- توضیحات کوتاه -->
          <p class="text-[11px] text-text-muted leading-relaxed">
            {{ st.desc }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
