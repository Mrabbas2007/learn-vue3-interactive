<script setup>
import { ref } from 'vue'
import { ArrowLeft } from '@lucide/vue'
import ConceptCard from '../components/common/ConceptCard.vue'
import CodeSnippet from '../components/common/CodeSnippet.vue'
import CalloutBox from '../components/common/CalloutBox.vue'

// -------------------------------------------------------------
// نمونه کدهای آموزشی
// -------------------------------------------------------------
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

// -------------------------------------------------------------
// متغیرهای Event Modifiers
// -------------------------------------------------------------
const parentClicks = ref(0)
const childClicks = ref(0)
const onceClickCount = ref(0)
const submitStatus = ref('')
const submitText = ref('')
const enterKeyText = ref('')
const enterSubmitted = ref('')

// -------------------------------------------------------------
// متغیرهای v-model Modifiers
// -------------------------------------------------------------
const lazyText = ref('')
const normalInputVal = ref('25')
const numberValue = ref(25)
const trimmedText = ref('')

function handleParentClick() {
  parentClicks.value++
}

function handleChildClick() {
  childClicks.value++
}

function handleFormSubmit() {
  submitStatus.value = `فرم با مقدار "${submitText.value || 'خالی'}" با موفقیت ارسال شد و صفحه رفرش نشد!`
}

