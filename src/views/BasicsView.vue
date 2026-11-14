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
  destructureLog.value = `⚠️ تله Destructure: متغیر محلی age شد ${age}، اما چون رفرنس Proxy قطع شد، سن علی در تمپلیت (${userReactive.age}) تغییر نکرد!`
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
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-3">
        <span>گام ۱ از نقشه راه</span>
        <span>•</span>
        <span>پیش‌نیاز ضروری</span>
      </div>
      <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
        مفاهیم پایه و بنیادین Vue 3
      </h1>
      <p class="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed">
        قبل از اینکه به سراغ Directiveها و Modifierها برویم، باید بدانیم قلب تپنده Vue چطور کار می‌کند.
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
          تابع <code>ref(0)</code> داده را درون یک آبجکت دارای ویژگی <code>.value</code> بسته‌بندی می‌کند تا جاوااسکریپت بتواند به کمک شیء <b>Proxy</b> زمان خواندن یا تغییر آن را تشخیص دهد.
          اما کامپایلر Vue خودش به طور خودکار در <code>&lt;template&gt;</code> آن را باز (Unwrap) می‌کند.
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
          <div class="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div>
              <span class="text-xs font-bold text-emerald-800 block mb-1">۱) متغیرهای ref (همه‌منظوره):</span>
              <p class="text-xs text-slate-500 mb-2">هم برای انواع داده اولیه (عدد، رشته) و هم برای شیءها:</p>
              
              <div class="p-2.5 bg-slate-50 rounded-lg border border-slate-200 mb-2 space-y-1 text-xs">
                <div>شیء: <b>{{ userRef.name }}</b> — سن: <b class="text-emerald-700 font-mono">{{ userRef.age }}</b></div>
                <div>عدد اولیه: <b class="text-emerald-700 font-mono">{{ primitiveRef }}</b></div>
              </div>

              <div class="flex flex-wrap gap-2 mb-2">
                <button
                  @click="incrementRefAge"
                  type="button"
                  class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  افزایش سن شیء (userRef.value.age++)
                </button>
                <button
                  @click="incrementPrimitiveRef"
                  type="button"
                  class="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-lg cursor-pointer"
                >
                  افزایش عدد اولیه (primitiveRef.value += 10)
                </button>
              </div>
            </div>
            <p class="text-[11px] text-emerald-700 bg-emerald-50 p-1.5 rounded border border-emerald-100">
              توصیه رسمی: همیشه ref را انتخاب کنید چون امنیت بیشتری دارد و با Destructuring خراب نمی‌شود.
            </p>
          </div>

          <!-- reactive demo -->
          <div class="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div>
              <span class="text-xs font-bold text-teal-800 block mb-1">۲) متغیرهای reactive (فقط شیء):</span>
              <p class="text-xs text-slate-500 mb-2">فقط برای آبجکت و آرایه است و نیازی به .value ندارد:</p>
              
              <div class="p-2.5 bg-slate-50 rounded-lg border border-slate-200 mb-2 text-xs">
                <div>شیء: <b>{{ userReactive.name }}</b> — سن: <b class="text-teal-700 font-mono">{{ userReactive.age }}</b></div>
              </div>

              <div class="flex flex-wrap gap-2 mb-2">
                <button
                  @click="incrementReactiveDirect"
                  type="button"
                  class="px-2.5 py-1 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  افزایش مستقیم (userReactive.age++)
                </button>
                <button
                  @click="testDestructureTrap"
                  type="button"
                  class="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  تست تله Destructure ({ age } = state)
                </button>
              </div>
            </div>
            <p class="text-[11px] text-amber-800 bg-amber-50 p-1.5 rounded border border-amber-200 font-mono">
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
          توصیه رسمی تیم Vue این است که همیشه به عنوان پیش‌فرض از <code>ref()</code> استفاده کنید چون با Destructuring دچار قطعی واکنش‌پذیری نمی‌شود.
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
        <div class="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-slate-600 mb-1">قیمت اولیه (تومان):</label>
              <input
                v-model.number="price"
                type="number"
                class="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:outline-emerald-500"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-600 mb-1">درصد تخفیف:</label>
              <input
                v-model.number="discountPercent"
                type="number"
                min="0"
                max="100"
                class="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:outline-emerald-500"
              />
            </div>
          </div>
          <div class="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between text-sm">
            <span class="text-emerald-900 font-medium">مبلغ نهایی محاسبه شده توسط computed:</span>
            <span class="font-extrabold text-emerald-700 font-mono text-base">
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
          تابع معمولی با هر تغییر کوچک در صفحه دوباره اجرا می‌شود، اما <code>computed</code> فقط وقتی متغیرهای وابسته‌اش تغییر کنند دوباره اجرا خواهد شد.
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
          <div class="bg-white p-4 rounded-xl border border-slate-200">
            <h4 class="font-bold text-xs text-slate-700 mb-2">روش معمول (با v-model):</h4>
            <input
              v-model="vModelDemo"
              class="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm mb-2 focus:outline-emerald-500"
            />
            <p class="text-xs text-slate-500">
              مقدار در متغیر: <b class="text-slate-800">{{ vModelDemo }}</b>
            </p>
          </div>

          <!-- روش دستی -->
          <div class="bg-white p-4 rounded-xl border border-slate-200">
            <h4 class="font-bold text-xs text-slate-700 mb-2">روش معادل دستی (:value + @input):</h4>
            <input
              :value="manualModelDemo"
              @input="manualModelDemo = $event.target.value"
              class="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm mb-2 focus:outline-emerald-500"
            />
            <p class="text-xs text-slate-500">
              مقدار در متغیر: <b class="text-slate-800">{{ manualModelDemo }}</b>
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
          این به شما کمک می‌کند متوجه شوید چرا مودیفایرهایی مثل <code>v-model.lazy</code> کار می‌کنند؛ چون <code>.lazy</code> به سادگی ایونت را از <code>@input</code> به <code>@change</code> تغییر می‌دهد!
        </CalloutBox>
      </template>
    </ConceptCard>

    <!-- کلید راهنمای صفحه بعدی -->
    <div class="mt-8 p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
      <div>
        <h4 class="font-bold text-base">مفاهیم پایه را یاد گرفتید؟</h4>
        <p class="text-xs sm:text-sm text-emerald-100 mt-0.5">
          حالا آماده‌اید که دستورهای قدرتمند (Directives) و نحوه ساخت دایرکتیو سفارشی را یاد بگیرید.
        </p>
      </div>
      <router-link
        to="/lifecycle"
        class="px-4 py-2 bg-white text-emerald-700 hover:bg-emerald-50 text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs shrink-0 flex items-center gap-1.5"
      >
        <span>رفتن به بخش چرخه حیات (Lifecycle)</span>
        <ArrowLeft class="w-4 h-4" />
      </router-link>
    </div>
  </div>
</template>
