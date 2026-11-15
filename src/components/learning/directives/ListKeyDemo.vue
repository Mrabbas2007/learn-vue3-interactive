<script setup>
import { ref } from 'vue'
import { Trash2 } from '@lucide/vue'

let nextFruitId = 5
const fruits = ref([
  { id: 1, name: 'سیب' },
  { id: 2, name: 'پرتقال' },
  { id: 3, name: 'موز' },
  { id: 4, name: 'انگور' },
])
const newFruit = ref('')

function addFruit() {
  if (newFruit.value.trim()) {
    fruits.value.push({
      id: nextFruitId++,
      name: newFruit.value.trim(),
    })
    newFruit.value = ''
  }
}

function removeFruit(id) {
  fruits.value = fruits.value.filter((fruit) => fruit.id !== id)
}
</script>

<template>
  <div class="space-y-3">
    <!-- فرم افزودن آیتم -->
    <form @submit.prevent="addFruit" class="flex gap-2">
      <input
        v-model="newFruit"
        placeholder="نام میوه جدید را بنویسید..."
        class="flex-1 px-3 py-1.5 border border-border-medium rounded-lg text-sm focus:outline-brand-500"
      />
      <button
        type="submit"
        class="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-2xs min-h-9"
      >
        افزودن به لیست
      </button>
    </form>

    <!-- لیست میوه‌ها -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
      <div
        v-for="(fruit, index) in fruits"
        :key="fruit.id"
        class="flex items-center justify-between p-2.5 bg-surface-card border border-border-subtle rounded-xl text-sm"
      >
        <span class="font-semibold text-text-main">
          <span class="text-xs text-text-subtle font-mono ml-1">{{ index + 1 }}.</span>
          {{ fruit.name }}
          <span
            class="text-[10px] font-mono text-primary-text bg-primary-light px-1.5 py-0.5 rounded border border-brand-200 mr-1.5"
          >
            id: {{ fruit.id }}
          </span>
        </span>
        <button
          @click="removeFruit(fruit.id)"
          type="button"
          class="text-xs text-rose-500 hover:text-rose-700 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-500/20 px-2 py-1 rounded transition-colors cursor-pointer flex items-center gap-1"
        >
          <Trash2 class="w-3.5 h-3.5" />
          <span>حذف</span>
        </button>
      </div>
    </div>
  </div>
</template>
