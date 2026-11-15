<script setup>
import { ref } from 'vue'

const vModelDemo = ref('سلام دنیا')
const manualModelDemo = ref('سلام دنیا')
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- با v-model -->
    <div class="bg-surface-card p-4 rounded-xl border border-border-subtle">
      <h3 class="font-bold text-xs text-text-body mb-2">روش معمول (با v-model):</h3>
      <input
        v-model="vModelDemo"
        class="w-full px-3 py-1.5 border border-border-medium rounded-lg text-sm mb-2 focus:outline-brand-500"
      />
      <p class="text-xs text-text-muted">
        مقدار در متغیر: <b class="text-text-main">{{ vModelDemo }}</b>
      </p>
    </div>

    <!-- روش دستی -->
    <div class="bg-surface-card p-4 rounded-xl border border-border-subtle">
      <h3 class="font-bold text-xs text-text-body mb-2">روش معادل دستی (:value + @input):</h3>
      <input
        :value="manualModelDemo"
        @input="manualModelDemo = $event.target.value"
        class="w-full px-3 py-1.5 border border-border-medium rounded-lg text-sm mb-2 focus:outline-brand-500"
      />
      <p class="text-xs text-text-muted">
        مقدار در متغیر: <b class="text-text-main">{{ manualModelDemo }}</b>
      </p>
    </div>
  </div>
</template>
