<script setup>
import PageHeader from '../components/layout/PageHeader.vue'
import NextStepBanner from '../components/layout/NextStepBanner.vue'
import ConceptCard from '../components/common/ConceptCard.vue'
import CodeSnippet from '../components/common/CodeSnippet.vue'
import CalloutBox from '../components/common/CalloutBox.vue'
import LazyVsStopDemo from '../components/learning/compare/LazyVsStopDemo.vue'
import VIfVsVShowDemo from '../components/learning/compare/VIfVsVShowDemo.vue'

const lazyVsStopCode = `<!-- ۱) .lazy نحوه و زمان اتصال داده را کنترل می‌کند -->
<input v-model.lazy="username" />

<!-- ۲) .stop مانع از انتشار رویداد کلیک در DOM می‌شود -->
<button @click.stop="doAction">اقدام</button>`

const ifVsShowCode = `<!-- v-if: المان به‌طور کامل در درخت DOM حذف یا اضافه می‌شود -->
<div v-if="isOpen">محتوای سنگین</div>

<!-- v-show: المان همیشه در DOM هست، فقط display: none می‌گیرد -->
<div v-show="isOpen">تب فعال</div>`
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <!-- هدر صفحه -->
    <PageHeader
      step="گام ۵ از نقشه راه"
      topic="تحلیل عمیق و تفاوت‌های چالش‌برانگیز"
      title="تفاوت‌ها و مقایسه‌های کلیدی در Vue 3"
      description="بسیاری از سوالات مصاحبه‌های کاری و چالش‌های پروژه‌های واقعی به دلیل درک نکردن تفاوت‌های ظریف بین این دستورات است. در این صفحه تفاوت آن‌ها را به‌صورت عملی و درون DOM بررسی می‌کنیم."
    />

    <!-- مقایسه ۱: .lazy در برابر .stop -->
    <ConceptCard
      title="۱. مقایسه .lazy در برابر .stop — چرا مبتدی‌ها این دو را اشتباه می‌گیرند؟"
      badge="تفاوت فاز عملکرد"
      description="هر دو پسوند با نقطه (.) هستند، اما در دو دنیای کاملاً جداگانه زندگی می‌کنند: یکی روی متغیر و کیبورد (v-model) کار می‌کند و دیگری روی انتشار رویدادها در صفحه (DOM Events)."
    >
      <template #demo>
        <LazyVsStopDemo />
      </template>

      <template #code>
        <CodeSnippet
          title="مقایسه سینتکس .lazy و .stop"
          :code="lazyVsStopCode"
        />
      </template>

      <template #callout>
        <CalloutBox type="info" title="جمع‌بندی تفاوت .lazy و .stop">
          <ul>
            <li>• <b><code>.lazy</code></b> مربوط به <b>داده‌ها و متغیرها</b> است (می‌گوید چه زمانی مقدار ورودی به متغیر state کپی شود).</li>
            <li>• <b><code>.stop</code></b> مربوط به <b>رویدادهای مرورگر</b> است (می‌گوید اجازه ندهد این کلیک به والد برسد و آن را فعال کند).</li>
          </ul>
        </CalloutBox>
      </template>
    </ConceptCard>

    <!-- مقایسه ۲: v-if در برابر v-show -->
    <ConceptCard
      title="۲. مقایسه v-if در برابر v-show — چه زمانی از کدام استفاده کنیم؟"
      badge="عملکرد و حافظه DOM"
      description="تفاوت کلیدی این دو در این است که v-if عنصر را به‌طور کامل از درخت DOM حذف می‌کند، در حالی که v-show فقط با CSS آن را مخفی می‌سازد و المان و وضعیت داخلی‌اش در DOM باقی می‌ماند."
    >
      <template #demo>
        <VIfVsVShowDemo />
      </template>

      <template #code>
        <CodeSnippet
          title="مقایسه سینتکس v-if و v-show"
          :code="ifVsShowCode"
        />
      </template>

      <template #callout>
        <CalloutBox type="tip" title="فرمول طلایی انتخاب:">
          اگر عنصری قرار است مرتباً در صفحه پنهان و آشکار شود حتماً از <code>v-show</code> استفاده کنید تا مرورگر نیازی به ساخت دوباره‌ی DOM نداشته باشد.
          اگر عنصر سنگینی دارید که ممکن است اصلاً کاربر آن را نبیند (مثل مودال پیچیده)، از <code>v-if</code> استفاده کنید تا سرعت اولیه لود صفحه بالا بماند.
        </CalloutBox>
      </template>
    </ConceptCard>

    <!-- بنر هدایت به صفحه بعدی -->
    <NextStepBanner
      title="علاقه‌مند به یادگیری دیزاین سیستم هستید؟"
      description="ببینید چطور Tailwind CSS v4 با سیستم Design Tokens این تم زیبا را با سرعت بالا تولید کرده است."
      to="/tokens"
      button-text="مشاهده ویترین دیزاین توکن‌ها"
    />
  </div>
</template>
