<script setup>
import { Sparkles } from '@lucide/vue'
import PageHeader from '../components/layout/PageHeader.vue'
import NextStepBanner from '../components/layout/NextStepBanner.vue'
import ConceptCard from '../components/common/ConceptCard.vue'
import CodeSnippet from '../components/common/CodeSnippet.vue'
import CalloutBox from '../components/common/CalloutBox.vue'
import LifecycleSimulator from '../components/learning/lifecycle/LifecycleSimulator.vue'
import DomAccessTimingDemo from '../components/learning/lifecycle/DomAccessTimingDemo.vue'
import MemoryLeakLab from '../components/learning/lifecycle/MemoryLeakLab.vue'
import LifecycleCheatSheet from '../components/learning/lifecycle/LifecycleCheatSheet.vue'

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
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <!-- هدر صفحه -->
    <PageHeader
      step="گام ۲ از نقشه راه"
      topic="حیات و ممات کامپوننت"
      title="چرخه‌ی حیات (Lifecycle Hooks) در Vue 3"
      description="هر کامپوننت در Vue درست مثل یک موجود زنده یک چرخه‌ی حیات دارد: متولد می‌شود، به صفحه وصل می‌شود، با تغییر داده‌ها ظاهر خود را تغییر می‌دهد، و در نهایت از بین می‌رود."
    />

    <!-- معرفی بصری با استعاره تئاتر -->
    <div
      class="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-900 text-white rounded-3xl border border-slate-800 shadow-md mb-8"
    >
      <div class="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
        <Sparkles class="w-4 h-4 shrink-0 text-emerald-400" />
        <span>استعاره‌ی صحنه تئاتر: چرخه‌ی حیات چیست؟</span>
      </div>
      <h2 class="text-lg sm:text-xl font-bold mb-3 text-slate-100">
        یک کامپوننت چگونه روی صفحه به نمایش درمی‌آید؟
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs leading-relaxed text-slate-300">
        <div class="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
          <span class="text-emerald-400 font-bold block mb-1">۱. پشت صحنه (Creation):</span>
          بازیگر متن دیالوگ را می‌خواند (کدهای جاوااسکریپت اجرا می‌شوند). تماشاگران هنوز چیزی نمی‌بینند!
        </div>
        <div class="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
          <span class="text-teal-400 font-bold block mb-1">۲. ورود به صحنه (Mount):</span>
          پرده بالا می‌رود و بازیگر جلوی دیدگان مردم قرار می‌گیرد (المان‌های HTML به DOM مرورگر تزریق می‌شوند).
        </div>
        <div class="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
          <span class="text-amber-400 font-bold block mb-1">۳. تغییر گریم و بازی (Update):</span>
          دیالوگ عوض می‌شود یا لباس بازیگر تغییر می‌کند (کاربر دکمه‌ای زده یا داده‌ای ویرایش شده است).
        </div>
        <div class="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
          <span class="text-rose-400 font-bold block mb-1">۴. خروج از صحنه (Unmount):</span>
          بازی تمام شده و بازیگر صحنه را ترک می‌کند (کامپوننت به طور کامل از بین رفته و پاک‌سازی می‌شود).
        </div>
      </div>
    </div>

    <!-- آزمایشگاه ۱: شبیه‌ساز زنده چرخه‌ی حیات -->
    <ConceptCard
      title="۱. آزمایشگاه تعاملی: شبیه‌ساز زنده چرخه‌ی حیات"
      badge="تست زنده تعاملی"
      description="با دکمه‌های زیر کامپوننت را در صحنه متولد، به‌روزرسانی و حذف کنید تا روشن شدن مراحل در دیاگرام و ثبت لاگ‌ها را در لحظه مشاهده نمایید."
    >
      <template #demo>
        <LifecycleSimulator />
      </template>

      <template #code>
        <CodeSnippet
          title="کدهای هوک‌های اصلی در <script setup>"
          :code="lifecycleHooksCode"
        />
      </template>

      <template #callout>
        <CalloutBox type="under-the-hood" title="چرا در Composition API هوک beforeCreate و created وجود ندارند؟">
          در کامپوزیشن ای‌پی‌آی، خود بدنه‌ی بلاک <code>&lt;script setup&gt;</code> معادل مرحله‌ی Creation است! یعنی متغیرها و محاسبات شما بلافاصله هنگام ساخته شدن نمونه کامپوننت ایجاد می‌شوند و نیازی به تعریف هوک جداگانه ندارید.
        </CalloutBox>
      </template>
    </ConceptCard>

    <!-- آزمایشگاه ۲: دسترسی به DOM -->
    <ConceptCard
      title="۲. آزمایش دسترسی به DOM — چرا در setup المان‌ها هنوز null هستند؟"
      badge="خطای رایج مبتدی‌ها"
      description="یکی از پرتکرارترین خطاهای مبتدی‌ها، تلاش برای دسترسی به المان HTML یا کامپوننت قبل از اجرای onMounted است."
    >
      <template #demo>
        <DomAccessTimingDemo />
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
          پاسخ: داخل هوک <code>onMounted</code> (بعد از اولین رندر) یا با <code>async setup</code> و top-level await همراه <code>&lt;Suspense&gt;</code> اگر می‌خواهید صفحه تا آماده شدن داده منتظر بماند.
        </CalloutBox>
      </template>
    </ConceptCard>

    <!-- آزمایشگاه ۳: نشت حافظه (Memory Leak) -->
    <ConceptCard
      title="۳. آزمایشگاه نشت حافظه — چرا onUnmounted بسیار حیاتی است؟"
      badge="بهینه‌سازی منابع و RAM"
      description="اگر یک تایمر (setInterval) یا رویداد اسکرول window بسازید و هنگام خروج کامپوننت آن را متوقف نکنید، در پس‌زمینه به کار خود ادامه می‌دهد و رم کاربر را می‌بلعد!"
    >
      <template #demo>
        <MemoryLeakLab />
      </template>

      <template #code>
        <CodeSnippet
          title="نحوه صحیح پاک‌سازی در onUnmounted"
          :code="cleanupCode"
        />
      </template>

      <template #callout>
        <CalloutBox type="tip" title="توصیه حرفه‌ای برای پاک‌سازی خودکار در Vue 3">
          در Vue 3.5+ می‌توانید از تابع جدید <code>onWatcherCleanup()</code> استفاده کنید؛ همچنین کتابخانه‌هایی مثل <b>VueUse</b> هوک‌هایی نظیر <code>useIntervalFn</code> ارائه می‌دهند که به صورت خودکار با خروج کامپوننت تایمر را خاموش می‌کنند!
        </CalloutBox>
      </template>
    </ConceptCard>

    <!-- جدول تقلب هوک‌های چرخه‌ی حیات -->
    <LifecycleCheatSheet />

    <!-- بنر هدایت به صفحه بعدی -->
    <NextStepBanner
      title="چرخه‌ی حیات را درک کردید؟"
      description="حالا که می‌دانید کامپوننت و المان‌ها چگونه متولد و آپدیت می‌شوند، وقت بررسی دقیق دایرکتیوهاست!"
      to="/directives"
      button-text="رفتن به بخش دستورها (Directives)"
    />
  </div>
</template>
