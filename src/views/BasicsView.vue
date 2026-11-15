<script setup>
import PageHeader from '../components/layout/PageHeader.vue'
import NextStepBanner from '../components/layout/NextStepBanner.vue'
import ConceptCard from '../components/common/ConceptCard.vue'
import CodeSnippet from '../components/common/CodeSnippet.vue'
import CalloutBox from '../components/common/CalloutBox.vue'
import ReactivityComparisonDemo from '../components/learning/ReactivityComparisonDemo.vue'
import RefVsReactiveDemo from '../components/learning/basics/RefVsReactiveDemo.vue'
import ComputedCacheDemo from '../components/learning/basics/ComputedCacheDemo.vue'
import VModelPlayground from '../components/learning/basics/VModelPlayground.vue'

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
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <!-- هدر صفحه -->
    <PageHeader
      step="گام ۱ از نقشه راه"
      topic="پیش‌نیاز ضروری"
      title="مفاهیم پایه و بنیادین Vue 3"
      description="قبل از اینکه به سراغ دستورها (Directives) و اصلاح‌کننده‌ها (Modifiers) برویم، باید بدانیم قلب تپنده Vue چطور کار می‌کند. این صفحه به ساده‌ترین زبان ممکن برای افراد صفر توضیح می‌دهد."
    />

    <!-- درس ۱: سیستم واکنش‌پذیری -->
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

    <!-- درس ۲: تفاوت ref و reactive -->
    <ConceptCard
      title="۲. تفاوت ref و reactive — از کدام استفاده کنیم؟"
      badge="انتخاب درست"
      description="هر دو برای ساخت متغیر واکنش‌پذیر هستند، اما برای داده‌های متفاوت ساخته شده‌اند."
    >
      <template #demo>
        <RefVsReactiveDemo />
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

    <!-- درس ۳: محاسبه‌شده‌ها (computed) -->
    <ConceptCard
      title="۳. مقادیر محاسبه‌شده (computed) و تفاوت با متدهای معمولی"
      badge="بهینه‌سازی کارایی"
      description="وقتی مقداری دارید که وابسته به متغیرهای دیگر است، به جای نوشتن تابع معمولی از computed استفاده می‌کنید چون نتایج را کش (Cache) می‌کند."
    >
      <template #demo>
        <ComputedCacheDemo />
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

    <!-- درس ۴: راز پشت پرده v-model -->
    <ConceptCard
      title="۴. راز اتصال دوطرفه — v-model زیر کاپوت چطور کار می‌کند؟"
      badge="درک اتصال داده"
      description="دستور v-model جادو نمی‌کند! این دستور در اصل خلاصه‌نویسی برای ترکیب :value و @input است."
    >
      <template #demo>
        <VModelPlayground />
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

    <!-- بنر هدایت به صفحه بعدی -->
    <NextStepBanner
      title="مفاهیم پایه را یاد گرفتید؟"
      description="حالا آماده‌اید که دستورهای قدرتمند (Directives) و نحوه ساخت دایرکتیو سفارشی را یاد بگیرید."
      to="/lifecycle"
      button-text="رفتن به بخش چرخه‌ی حیات (Lifecycle)"
    />
  </div>
</template>
