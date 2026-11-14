<script setup>
import { ref } from 'vue'
import {
  Sparkles,
  Play,
  Trash2,
  RotateCcw,
  Check,
  X,
  CheckCircle2,
  XCircle,
  ClipboardList,
  ArrowLeft,
} from '@lucide/vue'
import ConceptCard from '../components/common/ConceptCard.vue'
import CodeSnippet from '../components/common/CodeSnippet.vue'
import CalloutBox from '../components/common/CalloutBox.vue'
import LifecycleStageVisualizer from '../components/learning/LifecycleStageVisualizer.vue'
import LifecycleDemoChild from '../components/learning/LifecycleDemoChild.vue'
import MemoryLeakDemo from '../components/learning/MemoryLeakDemo.vue'

// -------------------------------------------------------------
// نمونه کدهای آموزشی
// -------------------------------------------------------------
const lifecycleHooksCode = `import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue'

// ۱. فاز راه‌اندازی (Creation): خود بدنه <script setup> است!

// ۲. فاز اتصال به DOM
onBeforeMount(() => {
  console.log('قبل از چسبیدن به DOM')
})

onMounted(() => {
  // لحظه طلایی: المان در صفحه است
  // مناسب برای فراخوانی API و دسترسی به DOM
  console.log('کامپوننت به صفحه متصل شد!')
})

// ۳. فاز به‌روزرسانی
onBeforeUpdate(() => {
  console.log('متغیر عوض شد، قبل از رندر مجدد')
})

onUpdated(() => {
  console.log('صفحه دوباره رندر شد')
})

// ۴. فاز خروج و پاک‌سازی
onBeforeUnmount(() => {
  console.log('قبل از حذف کامپوننت')
})

onUnmounted(() => {
  // بسیار مهم برای پاک‌سازی تایمرها و لیسنرها
  console.log('کامپوننت کاملاً حذف شد')
})`

const domAccessCode = `import { ref, onMounted } from 'vue'

const inputRef = ref(null)

// اشتباه رایج مبتدی‌ها (خطای زمان اجرا):
// در اینجا مقدار inputRef.value هنوز null است!
// inputRef.value.focus() // خطا: Cannot read properties of null

// روش صحیح: صبر کردن تا زمان اتصال کامل به DOM:
onMounted(() => {
  inputRef.value.focus() // بدون باگ اجرا می‌شود!
})`

const cleanupCode = `import { onMounted, onUnmounted } from 'vue'

let timer = null

onMounted(() => {
  timer = setInterval(() => {
    console.log('تیک‌تاک')
  }, 1000)
})

onUnmounted(() => {
  // اگر این خط را ننویسید، تایمر تا ابد رم مرورگر را پر می‌کند!
  clearInterval(timer)
})`

// -------------------------------------------------------------
// متغیرهای شبیه‌ساز زنده (Simulator State)
// -------------------------------------------------------------
const isComponentMounted = ref(true)
const activeStage = ref('idle')
const logs = ref([])

function handleHookTriggered(event) {
  activeStage.value = event.phase
  logs.value.unshift(event)
}

function mountComponent() {
  isComponentMounted.value = true
}

function unmountComponent() {
  isComponentMounted.value = false
  activeStage.value = 'unmount'
}

function clearLogs() {
  logs.value = []
  activeStage.value = 'idle'
}

// -------------------------------------------------------------
// متغیرهای آزمایشگاه Memory Leak
// -------------------------------------------------------------
const showTimerComponent = ref(true)
const enableCleanup = ref(true)
const timerLog = ref('🟢 کامپوننت تایمر در صفحه فعال است...')
const isLeaking = ref(false)