function handleEnterSubmit() {
  enterSubmitted.value = enterKeyText.value
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <!-- هدر صفحه -->
    <div class="mb-8">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-light text-primary-text border border-emerald-200 dark:border-emerald-500/30 mb-3">
        <span>گام ۴ از نقشه راه</span>
        <span>•</span>
        <span>پسوندهای جادویی با نقطه (.)</span>
      </div>
      <h1 class="text-2xl sm:text-3xl font-extrabold text-text-main tracking-tight">
        اصلاح‌کننده‌ها (Modifiers) در Vue 3
      </h1>
      <p class="text-text-body mt-2 text-sm sm:text-base leading-relaxed">
        اصلاح‌کننده (Modifier) پسوندی است که با نقطه (<code class="text-primary-text bg-primary-light px-1 py-0.5 rounded font-mono font-bold">.</code>)
        به انتهای یک Directive اضافه می‌شود تا رفتار استاندارد آن را تغییر دهد؛ بدون اینکه نیاز به کدهای تکراری در جاوااسکریپت داشته باشید.
      </p>
    </div>

    <!-- ========================================================= -->
    <!-- بخش ۱: اصلاح‌کننده‌های رویداد (Event Modifiers) -->
    <!-- ========================================================= -->
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
        <div class="space-y-4">
          <!-- باکسی که والد آن رویداد کلیک دارد -->
          <div
            @click="handleParentClick"
            class="p-5 border-2 border-dashed border-emerald-300 dark:border-emerald-500/30 bg-emerald-50/40 rounded-2xl cursor-pointer transition-colors hover:bg-emerald-50/70"
          >
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-bold text-emerald-800 dark:text-emerald-300">کادر والد (دارای رویداد کلیک):</span>
              <span class="text-xs font-mono font-bold bg-surface-card text-primary-text px-2 py-1 rounded-md border border-emerald-200 dark:border-emerald-500/30 shadow-2xs">
                تعداد کلیک‌های والد: {{ parentClicks }}
              </span>
            </div>

            <div class="flex flex-wrap gap-3">
              <!-- دکمه دارای stop -->
              <button
                @click.stop="handleChildClick"
                type="button"
                class="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs transition-transform active:scale-95"
              >
                دکمه فرزند دارای .stop (والد خبردار نمی‌شود)
              </button>

              <!-- دکمه معمولی بدون stop -->
              <button
                @click="handleChildClick"
                type="button"
                class="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs transition-transform active:scale-95"
              >
                دکمه فرزند بدون stop (والد هم کلیک می‌خورد!)
              </button>
            </div>

            <p class="text-xs text-text-muted mt-2 font-mono">
              کلیک‌های خود دکمه فرزند: {{ childClicks }}
            </p>
          </div>
        </div>
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
        <form @submit.prevent="handleFormSubmit" class="space-y-3">
          <div class="flex flex-col sm:flex-row gap-2">
            <input
              v-model="submitText"
              placeholder="چیزی بنویسید و ارسال کنید..."
              class="flex-1 px-3 py-1.5 border border-border-medium rounded-lg text-sm focus:outline-brand-500"
            />
            <button
              type="submit"
              class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-2xs min-h-9"
            >
              ارسال با @submit.prevent
            </button>
          </div>
          <p v-if="submitStatus" class="text-xs text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-500/20 p-2.5 rounded-lg border border-emerald-200 dark:border-emerald-500/30">
            {{ submitStatus }}
          </p>
        </form>
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
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- .once -->
          <div class="bg-surface-card p-3.5 rounded-xl border border-border-subtle">
            <h3 class="font-bold text-xs text-text-body mb-1">دکمه یک‌بار مصرف (@click.once):</h3>
            <p class="text-xs text-text-muted mb-2">هر چقدر روی دکمه کلیک کنید فقط بار اول شمرده می‌شود:</p>
            <div class="flex items-center gap-2">
              <button
                @click.once="onceClickCount++"
                type="button"
                class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg cursor-pointer min-h-9"
              >
                فقط بار اول کار می‌کنم!
              </button>
              <span class="text-xs font-mono font-bold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 px-2.5 py-1 rounded">
                تعداد: {{ onceClickCount }}
              </span>
            </div>
          </div>

          <!-- @keydown.enter -->
          <div class="bg-surface-card p-3.5 rounded-xl border border-border-subtle">
            <h3 class="font-bold text-xs text-text-body mb-1">فشردن کلید اینتر (@keydown.enter):</h3>
            <input
              v-model="enterKeyText"
              @keydown.enter="handleEnterSubmit"
              placeholder="متن را بنویسید و کلید Enter را بزنید..."
              class="w-full px-3 py-1.5 border border-border-medium rounded-lg text-sm mb-2 focus:outline-brand-500"
            />
            <p v-if="enterSubmitted" class="text-xs text-primary-text font-mono">
              ثبت شد: "{{ enterSubmitted }}"
            </p>
          </div>
        </div>
      </template>

      <template #code>
        <CodeSnippet
          title="نمونه کد رویدادهای یک‌باره و کلیدها"
          :code="onceAndKeyCode"
        />
      </template>
    </ConceptCard>

    <!-- ========================================================= -->
    <!-- بخش ۲: اصلاح‌کننده‌های اتصال دوطرفه (v-model Modifiers) -->
    <!-- ========================================================= -->
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
        <div class="space-y-4">
          <!-- .lazy -->
          <div class="p-3 bg-surface-card rounded-xl border border-border-subtle">
            <h3 class="font-bold text-xs text-text-body mb-1">۱) مودیفایر .lazy (همگام‌سازی پس از خارج شدن فوکوس یا اینتر):</h3>
            <div class="flex flex-col sm:flex-row gap-2 items-center">
              <input
                v-model.lazy="lazyText"
                placeholder="تایپ کنید و سپس در جای دیگری کلیک کنید..."
                class="flex-1 px-3 py-1.5 border border-border-medium rounded-lg text-sm w-full focus:outline-brand-500"
              />
              <span class="text-xs font-mono bg-surface-subtle text-text-body px-3 py-1.5 rounded-lg border w-full sm:w-auto">
                مقدار متغیر: <b class="text-primary-text">{{ lazyText || '—' }}</b>
              </span>
            </div>
          </div>

          <!-- .number -->
          <div class="p-3 bg-surface-card rounded-xl border border-border-subtle space-y-3">
            <h3 class="font-bold text-xs text-text-body">۲) مودیفایر .number (تبدیل خودکار به عدد واقعی در جاوااسکریپت):</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <!-- ورودی معمولی -->
              <div class="p-2.5 bg-surface-subtle rounded-lg border border-border-subtle">
                <label class="block text-[11px] font-bold text-text-body mb-1">بدون .number (رفتار پیش‌فرض HTML):</label>
                <input
                  v-model="normalInputVal"
                  class="w-full px-2.5 py-1 border border-border-medium rounded text-xs mb-1 bg-surface-card focus:outline-brand-500"
                />
                <div class="text-[11px] font-mono text-text-body">
                  نوع: <b class="text-rose-600">{{ typeof normalInputVal }}</b> | مقدار: <b class="text-text-main">"{{ normalInputVal }}"</b>
                </div>
              </div>

              <!-- ورودی با .number -->
              <div class="p-2.5 bg-emerald-50/50 rounded-lg border border-emerald-200 dark:border-emerald-500/30">
                <label class="block text-[11px] font-bold text-emerald-800 dark:text-emerald-300 mb-1">همراه با v-model.number:</label>
                <input
                  v-model.number="numberValue"
                  class="w-full px-2.5 py-1 border border-emerald-300 dark:border-emerald-500/30 rounded text-xs mb-1 bg-surface-card focus:outline-brand-500"
                />
                <div class="text-[11px] font-mono text-text-body">
                  نوع: <b class="text-primary-text">{{ typeof numberValue }}</b> | مقدار: <b class="text-text-main">{{ numberValue }}</b>
                </div>
              </div>
            </div>
            <p class="text-[11px] text-text-muted">
              نکته: اگر متنی غیرعددی تایپ شود، Vue به‌صورت خودکار مقدار را به‌عنوان رشته اولیه نگه می‌دارد (Fallback).
            </p>
          </div>

          <!-- .trim -->
          <div class="p-3 bg-surface-card rounded-xl border border-border-subtle">
            <h3 class="font-bold text-xs text-text-body mb-1">۳) مودیفایر .trim (حذف فاصله‌های خالی ابتدا و انتها):</h3>
            <div class="flex flex-col sm:flex-row gap-2 items-center">
              <input
                v-model.trim="trimmedText"
                placeholder="چند فاصله قبل و بعد تایپ کنید..."
                class="flex-1 px-3 py-1.5 border border-border-medium rounded-lg text-sm w-full focus:outline-brand-500"
              />
              <span class="text-xs font-mono bg-surface-subtle text-text-body px-3 py-1.5 rounded-lg border w-full sm:w-auto">
                طول رشته (length): <b class="text-primary-text">{{ trimmedText.length }}</b> | مقدار: <b class="text-primary-text">"{{ trimmedText }}"</b>
              </span>
            </div>
          </div>
        </div>
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

    <!-- کلید راهنمای صفحه بعدی -->
    <div class="mt-8 p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
      <div>
        <h2 class="font-bold text-base">اصلاح‌کننده‌ها را مسلط شدید؟</h2>
        <p class="text-xs sm:text-sm text-emerald-100 dark:text-emerald-300 mt-0.5">
          حالا به بخش مقایسه‌ها و تفاوت‌های چالش‌برانگیز (مثل <code>v-if</code> در برابر <code>v-show</code>) برویم.
        </p>
      </div>
      <router-link
        to="/compare"
        class="px-4 py-2 bg-surface-card text-primary-text hover:bg-emerald-50 text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs shrink-0 flex items-center gap-1.5"
      >
        <span>رفتن به بخش تفاوت‌ها و مقایسه‌ها</span>
        <ArrowLeft class="w-4 h-4" />
      </router-link>
    </div>
  </div>
</template>
