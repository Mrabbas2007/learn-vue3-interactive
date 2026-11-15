<script setup>
import { ref, computed } from 'vue'

const price = ref(100000)
const discountPercent = ref(15)

const finalPrice = computed(() => {
  const discountAmount = (price.value * discountPercent.value) / 100
  return price.value - discountAmount
})
</script>

<template>
  <div class="bg-surface-card p-4 rounded-xl border border-border-subtle space-y-3">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div>
        <label class="block text-xs font-bold text-text-body mb-1">قیمت اولیه (تومان):</label>
        <input
          v-model.number="price"
          type="number"
          class="w-full px-3 py-1.5 border border-border-medium rounded-lg text-sm focus:outline-brand-500"
        />
      </div>
      <div>
        <label class="block text-xs font-bold text-text-body mb-1">درصد تخفیف:</label>
        <input
          v-model.number="discountPercent"
          type="number"
          min="0"
          max="100"
          class="w-full px-3 py-1.5 border border-border-medium rounded-lg text-sm focus:outline-brand-500"
        />
      </div>
    </div>
    <div
      class="p-3 bg-primary-light border border-emerald-200 dark:border-emerald-500/30 rounded-lg flex items-center justify-between text-sm"
    >
      <span class="text-emerald-900 dark:text-emerald-300 font-medium">
        مبلغ نهایی محاسبه شده توسط computed:
      </span>
      <span class="font-extrabold text-primary-text font-mono text-base">
        {{ finalPrice.toLocaleString() }} تومان
      </span>
    </div>
  </div>
</template>