function handleTimerTick(data) {
  if (data.isMounted) {
    isLeaking.value = false
    timerLog.value = `🟢 کامپوننت در صفحه زنده است: ثانیه ${data.seconds} (زمان: ${data.time})`
  } else if (data.cleanedUp) {
    isLeaking.value = false
    timerLog.value = `✅ کامپوننت با موفقیت بسته شد و تایمر با clearInterval در onUnmounted متوقف گردید (رم کاملاً پاک شد).`
  } else {
    isLeaking.value = true
    timerLog.value = `🚨 نشت حافظه (Memory Leak) فعال است! کامپوننت از درخت DOM حذف شد اما تایمر یتیم همچنان در RAM زنده است: ثانیه ${data.seconds}`
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <!-- هدر صفحه -->
    <div class="mb-8">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-light text-primary-text border border-emerald-200 dark:border-emerald-500/30 mb-3">
        <span>گام ویژه نقشه راه</span>
        <span>•</span>
        <span>حیات و ممات کامپوننت</span>
      </div>
      <h1 class="text-2xl sm:text-3xl font-extrabold text-text-main tracking-tight">
        چرخه‌ی حیات (Lifecycle Hooks) در Vue 3
      </h1>
      <p class="text-text-body mt-2 text-sm sm:text-base leading-relaxed">
        هر کامپوننت در Vue درست مثل یک موجود زنده یک چرخه‌ی حیات دارد: متولد می‌شود، به صفحه وصل می‌شود، با تغییر داده‌ها ظاهر خود را تغییر می‌دهد، و در نهایت از بین می‌رود.
      </p>
    </div>

    <!-- معرفی بصری با استعاره تئاتر -->
    <div class="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-900 text-white rounded-3xl border border-slate-800 shadow-md mb-8">
      <div class="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
        <Sparkles class="w-4 h-4 shrink-0 text-emerald-400" />
        <span>استعاره‌ی صحنه تئاتر: لایف سایکل چیست؟</span>
      </div>
      <h3 class="text-lg sm:text-xl font-bold mb-3 text-slate-100">
        یک کامپوننت چگونه روی صفحه به نمایش درمی‌آید؟
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs leading-relaxed text-slate-300">
        <div class="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
          <span class="text-emerald-400 font-bold block mb-1">۱. پشت صحنه (Creation):</span>
          بازیگر متن دیالوگ را می‌خواند (کدهای جاوااسکریپت اجرا می‌شوند). تماشاگران هنوز چیزی نمی‌بینند!
        </div>
        <div class="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
          <span class="text-teal-400 font-bold block mb-1">۲. ورود به صحنه (Mount):</span>
          بازیگر وارد نورافکن می‌شود (المان به DOM وصل می‌شود). از این لحظه به بعد بازیگر دیده می‌شود!
        </div>
        <div class="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
          <span class="text-amber-400 font-bold block mb-1">۳. بازی و تغییر (Update):</span>
          به کنش‌ها پاسخ می‌دهد و حرکت می‌کند (با تغییر متغیر، صفحه رندر مجدد می‌شود).
        </div>
        <div class="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
          <span class="text-rose-400 font-bold block mb-1">۴. خروج از صحنه (Unmount):</span>
          بازیگر صحنه را ترک می‌کند و چراغ‌ها خاموش می‌شوند (پاک‌سازی منابع و تایمرها).
        </div>
      </div>
    </div>

    <!-- ========================================================= -->
    <!-- آزمایشگاه ۱: شبیه‌ساز زنده تعاملی -->
    <!-- ========================================================= -->
    <ConceptCard
      title="۱. آزمایشگاه تعاملی: شبیه‌ساز زنده چرخه‌ی حیات"
      badge="تست زنده تعاملی"
      description="با دکمه‌های زیر کامپوننت را در صحنه متولد، به‌روزرسانی و حذف کنید تا روشن شدن مراحل در دیاگرام و ثبت لاگ‌ها را در لحظه مشاهده نمایید."
    >
      <template #demo>
        <div>
          <!-- دیاگرام مراحل لایف‌سایکل -->
          <LifecycleStageVisualizer :active-stage="activeStage" />

          <!-- پنل دکمه‌های کنترل -->
          <div class="flex flex-wrap items-center justify-between gap-2 p-3 bg-surface-card border border-border-subtle rounded-xl mb-4">
            <div class="flex flex-wrap items-center gap-2">
              <button
                v-if="!isComponentMounted"
                @click="mountComponent"
                type="button"
                class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Play class="w-3.5 h-3.5 fill-current" />
                <span>متولد کردن کامپوننت (Mount)</span>
              </button>

              <button
                v-else
                @click="unmountComponent"
                type="button"
                class="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Trash2 class="w-3.5 h-3.5" />
                <span>حذف کامپوننت از صفحه (Unmount)</span>
              </button>
            </div>

            <button
              @click="clearLogs"
              type="button"
              class="px-3 py-1.5 bg-surface-subtle hover:bg-slate-200 text-text-body text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw class="w-3.5 h-3.5" />
              <span>پاک‌سازی کنسول لاگ‌ها</span>
            </button>
          </div>

          <!-- کامپوننت فرزند زنده (در صورت فعال بودن) -->
          <div v-if="isComponentMounted" class="transition-all">
            <LifecycleDemoChild @hook-triggered="handleHookTriggered" />
          </div>
          <div
            v-else
            class="p-6 bg-surface-subtle border-2 border-dashed border-border-medium rounded-2xl text-center text-text-muted text-xs my-3 font-mono"
          >
            کامپوننت در حال حاضر در درخت DOM وجود ندارد (Unmounted). برای تولد مجدد روی دکمه "متولد کردن" کلیک کنید.
          </div>

          <!-- کنسول وقایع زنده (Live Event Log) -->
          <div class="mt-4 rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-sm text-left">
            <div class="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/90 text-xs font-mono text-text-subtle">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-brand-500 animate-pulse"></span>
                <span class="text-slate-300 font-bold font-sans">کنسول ثبت آنی رویدادهای Lifecycle</span>
              </div>
              <span class="text-[11px] text-text-muted font-mono">تعداد رویداد: {{ logs.length }}</span>
            </div>

            <div class="p-3 max-h-56 overflow-y-auto space-y-2 font-mono text-xs">
              <div
                v-for="(item, idx) in logs"
                :key="idx"
                class="p-2 rounded bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div class="flex items-center gap-2">
                  <span class="text-[10px] text-text-muted">{{ item.time }}</span>
                  <span
                    :class="[
                      'px-2 py-0.5 rounded text-[11px] font-bold',
                      item.phase === 'create' && 'bg-emerald-950 text-emerald-400 border border-emerald-800',
                      item.phase === 'mount' && 'bg-teal-950 text-teal-400 border border-teal-800',
                      item.phase === 'update' && 'bg-amber-950 text-amber-400 border border-amber-800',
                      item.phase === 'unmount' && 'bg-rose-950 text-rose-400 border border-rose-800',
                    ]"
                  >
                    {{ item.hook }}
                  </span>
                  <span class="text-slate-300 font-sans text-xs">{{ item.details }}</span>
                </div>

                <span
                  :class="[
                    'text-[10px] px-1.5 py-0.5 rounded shrink-0 font-sans flex items-center gap-1',
                    item.domReady ? 'text-emerald-400 bg-emerald-950/60' : 'text-text-muted bg-slate-800/60',
                  ]"
                >
                  <Check v-if="item.domReady" class="w-3 h-3" />
                  <X v-else class="w-3 h-3" />
                  <span>{{ item.domReady ? 'دسترسی به DOM: بله' : 'دسترسی به DOM: خیر' }}</span>
                </span>
              </div>

              <div v-if="logs.length === 0" class="text-text-muted text-center py-4 font-sans text-xs">
                هنوز رویدادی ثبت نشده است. روی دکمه‌های بالا کلیک کنید!
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #code>
        <CodeSnippet
          title="سینتکس کامل هوک‌های Lifecycle در Composition API"
          :code="lifecycleHooksCode"
        />
      </template>
    </ConceptCard>

    <!-- ========================================================= -->
    <!-- آزمایشگاه ۲: چرا در setup نباید به DOM دسترسی پیدا کنیم؟ -->
    <!-- ========================================================= -->
    <ConceptCard
      title="۲. آزمایش دسترسی به DOM — چرا در setup المان‌ها هنوز null هستند؟"
      badge="خطای رایج مبتدی‌ها"
      description="یکی از پرتکرارترین خطاهای مبتدی‌ها، تلاش برای دسترسی به المان HTML یا کامپوننت قبل از اجرای onMounted است."
    >
      <template #demo>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- در زمان setup -->
          <div class="p-4 bg-rose-50/70 border border-rose-200 dark:border-rose-500/30 rounded-xl">
            <h3 class="font-bold text-xs text-rose-800 dark:text-rose-300 mb-1 flex items-center gap-1.5">
              <XCircle class="w-4 h-4 text-rose-500 shrink-0" />
              <span>در فاز Creation / setup():</span>
            </h3>
            <p class="text-xs text-rose-900/80 mb-3">
              کدهای اسکریپت هنوز به فایل HTML متصل نشده‌اند:
            </p>
            <div class="p-2.5 bg-surface-card border border-rose-200 dark:border-rose-500/30 rounded-lg text-xs font-mono text-rose-700 dark:text-rose-300">
              inputRef.value === null
            </div>
            <p class="text-[11px] text-rose-600 mt-2">
              نتیجه فراخوانی متد: <code class="font-mono font-bold">TypeError: Cannot read properties of null</code>
            </p>
          </div>

          <!-- در زمان onMounted -->
          <div class="p-4 bg-emerald-50/70 border border-emerald-200 dark:border-emerald-500/30 rounded-xl">
            <h3 class="font-bold text-xs text-emerald-800 dark:text-emerald-300 mb-1 flex items-center gap-1.5">
              <CheckCircle2 class="w-4 h-4 text-primary-text shrink-0" />
              <span>در فاز onMounted():</span>
            </h3>
            <p class="text-xs text-emerald-900/80 mb-3">
              المان روی صفحه کشیده شده و آماده‌ی دریافت رویداد و فوکوس است:
            </p>
            <div class="p-2.5 bg-surface-card border border-emerald-200 dark:border-emerald-500/30 rounded-lg text-xs font-mono text-primary-text">
              inputRef.value === &lt;input class="..."&gt;
            </div>
            <p class="text-[11px] text-primary-text mt-2">
              نتیجه: متدهایی مثل <code>.focus()</code> یا مقداردهی چارت‌ها با موفقیت کامل اجرا می‌شوند!
            </p>
          </div>
        </div>
      </template>

      <template #code>
        <CodeSnippet
          title="نحوه صحیح ارجاع به المان در onMounted"
          :code="domAccessCode"
        />
      </template>

      <template #callout>
        <CalloutBox type="warning" title="قانون طلایی اتصال به سرور (API Fetching)">
          بهترین جا برای صدا زدن API یا دانلود داده‌های اولیه صفحه کجاست؟<br />
          پاسخ: هوک <code>onMounted</code> یا به صورت غیرهمگام در اسکریپت، تا کاربر قبل از لود شدن دیتای سرور با یک صفحه سفید یا یخ‌زده مواجه نشود.
        </CalloutBox>
      </template>
    </ConceptCard>

    <!-- ========================================================= -->
    <!-- آزمایشگاه ۳: نشت حافظه (Memory Leak) و ضرورت onUnmounted -->
    <!-- ========================================================= -->
    <ConceptCard
      title="۳. آزمایشگاه نشت حافظه — چرا onUnmounted بسیار حیاتی است؟"
      badge="بهینه‌سازی منابع و RAM"
      description="اگر یک تایمر (setInterval) یا ایونت اسکرول window بسازید و هنگام خروج کامپوننت آن را متوقف نکنید، در پس‌زمینه به کار خود ادامه می‌دهد و رم کاربر را می‌بلعد!"
    >
      <template #demo>
        <div class="space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-3 p-3 bg-surface-card border border-border-subtle rounded-xl">
            <div class="flex items-center gap-2">
              <label class="text-xs font-bold text-text-body flex items-center gap-2 cursor-pointer">
                <input
                  v-model="enableCleanup"
                  type="checkbox"
                  class="rounded text-primary-text focus:ring-emerald-500 w-4 h-4"
                />
                <span>توقف و پاک‌سازی صحیح تایمر در onUnmounted فعال باشد</span>
              </label>
            </div>

            <button
              @click="showTimerComponent = !showTimerComponent"
              type="button"
              class="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors min-h-9"
            >
              {{ showTimerComponent ? 'بستن کامپوننت تایمر' : 'باز کردن مجدد کامپوننت تایمر' }}
            </button>
          </div>

          <!-- کامپوننت تایمر آزمایشی -->
          <div v-if="showTimerComponent">
            <MemoryLeakDemo :enable-cleanup="enableCleanup" @tick="handleTimerTick" />
          </div>

          <!-- لاگ وضعیت تایمر -->
          <div
            :class="[
              'p-3 rounded-xl border text-xs font-mono transition-colors flex items-center justify-between',
              isLeaking
                ? 'bg-rose-50 border-rose-300 text-rose-800 font-bold'
                : 'bg-surface-subtle border-border-subtle text-text-body',
            ]"
          >
            <span>{{ timerLog }}</span>
            <span
              v-if="isLeaking"
              class="px-2 py-0.5 rounded bg-rose-200 dark:bg-rose-500/25 text-rose-900 dark:text-rose-300 text-[10px] uppercase font-bold tracking-wider shrink-0 mr-2"
            >
              Leak Detected
            </span>
          </div>
        </div>
      </template>

      <template #code>
        <CodeSnippet
          title="نحوه صحیح پاک‌سازی در onUnmounted"
          :code="cleanupCode"
        />
      </template>

      <template #callout>
        <CalloutBox type="under-the-hood" title="چه چیزهایی را باید حتماً در onUnmounted پاک کنیم؟">
          ۱. تایمرها: <code>clearInterval()</code> و <code>clearTimeout()</code><br />
          ۲. شنوندگان رویداد سراسری: <code>window.removeEventListener('scroll', ...)</code><br />
          ۳. وب‌سوکت‌ها و اتصالات فعال: <code>socket.disconnect()</code>
        </CalloutBox>
      </template>
    </ConceptCard>

    <!-- جدول تقلب هوک‌های چرخه حیات -->
    <div class="my-8 bg-surface-card border border-border-subtle rounded-2xl p-5 shadow-xs">
      <h3 class="text-base font-bold text-text-main mb-3 flex items-center gap-2">
        <ClipboardList class="w-4 h-4 text-primary-text shrink-0" />
        <span>جدول راهنمای سریع هوک‌های Lifecycle در Vue 3</span>
      </h3>
      <div class="overflow-x-auto">
        <table class="w-full text-right text-xs">
          <thead class="bg-surface-subtle text-text-body font-bold border-b border-border-subtle">
            <tr>
              <th class="p-2.5">هوک در Vue 3</th>
              <th class="p-2.5">زمان اجرا</th>
              <th class="p-2.5">کارهای مجاز و پیشنهادی</th>
              <th class="p-2.5 text-text-muted">معادل در Options API</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr>
              <td class="p-2.5 font-mono font-bold text-primary-text">setup()</td>
              <td class="p-2.5 text-text-body">اولین گام پس از تعریف</td>
              <td class="p-2.5 text-text-body">تعریف متغیرهای ref و reactive، فرمول‌های computed</td>
              <td class="p-2.5 font-mono text-text-subtle">beforeCreate / created</td>
            </tr>
            <tr>
              <td class="p-2.5 font-mono font-bold text-teal-700 dark:text-teal-300">onMounted</td>
              <td class="p-2.5 text-text-body">پس از اتصال کامل به DOM</td>
              <td class="p-2.5 text-text-body">درخواست‌های API اولیه، فوکوس ورودی، چارت‌ها و تایمرها</td>
              <td class="p-2.5 font-mono text-text-subtle">mounted</td>
            </tr>
            <tr>
              <td class="p-2.5 font-mono font-bold text-amber-700 dark:text-amber-300">onUpdated</td>
              <td class="p-2.5 text-text-body">پس از اعمال تغییرات در DOM</td>
              <td class="p-2.5 text-text-body">واکنش به رندر مجدد المان‌ها، اسکرول خودکار به انتهای چت</td>
              <td class="p-2.5 font-mono text-text-subtle">updated</td>
            </tr>
            <tr>
              <td class="p-2.5 font-mono font-bold text-rose-700 dark:text-rose-300">onUnmounted</td>
              <td class="p-2.5 text-text-body">پس از حذف کامل از صفحه</td>
              <td class="p-2.5 text-text-body">لغو تایمرها، پاک‌سازی ایونت‌های window، بستن سوکت‌ها</td>
              <td class="p-2.5 font-mono text-text-subtle">unmounted (destroyed)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- دکمه هدایت به صفحه بعدی -->
    <div class="mt-8 p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
      <div>
        <h2 class="font-bold text-base">چرخه حیات را درک کردید؟</h2>
        <p class="text-xs sm:text-sm text-emerald-100 dark:text-emerald-300 mt-0.5">
          حالا که می‌دانید کامپوننت و المان‌ها چگونه متولد و آپدیت می‌شوند، وقت بررسی دقیق دایرکتیوهاست!
        </p>
      </div>
      <router-link
        to="/directives"
        class="px-4 py-2 bg-surface-card text-primary-text hover:bg-emerald-50 text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs shrink-0 flex items-center gap-1.5"
      >
        <span>رفتن به بخش دستورها (Directives)</span>
        <ArrowLeft class="w-4 h-4" />
      </router-link>
    </div>
  </div>
</template>
