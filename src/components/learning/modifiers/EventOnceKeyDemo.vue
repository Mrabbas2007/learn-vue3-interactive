<script setup>
import { ref } from 'vue'

const onceClickCount = ref(0)
const enterKeyText = ref('')
const enterSubmitted = ref('')

function handleEnterSubmit() {
  enterSubmitted.value = enterKeyText.value
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- .once -->
    <div class="bg-surface-card p-3.5 rounded-xl border border-border-subtle">
      <h3 class="font-bold text-xs text-text-body mb-1">دکمه یک‌بار مصرف (@click.once):</h3>
      <p class="text-xs text-text-muted mb-2">هر چقدر روی دکمه کلیک کنید فقط بار اول شمرده می‌شود:</p>
      <div class="flex items-center gap-2">
        <button
          @click.once="onceClickCount++"
          type="button"
          class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg cursor-pointer min-h-9"
        >
          فقط بار اول کار می‌کنم!
        </button>
        <span
          class="text-xs font-mono font-bold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 px-2.5 py-1 rounded"
        >
          تعداد: {{ onceClickCount }}
        </span>
      </div>
    </div>

    <!-- @keydown.enter -->
    <div class="bg-surface-card p-3.5 rounded-xl border border-border-subtle">
      <h3 class="font-bold text-xs text-text-body mb-1">فشردن کلید اینتر (@keydown.enter):</h3>
      <input
        v-model="enterKeyText"
        @keydown.enter="handleEnterSubmit"
        placeholder="متن را بنویسید و کلید Enter را بزنید..."
        class="w-full px-3 py-1.5 border border-border-medium rounded-lg text-sm mb-2 focus:outline-brand-500"
      />
      <p v-if="enterSubmitted" class="text-xs text-primary-text font-mono">
        ثبت شد: "{{ enterSubmitted }}"
      </p>
    </div>
  </div>
</template>
