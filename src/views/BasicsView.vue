<script setup>
import { ref, reactive, computed } from 'vue'
import { ArrowLeft } from '@lucide/vue'
import ConceptCard from '../components/common/ConceptCard.vue'
import CodeSnippet from '../components/common/CodeSnippet.vue'
import CalloutBox from '../components/common/CalloutBox.vue'
import ReactivityComparisonDemo from '../components/learning/ReactivityComparisonDemo.vue'

// -------------------------------------------------------------
// کدهای آموزشی برای نمایش در کامپوننت CodeSnippet
// -------------------------------------------------------------
const refCode = `import { ref } from 'vue'

// ایجاد متغیر واکنش‌پذیر
const count = ref(0)

function add() {
  // در بخش script باید از .value استفاده کنیم:
  count.value++
}

// اما در بخش <template> نیازی به .value نیست و خود Vue آن را باز می‌کند:
// <p>{{ count }}</p>`

const refVsReactiveCode = `// ۱) با ref: برای هر نوع داده‌ای (عدد، رشته، آرایه، آبجکت)
const count = ref(10)
const user = ref({ name: 'علی' })
count.value = 20
user.value.name = 'رضا'

// ۲) با reactive: فقط و فقط برای آبجکت‌ها و آرایه‌ها
const state = reactive({ count: 10, name: 'علی' })
state.count = 20 // نیازی به .value ندارد`

const computedCode = `import { ref, computed } from 'vue'

const price = ref(100000)
const discount = ref(15)

// computed تا زمانی که price یا discount تغییر نکنند مجدداً اجرا نمی‌شود (حافظه کش)
const finalPrice = computed(() => {
  return price.value - (price.value * discount.value / 100)
})`

const vModelCode = `<!-- این دو خط دقیقاً یک کار را انجام می‌دهند: -->
<input v-model="name" />

<input :value="name" @input="name = $event.target.value" />`

// -------------------------------------------------------------
// ۲) ref در برابر reactive
// -------------------------------------------------------------
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

// -------------------------------------------------------------
// ۳) محاسبه‌شده‌ها (computed)
// -------------------------------------------------------------
const price = ref(100000)
const discountPercent = ref(15)

const finalPrice = computed(() => {
  const discountAmount = (price.value * discountPercent.value) / 100
  return price.value - discountAmount
})

