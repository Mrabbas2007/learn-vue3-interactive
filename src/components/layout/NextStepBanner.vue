<script setup>
import { ArrowLeft } from '@lucide/vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  buttonText: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div
    class="mt-8 p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm border border-emerald-500/20"
  >
    <div>
      <h2 class="font-bold text-base">{{ title }}</h2>
      <p class="text-xs sm:text-sm text-emerald-50 mt-0.5">
        {{ description }}
      </p>
    </div>
    <router-link
      :to="to"
      class="px-4 py-2 bg-white text-emerald-950 hover:bg-emerald-50 hover:text-emerald-900 text-xs sm:text-sm font-bold rounded-xl transition-all shadow-sm shrink-0 flex items-center gap-1.5 cursor-pointer"
    >
      <span>{{ buttonText }}</span>
      <ArrowLeft class="w-4 h-4" />
    </router-link>
  </div>
</template>
