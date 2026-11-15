<script setup>
defineProps({
  step: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="mb-8">
    <div
      class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-light text-primary-text border border-emerald-200 dark:border-emerald-500/30 mb-3"
    >
      <span>{{ step }}</span>
      <span>•</span>
      <span>{{ topic }}</span>
    </div>
    <h1 class="text-2xl sm:text-3xl font-extrabold text-text-main tracking-tight">
      {{ title }}
    </h1>
    <p class="text-text-body mt-2 text-sm sm:text-base leading-relaxed">
      {{ description }}
    </p>
  </div>
</template>
