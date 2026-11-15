<script setup>
import { ref, reactive } from 'vue'

const userRef = ref({ name: 'سارا', age: 25 })
const primitiveRef = ref(100)
const userReactive = reactive({ name: 'علی', age: 30 })
const destructureLog = ref('برای مشاهده تله Destructure روی دکمه آزمایشی کلیک کنید.')

function incrementRefAge() {
  userRef.value.age++
}

function incrementPrimitiveRef() {
  primitiveRef.value += 10
}

function incrementReactiveDirect() {
  userReactive.age++
  destructureLog.value = `مستقیم تغییر کرد: سن علی شد ${userReactive.age} و قالب صفحه همگام شد.`
}

function testDestructureTrap() {
  let { age } = userReactive
  age += 10
  destructureLog.value = `⚠️ تله Destructure: متغیر محلی age شد ${age}، اما چون مقدار خصیصه کپی شد و ارتباطش با شیء واکنش‌پذیر قطع شد، سن علی در تمپلیت (${userReactive.age}) تغییر نکرد!`
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- ref demo -->
    <div
      class="bg-surface-card p-4 rounded-xl border border-border-subtle flex flex-col justify-between"
    >
      <div>
        <span class="text-xs font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
          ۱) متغیرهای ref (همه‌منظوره):
        </span>
        <p class="text-xs text-text-muted mb-2">هم برای انواع داده اولیه (عدد، رشته) و هم برای شیءها:</p>

        <div class="p-2.5 bg-surface-subtle rounded-lg border border-border-subtle mb-2 space-y-1 text-xs">
          <div>
            شیء: <b>{{ userRef.name }}</b> — سن:
            <b class="text-primary-text font-mono">{{ userRef.age }}</b>
          </div>
          <div>
            عدد اولیه: <b class="text-primary-text font-mono">{{ primitiveRef }}</b>
          </div>
        </div>

        <div class="flex flex-wrap gap-2 mb-2">
          <button
            @click="incrementRefAge"
            type="button"
            class="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg cursor-pointer min-h-9"
          >
            افزایش سن شیء (userRef.value.age++)
          </button>
          <button
            @click="incrementPrimitiveRef"
            type="button"
            class="px-2.5 py-1 bg-surface-hover hover:bg-border-medium text-text-body text-xs font-bold rounded-lg cursor-pointer min-h-9"
          >
            افزایش عدد اولیه (primitiveRef.value += 10)
          </button>
        </div>
      </div>
      <p class="text-[11px] text-primary-text bg-primary-light p-1.5 rounded border border-brand-200">
        توصیه رسمی: پیش‌فرض را ref بگذارید؛ هر نوع داده‌ای را می‌پذیرد و برخلاف reactive با Destructure کردنِ
        خواصش واکنش‌پذیری را از دست نمی‌دهد.
      </p>
    </div>

    <!-- reactive demo -->
    <div
      class="bg-surface-card p-4 rounded-xl border border-border-subtle flex flex-col justify-between"
    >
      <div>
        <span class="text-xs font-bold text-teal-800 dark:text-teal-300 block mb-1">
          ۲) متغیرهای reactive (فقط شیء):
        </span>
        <p class="text-xs text-text-muted mb-2">فقط برای آبجکت و آرایه است و نیازی به .value ندارد:</p>

        <div class="p-2.5 bg-surface-subtle rounded-lg border border-border-subtle mb-2 text-xs">
          <div>
            شیء: <b>{{ userReactive.name }}</b> — سن:
            <b class="text-teal-700 dark:text-teal-300 font-mono">{{ userReactive.age }}</b>
          </div>
        </div>

        <div class="flex flex-wrap gap-2 mb-2">
          <button
            @click="incrementReactiveDirect"
            type="button"
            class="px-2.5 py-1 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg cursor-pointer min-h-9"
          >
            افزایش مستقیم (userReactive.age++)
          </button>
          <button
            @click="testDestructureTrap"
            type="button"
            class="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg cursor-pointer min-h-9"
          >
            تست تله Destructure ({ age } = state)
          </button>
        </div>
      </div>
      <p
        class="text-[11px] text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-500/10 p-1.5 rounded border border-amber-200 dark:border-amber-500/30 font-mono"
      >
        {{ destructureLog }}
      </p>
    </div>
  </div>
</template>
