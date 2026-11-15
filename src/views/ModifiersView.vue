<script setup>
import PageHeader from '../components/layout/PageHeader.vue'
import NextStepBanner from '../components/layout/NextStepBanner.vue'
import ConceptCard from '../components/common/ConceptCard.vue'
import CodeSnippet from '../components/common/CodeSnippet.vue'
import CalloutBox from '../components/common/CalloutBox.vue'
import EventStopDemo from '../components/learning/modifiers/EventStopDemo.vue'
import EventPreventDemo from '../components/learning/modifiers/EventPreventDemo.vue'
import EventOnceKeyDemo from '../components/learning/modifiers/EventOnceKeyDemo.vue'
import FormModifiersDemo from '../components/learning/modifiers/FormModifiersDemo.vue'

const clickStopCode = `// در جاوااسکریپت سنتی:
function handleClick(event) {
  event.stopPropagation()
  // انجام کار...
}

// در Vue فقط با یک پسوند تمیز:
<button @click.stop="handleChildClick">کلیک</button>`

const submitPreventCode = `<!-- معادل e.preventDefault() در جاوااسکریپت بومی -->
<form @submit.prevent="sendData">
  <button type="submit">ارسال</button>
</form>`

const onceAndKeyCode = `<!-- دکمه خرید یا ثبت نام که نباید با دوبار کلیک دو بار اجرا شود -->
<button @click.once="submitOrder">ثبت سفارش</button>

<!-- ارسال پیام فقط با زدن دکمه اینتر -->
<input @keydown.enter="sendMessage" />`

const vModelModifiersCode = `<!-- مودیفایرهای اتصال دوطرفه داده: -->
<input v-model.lazy="username" /> <!-- همگام‌سازی در رویداد change -->
<input v-model.number="age" />    <!-- تبدیل خودکار به عدد واقعی -->
<input v-model.trim="email" />    <!-- حذف فاصله‌های خالی ابتدا و انتها -->

<!-- حتی می‌توانید مودیفایرها را با هم زنجیره کنید: -->
<input v-model.trim.lazy="username" />`
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <!-- هدر صفحه -->
    <PageHeader
      step="گام ۴ از نقشه راه"
      topic="پسوندهای جادویی با نقطه (.)"
      title="اصلاح‌کننده‌ها (Modifiers) در Vue 3"
      description="اصلاح‌کننده (Modifier) پسوندی است که با نقطه (.) به انتهای یک Directive اضافه می‌شود تا رفتار استاندارد آن را تغییر دهد؛ بدون اینکه نیاز به کدهای تکراری در جاوااسکریپت داشته باشید."
    />

    <!-- بخش ۱: اصلاح‌کننده‌های رویداد -->
    <div class="mb-6">
      <h2 class="text-xl font-bold text-text-main flex items-center gap-2 mb-2">
        <span class="w-3 h-3 rounded-full bg-brand-500"></span>
        <span>بخش ۱: اصلاح‌کننده‌های رویداد (Event Modifiers روی v-on یا @)</span>
      </h2>
      <p class="text-xs text-text-muted">
        این اصلاح‌کننده‌ها نیاز به نوشتن دستی <code>event.stopPropagation()</code> یا <code>event.preventDefault()</code> را کاملاً برطرف می‌کنند.
      </p>
    </div>

    <!-- ۱.۱) click.stop -->
    <ConceptCard
      title="۱. جلوگیری از نشت رویداد به والد (@click.stop)"
      badge="@click.stop"
      description="در جاوااسکریپت رویداد کلیک به‌صورت پیش‌فرض از عنصر فرزند به بالا منتشر می‌شود (Event Bubbling). با افزودن .stop انتشار رویداد در همان عنصر متوقف می‌شود."
    >
      <template #demo>
        <EventStopDemo />
      </template>

      <template #code>
        <CodeSnippet
          title="مقایسه معادل جاوااسکریپت و Vue"
          :code="clickStopCode"
        />
      </template>
    </ConceptCard>

    <!-- ۱.۲) submit.prevent -->
    <ConceptCard
      title="۲. جلوگیری از رفرش صفحه هنگام ارسال فرم (@submit.prevent)"
      badge="@submit.prevent"
      description="فرم‌های HTML به‌طور پیش‌فرض صفحه را رفرش می‌کنند. با .prevent رفتار پیش‌فرض مهار شده و فرم به‌صورت SPA ارسال می‌شود."
    >
      <template #demo>
        <EventPreventDemo />
      </template>

      <template #code>
        <CodeSnippet
          title="ارسال بدون بارگذاری مجدد"
          :code="submitPreventCode"
        />
      </template>
    </ConceptCard>

    <!-- ۱.۳) click.once و keydown.enter -->
    <ConceptCard
      title="۳. اجرای تک‌باره (@click.once) و کلیدهای کیبورد (@keydown.enter)"
      badge=".once & .enter"
      description="مودیفایر .once تنها برای یک بار رویداد را اجرا می‌کند؛ و پسوندهای کیبورد مانند .enter یا .esc رویداد را فقط با فشردن کلید مشخص فعال می‌کنند."
    >
      <template #demo>
        <EventOnceKeyDemo />
      </template>

      <template #code>
        <CodeSnippet
          title="نمونه کد رویدادهای یک‌باره و کلیدها"
          :code="onceAndKeyCode"
        />
      </template>
    </ConceptCard>

    <!-- بخش ۲: اصلاح‌کننده‌های اتصال دوطرفه -->
    <div class="mt-10 mb-6">
      <h2 class="text-xl font-bold text-text-main flex items-center gap-2 mb-2">
        <span class="w-3 h-3 rounded-full bg-teal-500"></span>
        <span>بخش ۲: اصلاح‌کننده‌های اتصال داده (v-model Modifiers)</span>
      </h2>
      <p class="text-xs text-text-muted">
        این پسوندها نحوه همگام‌سازی و فرمت داده‌های ورودی کاربر را تغییر می‌دهند.
      </p>
    </div>

    <!-- ۲.۱) .lazy و .number و .trim -->
    <ConceptCard
      title="۴. مودیفایرهای v-model: پسوندهای .lazy و .number و .trim"
      badge="v-model.*"
      description="به‌صورت پیش‌فرض با هر بار تایپ یک حرف، v-model متغیر را همگام می‌کند. مودیفایرها به شما امکان کنترل زمان و نوع داده را می‌دهند."
    >
      <template #demo>
        <FormModifiersDemo />
      </template>

      <template #code>
        <CodeSnippet
          title="ترکیب مودیفایرهای v-model"
          :code="vModelModifiersCode"
        />
      </template>

      <template #callout>
        <CalloutBox type="tip" title="چرا ورودی‌های HTML عادی همیشه رشته (string) هستند؟">
          عنصر <code>&lt;input type='number'&gt;</code> در جاوااسکریپت معمولی همیشه مقدار <code>target.value</code> را به‌عنوان رشته برمی‌گرداند!
          استفاده از <code>v-model.number</code> این سردرد را حل می‌کند و بلافاصله آن را با <code>parseFloat()</code> به عدد واقعی تبدیل می‌نماید.
        </CalloutBox>
      </template>
    </ConceptCard>

    <!-- بنر هدایت به صفحه بعدی -->
    <NextStepBanner
      title="اصلاح‌کننده‌ها را مسلط شدید؟"
      description="حالا به بخش مقایسه‌ها و تفاوت‌های چالش‌برانگیز (مثل v-if در برابر v-show) برویم."
      to="/compare"
      button-text="رفتن به بخش تفاوت‌ها و مقایسه‌ها"
    />
  </div>
</template>
