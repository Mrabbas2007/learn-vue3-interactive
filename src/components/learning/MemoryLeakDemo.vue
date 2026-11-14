<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  enableCleanup: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['tick'])

const seconds = ref(0)
let timerId = null
let isComponentMounted = true

onMounted(() => {
  isComponentMounted = true
  timerId = setInterval(() => {
    seconds.value++
    emit('tick', {
      seconds: seconds.value,
      alive: true,
      isMounted: isComponentMounted,
      time: new Date().toLocaleTimeString('fa-IR'),
    })
  }, 1000)
})

onUnmounted(() => {
  isComponentMounted = false
  if (props.enableCleanup) {
    // پاک‌سازی صحیح: متوقف کردن تایمر
    clearInterval(timerId)
    timerId = null
    emit('tick', {
      seconds: seconds.value,
      alive: false,
      isMounted: false,
      cleanedUp: true,
      time: new Date().toLocaleTimeString('fa-IR'),
    })
  } else {
    // عدم پاک‌سازی عمدی برای نمایش Memory Leak به کاربر!
    // تایمر به کار خود در پس‌زمینه ادامه می‌دهد
    emit('tick', {
      seconds: seconds.value,
      alive: false,
      isMounted: false,
      cleanedUp: false,
      time: new Date().toLocaleTimeString('fa-IR'),
    })
  }
})
</script>

<template>
  <div class="p-4 bg-amber-50 border border-amber-200 rounded-xl my-2">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
        <span class="text-xs font-bold text-amber-900">تایمر زنده فعال است:</span>
      </div>
      <span class="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-2.5 py-1 rounded-md border border-amber-300">
        {{ seconds }} ثانیه سپری شد
      </span>
    </div>
  </div>
</template>
