<script setup>
import { ref } from 'vue'

const submitStatus = ref('')
const submitText = ref('')

function handleFormSubmit() {
  submitStatus.value = `فرم با مقدار "${submitText.value || 'خالی'}" با موفقیت ارسال شد و صفحه رفرش نشد!`
}
</script>

<template>
  <form @submit.prevent="handleFormSubmit" class="space-y-3">
    <div class="flex flex-col sm:flex-row gap-2">
      <input
        v-model="submitText"
        placeholder="چیزی بنویسید و ارسال کنید..."
        class="flex-1 px-3 py-1.5 border border-border-medium rounded-lg text-sm focus:outline-brand-500"
      />
      <button
        type="submit"
        class="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-2xs min-h-9"
      >
        ارسال با @submit.prevent
      </button>
    </div>
    <p
      v-if="submitStatus"
      class="text-xs text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-500/20 p-2.5 rounded-lg border border-emerald-200 dark:border-emerald-500/30"
    >
      {{ submitStatus }}
    </p>
  </form>
</template>
