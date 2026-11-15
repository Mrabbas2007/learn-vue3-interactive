<script setup>
import PageHeader from '../components/layout/PageHeader.vue'
import NextStepBanner from '../components/layout/NextStepBanner.vue'
import ConceptCard from '../components/common/ConceptCard.vue'
import CodeSnippet from '../components/common/CodeSnippet.vue'
import CalloutBox from '../components/common/CalloutBox.vue'
import ConditionalRenderDemo from '../components/learning/directives/ConditionalRenderDemo.vue'
import ListKeyDemo from '../components/learning/directives/ListKeyDemo.vue'
import DynamicBindingDemo from '../components/learning/directives/DynamicBindingDemo.vue'
import CustomHighlightDemo from '../components/learning/directives/CustomHighlightDemo.vue'

const vIfCode = `<p v-if="status === 'success'">موفقیت‌آمیز</p>
<p v-else-if="status === 'warning'">هشدار</p>
<p v-else>خطا</p>`

const vForCode = `<ul>
  <!-- همیشه یک key منحصربه‌فرد مشخص کنید (ترجیحاً id نه index!) -->
  <li v-for="(item, index) in items" :key="item.id">
    {{ index + 1 }}. {{ item.name }}
  </li>
</ul>`

const vBindCode = `<!-- روش آبجکتی: اگر isActive برابر true باشد کلاس active اضافه می‌شود -->
<div :class="{ 'bg-brand-500 text-white': isActive }"></div>

<!-- روش سه‌تایی (Ternary) با آرایه: -->
<div :class="[ isActive ? 'shadow-lg' : 'opacity-50' ]"></div>`

const customDirectiveCode = `// ساخت دایرکتیو سفارشی محلی در <script setup>
const vHighlight = {
  mounted(el, binding) {
    // هنگام اتصال به DOM
    el.style.backgroundColor = binding.value || '#fef08a'
  },
  updated(el, binding) {
    // هنگام تغییر مقدار متغیر پاس داده شده
    el.style.backgroundColor = binding.value
  },
  unmounted(el) {
    // پاک‌سازی رویدادها برای جلوگیری از Memory Leak
  }
}`
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <!-- هدر صفحه -->
    <PageHeader
      step="گام ۳ از نقشه راه"
      topic="دستورهای ویژه HTML"
      title="دستورها (Directives) در Vue 3"
      description="دستور (Directive) ویژگی خاصی در قالب HTML است که با پیشوند v- آغاز می‌شود و به عنصر DOM قابلیت‌های پویا مثل شرط، حلقه، یا اتصال مقادیر اضافه می‌کند."
    />

    <!-- درس ۱: دستورهای شرطی -->
    <ConceptCard
      title="۱. رندر شرطی: v-if و v-else-if و v-else"
      badge="v-if"
      description="این دستورات عناصری از صفحه را بر اساس شرط‌های جاوااسکریپتی به‌طور کامل در درخت DOM حذف یا اضافه می‌کنند."
    >
      <template #demo>
        <ConditionalRenderDemo />
      </template>

      <template #code>
        <CodeSnippet
          title="نحوه استفاده از v-if / v-else"
          :code="vIfCode"
        />
      </template>
    </ConceptCard>

    <!-- درس ۲: تکرار و لیست‌ها -->
    <ConceptCard
      title="۲. رندر لیست‌ها با v-for و ضرورت حیاتی :key"
      badge="v-for"
      description="برای رندر کردن آرایه‌ها یا آبجکت‌ها از v-for استفاده می‌کنیم. مشخص کردن :key یک شناسه یکتا به Vue می‌دهد تا هنگام تغییر لیست، المان‌های درست را بازاستفاده کند و وضعیت هر آیتم جابه‌جا نشود."
    >
      <template #demo>
        <ListKeyDemo />
      </template>

      <template #code>
        <CodeSnippet
          title="نحوه نوشتن v-for"
          :code="vForCode"
        />
      </template>

      <template #callout>
        <CalloutBox type="warning" title="چرا هرگز نباید index را به‌عنوان key استفاده کنیم؟">
          اگر آیتم‌های لیست شما قابلیت حذف، اضافه یا مرتب‌سازی دارند، استفاده از <code>index</code> باعث می‌شود Vue در تشخیص جابجایی المان‌ها اشتباه کند و حالت فیلدهای ورودی یا انیمیشن‌ها به هم بریزد. همیشه از یک فیلد یکتا مثل <code>item.id</code> استفاده کنید.
        </CalloutBox>
      </template>
    </ConceptCard>

    <!-- درس ۳: اتصال ویژگی‌ها با v-bind -->
    <ConceptCard
      title="۳. اتصال خصوصیات (Attributes) با v-bind (یا :)"
      badge="v-bind / :"
      description="برای وصل کردن متغیرها به ویژگی‌های HTML مانند class، style، href، disabled یا src از پیشوند دونقطه (:) استفاده می‌کنیم."
    >
      <template #demo>
        <DynamicBindingDemo />
      </template>

      <template #code>
        <CodeSnippet
          title="سینتکس آرایه‌ای و آبجکتی :class"
          :code="vBindCode"
        />
      </template>
    </ConceptCard>

    <!-- درس ۴: دایرکتیو سفارشی -->
    <ConceptCard
      title="۴. ساخت دایرکتیو سفارشی (Custom Directives)"
      badge="دستورهای خودمان"
      description="گاهی نیاز دارید کارهایی انجام دهید که نیاز به دسترسی مستقیم به المان واقعی صفحه (DOM) دارد، مثل فوکوس خودکار، هایلایت، یا گوش دادن به اسکرول."
    >
      <template #demo>
        <CustomHighlightDemo />
      </template>

      <template #code>
        <CodeSnippet
          title="نحوه تعریف دایرکتیو کامل با Lifecycle Hooks"
          :code="customDirectiveCode"
        />
      </template>

      <template #callout>
        <CalloutBox type="under-the-hood" title="قانون نام‌گذاری در script setup">
          در Composition API وقتی از <code>&lt;script setup&gt;</code> استفاده می‌کنید، نیازی به ثبت دستی نیست! کافیست نام متغیر با حرف کوچک <code>v</code> شروع شود و ادامه‌ی آن به‌صورت camelCase نوشته شود. به‌عنوان مثال:
          <br />
          <code>const vMyTooltip = { ... }</code> در تمپلیت به شکل <code>v-my-tooltip</code> در دسترس خواهد بود.
        </CalloutBox>
      </template>
    </ConceptCard>

    <!-- بنر هدایت به صفحه بعدی -->
    <NextStepBanner
      title="دستورها را آموختید؟"
      description="اکنون زمان بررسی جادوی اصلاح‌کننده‌ها (Modifiers) مثل @click.stop و v-model.lazy است."
      to="/modifiers"
      button-text="رفتن به بخش اصلاح‌کننده‌ها (Modifiers)"
    />
  </div>
</template>