// -------------------------------------------------------------
// ۴) عملکرد زیر کاپوت v-model
// -------------------------------------------------------------
const vModelDemo = ref('سلام دنیا')
const manualModelDemo = ref('سلام دنیا')
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <!-- هدر صفحه -->
    <div class="mb-8">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-light text-primary-text border border-emerald-200 dark:border-emerald-500/30 mb-3">
        <span>گام ۱ از نقشه راه</span>
        <span>•</span>
        <span>پیش‌نیاز ضروری</span>
      </div>
      <h1 class="text-2xl sm:text-3xl font-extrabold text-text-main tracking-tight">
        مفاهیم پایه و بنیادین Vue 3
      </h1>
      <p class="text-text-body mt-2 text-sm sm:text-base leading-relaxed">
        قبل از اینکه به سراغ دستورها (Directives) و اصلاح‌کننده‌ها (Modifiers) برویم، باید بدانیم قلب تپنده Vue چطور کار می‌کند.
        این صفحه به ساده‌ترین زبان ممکن برای افراد صفر توضیح می‌دهد.
      </p>
    </div>

    <!-- ========================================================= -->
    <!-- درس ۱: سیستم واکنش‌پذیری (Reactivity) چیست؟ -->
    <!-- ========================================================= -->
    <ConceptCard
      title="۱. واکنش‌پذیری (Reactivity) چیست و چرا به ref نیاز داریم؟"
      badge="مفهوم کلیدی"
      description="در جاوااسکریپت ساده، وقتی یک متغیر تغییر می‌کند صفحه وب از تغییر آن باخبر نمی‌شود. Vue سیستمی به نام Reactivity دارد که تغییر داده را فهمیده و صفحه (DOM) را خودکار به‌روزرسانی می‌کند."
    >
      <template #demo>
        <ReactivityComparisonDemo />
      </template>

      <template #code>
        <CodeSnippet
          title="نحوه تعریف متغیر با ref"
          :code="refCode"
        />
      </template>

      <template #callout>
        <CalloutBox type="under-the-hood" title="چرا در اسکریپت .value می‌نویسیم اما در تمپلیت نمی‌نویسیم؟">
          تابع <code>ref(0)</code> مقدار را درون یک آبجکت با ویژگی <code>.value</code> می‌گذارد؛ Vue با getter/setter روی همین ویژگی (و برای مقدارهای آبجکتی با Proxy) خواندن و تغییر آن را ردیابی می‌کند.
          اما کامپایلر Vue خودش به‌طور خودکار در <code>&lt;template&gt;</code> آن را باز (Unwrap) می‌کند.
        </CalloutBox>
      </template>
    </ConceptCard>

    <!-- ========================================================= -->
    <!-- درس ۲: تفاوت ref و reactive -->
    <!-- ========================================================= -->
    <ConceptCard
      title="۲. تفاوت ref و reactive — از کدام استفاده کنیم؟"
      badge="انتخاب درست"
      description="هر دو برای ساخت متغیر واکنش‌پذیر هستند، اما برای داده‌های متفاوت ساخته شده‌اند."
    >
      <template #demo>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- ref demo -->
          <div class="bg-surface-card p-4 rounded-xl border border-border-subtle flex flex-col justify-between">
            <div>
              <span class="text-xs font-bold text-emerald-800 dark:text-emerald-300 block mb-1">۱) متغیرهای ref (همه‌منظوره):</span>
              <p class="text-xs text-text-muted mb-2">هم برای انواع داده اولیه (عدد، رشته) و هم برای شیءها:</p>
              
              <div class="p-2.5 bg-surface-subtle rounded-lg border border-border-subtle mb-2 space-y-1 text-xs">
                <div>شیء: <b>{{ userRef.name }}</b> — سن: <b class="text-primary-text font-mono">{{ userRef.age }}</b></div>
                <div>عدد اولیه: <b class="text-primary-text font-mono">{{ primitiveRef }}</b></div>
              </div>

              <div class="flex flex-wrap gap-2 mb-2">
                <button
                  @click="incrementRefAge"
                  type="button"
                  class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg cursor-pointer min-h-9"
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
              توصیه رسمی: پیش‌فرض را ref بگذارید؛ هر نوع داده‌ای را می‌پذیرد و برخلاف reactive با Destructure کردنِ خواصش واکنش‌پذیری را از دست نمی‌دهد.
            </p>
          </div>

          <!-- reactive demo -->
          <div class="bg-surface-card p-4 rounded-xl border border-border-subtle flex flex-col justify-between">
            <div>
              <span class="text-xs font-bold text-teal-800 dark:text-teal-300 block mb-1">۲) متغیرهای reactive (فقط شیء):</span>
              <p class="text-xs text-text-muted mb-2">فقط برای آبجکت و آرایه است و نیازی به .value ندارد:</p>
              
              <div class="p-2.5 bg-surface-subtle rounded-lg border border-border-subtle mb-2 text-xs">
                <div>شیء: <b>{{ userReactive.name }}</b> — سن: <b class="text-teal-700 dark:text-teal-300 font-mono">{{ userReactive.age }}</b></div>
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
            <p class="text-[11px] text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-500/10 p-1.5 rounded border border-amber-200 dark:border-amber-500/30 font-mono">
              {{ destructureLog }}
            </p>
          </div>
        </div>
      </template>

      <template #code>
        <CodeSnippet
          title="مقایسه سینتکس ref و reactive"
          :code="refVsReactiveCode"
        />
      </template>

      <template #callout>
        <CalloutBox type="warning" title="قانون طلایی برای مبتدی‌ها">
          توصیه رسمی تیم Vue این است که <code>ref()</code> را API پیش‌فرض برای وضعیت واکنش‌پذیر انتخاب کنید؛ چون هر نوع داده‌ای را می‌پذیرد و خودِ مرجع ref پایدار می‌ماند، در حالی که <code>reactive()</code> با Destructure کردن واکنش‌پذیری‌اش را از دست می‌دهد.
        </CalloutBox>
      </template>
    </ConceptCard>

    <!-- ========================================================= -->
    <!-- درس ۳: محاسبه‌شده‌ها (computed) -->
    <!-- ========================================================= -->
    <ConceptCard
      title="۳. مقادیر محاسبه‌شده (computed) و تفاوت با متدهای معمولی"
      badge="بهینه‌سازی کارایی"
      description="وقتی مقداری دارید که وابسته به متغیرهای دیگر است، به جای نوشتن تابع معمولی از computed استفاده می‌کنید چون نتایج را کش (Cache) می‌کند."
    >
      <template #demo>
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
          <div class="p-3 bg-primary-light border border-emerald-200 dark:border-emerald-500/30 rounded-lg flex items-center justify-between text-sm">
            <span class="text-emerald-900 dark:text-emerald-300 font-medium">مبلغ نهایی محاسبه شده توسط computed:</span>
            <span class="font-extrabold text-primary-text font-mono text-base">
              {{ finalPrice.toLocaleString() }} تومان
            </span>
          </div>
        </div>
      </template>

      <template #code>
        <CodeSnippet
          title="نحوه تعریف computed"
          :code="computedCode"
        />
      </template>

      <template #callout>
        <CalloutBox type="tip" title="چرا از تابع معمولی استفاده نکنیم؟">
          تابع معمولی با هر بار رندر مجدد همین کامپوننت دوباره اجرا می‌شود، اما <code>computed</code> فقط وقتی متغیرهای وابسته‌اش تغییر کنند دوباره اجرا خواهد شد.
        </CalloutBox>
      </template>
    </ConceptCard>

    <!-- ========================================================= -->
    <!-- درس ۴: راز پشت پرده v-model -->
    <!-- ========================================================= -->
    <ConceptCard
      title="۴. راز اتصال دوطرفه — v-model زیر کاپوت چطور کار می‌کند؟"
      badge="درک اتصال داده"
      description="دستور v-model جادو نمی‌کند! این دستور در اصل خلاصه‌نویسی برای ترکیب :value و @input است."
    >
      <template #demo>
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

      <template #code>
        <CodeSnippet
          title="معادل ریاضی v-model"
          :code="vModelCode"
        />
      </template>

      <template #callout>
        <CalloutBox type="info" title="چرا دانستن این موضوع مهم است؟">
          این به شما کمک می‌کند متوجه شوید چرا مودیفایرهایی مثل <code>v-model.lazy</code> کار می‌کنند؛ چون <code>.lazy</code> رویداد <code>@input</code> را به <code>@change</code> تغییر می‌دهد!
        </CalloutBox>
      </template>
    </ConceptCard>

    <!-- کلید راهنمای صفحه بعدی -->
    <div class="mt-8 p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
      <div>
        <h2 class="font-bold text-base">مفاهیم پایه را یاد گرفتید؟</h2>
        <p class="text-xs sm:text-sm text-emerald-100 dark:text-emerald-300 mt-0.5">
          حالا آماده‌اید که دستورهای قدرتمند (Directives) و نحوه ساخت دایرکتیو سفارشی را یاد بگیرید.
        </p>
      </div>
      <router-link
        to="/lifecycle"
        class="px-4 py-2 bg-surface-card text-primary-text hover:bg-emerald-50 text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs shrink-0 flex items-center gap-1.5"
      >
        <span>رفتن به بخش چرخه‌ی حیات (Lifecycle)</span>
        <ArrowLeft class="w-4 h-4" />
      </router-link>
    </div>
  </div>
</template>
