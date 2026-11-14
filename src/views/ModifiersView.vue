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
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-3">
        <span>گام ۳ از نقشه راه</span>
        <span>•</span>
        <span>پسوندهای جادویی با نقطه (.)</span>
      </div>
      <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
        اصلاح‌کننده‌ها (Modifiers) در Vue 3
      </h1>
      <p class="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed">
        اصلاح‌کننده (Modifier) پسوندی است که با نقطه (<code class="text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded font-mono font-bold">.</code>)
        به انتهای یک Directive اضافه می‌شود تا رفتار استاندارد آن را تغییر دهد؛ بدون اینکه نیاز به کدهای تکراری در جاوااسکریپت داشته باشید.
      </p>
    </div>

    <!-- ========================================================= -->
    <!-- بخش ۱: اصلاح‌کننده‌های رویداد (Event Modifiers) -->
    <!-- ========================================================= -->
    <div class="mb-6">
      <h2 class="text-xl font-bold text-slate-800 flex items-center gap-2 mb-2">
        <span class="w-3 h-3 rounded-full bg-emerald-500"></span>
        <span>بخش ۱: اصلاح‌کننده‌های رویداد (Event Modifiers روی v-on یا @)</span>
      </h2>
      <p class="text-xs text-slate-500">
        این اصلاح‌کننده‌ها نیاز به نوشتن دستی <code>event.stopPropagation()</code> یا <code>event.preventDefault()</code> را کاملاً برطرف می‌کنند.
      </p>
    </div>

    <!-- ۱.۱) click.stop -->
    <ConceptCard
      title="۱. جلوگیری از نشت رویداد به والد (@click.stop)"
      badge="@click.stop"
      description="در جاوااسکریپت رویداد کلیک به صورت پیش‌فرض از عنصر فرزند به بالا منتشر می‌شود (Event Bubbling). با افزودن .stop انتشار رویداد در همان عنصر متوقف می‌شود."
    >
      <template #demo>
        <div class="space-y-4">
          <!-- باکسی که والد آن رویداد کلیک دارد -->
          <div
            @click="handleParentClick"
            class="p-5 border-2 border-dashed border-emerald-300 bg-emerald-50/40 rounded-2xl cursor-pointer transition-colors hover:bg-emerald-50/70"
          >
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-bold text-emerald-800">کادر والد (دارای رویداد کلیک):</span>
              <span class="text-xs font-mono font-bold bg-white text-emerald-700 px-2 py-1 rounded-md border border-emerald-200 shadow-2xs">
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

            <p class="text-xs text-slate-500 mt-2 font-mono">
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
      description="فرم‌های HTML به طور پیش‌فرض صفحه را رفرش می‌کنند. با .prevent رفتار پیش‌فرض مهار شده و فرم به صورت SPA ارسال می‌شود."
    >
      <template #demo>
        <form @submit.prevent="handleFormSubmit" class="space-y-3">
          <div class="flex flex-col sm:flex-row gap-2">
            <input
              v-model="submitText"
              placeholder="چیزی بنویسید و ارسال کنید..."
              class="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:outline-emerald-500"
            />
            <button
              type="submit"
              class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-2xs"
            >
              ارسال با @submit.prevent
            </button>
          </div>
          <p v-if="submitStatus" class="text-xs text-emerald-800 bg-emerald-100 p-2.5 rounded-lg border border-emerald-200">
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
          <div class="bg-white p-3.5 rounded-xl border border-slate-200">
            <h4 class="font-bold text-xs text-slate-700 mb-1">دکمه یک‌بار مصرف (@click.once):</h4>
            <p class="text-xs text-slate-500 mb-2">هر چقدر روی دکمه کلیک کنید فقط بار اول شمرده می‌شود:</p>
            <div class="flex items-center gap-2">
              <button
                @click.once="onceClickCount++"
                type="button"
                class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                فقط بار اول کار می‌کنم!
              </button>
              <span class="text-xs font-mono font-bold bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded">
                تعداد: {{ onceClickCount }}
              </span>
            </div>
          </div>

          <!-- @keydown.enter -->
          <div class="bg-white p-3.5 rounded-xl border border-slate-200">
            <h4 class="font-bold text-xs text-slate-700 mb-1">فشردن کلید اینتر (@keydown.enter):</h4>
            <input
              v-model="enterKeyText"
              @keydown.enter="handleEnterSubmit"
              placeholder="متن را بنویسید و کلید Enter را بزنید..."
              class="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm mb-2 focus:outline-emerald-500"
            />
            <p v-if="enterSubmitted" class="text-xs text-emerald-700 font-mono">
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
      <h2 class="text-xl font-bold text-slate-800 flex items-center gap-2 mb-2">
        <span class="w-3 h-3 rounded-full bg-teal-500"></span>
        <span>بخش ۲: اصلاح‌کننده‌های اتصال داده (v-model Modifiers)</span>
      </h2>
      <p class="text-xs text-slate-500">
        این پسوندها نحوه همگام‌سازی و فرمت داده‌های ورودی کاربر را تغییر می‌دهند.
      </p>
    </div>

    <!-- ۲.۱) .lazy و .number و .trim -->
    <ConceptCard
      title="۴. مودیفایرهای v-model: پسوندهای .lazy و .number و .trim"
      badge="v-model.*"
      description="به صورت پیش‌فرض با هر بار تایپ یک حرف، v-model متغیر را همگام می‌کند. مودیفایرها به شما امکان کنترل زمان و نوع داده را می‌دهند."
    >
      <template #demo>
        <div class="space-y-4">
          <!-- .lazy -->
          <div class="p-3 bg-white rounded-xl border border-slate-200">
            <h4 class="font-bold text-xs text-slate-700 mb-1">۱) مودیفایر .lazy (همگام‌سازی پس از خارج شدن فوکوس یا اینتر):</h4>
            <div class="flex flex-col sm:flex-row gap-2 items-center">
              <input
                v-model.lazy="lazyText"
                placeholder="تایپ کنید و سپس در جای دیگری کلیک کنید..."
                class="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-sm w-full focus:outline-emerald-500"
              />
              <span class="text-xs font-mono bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border w-full sm:w-auto">
                مقدار متغیر: <b class="text-emerald-700">{{ lazyText || '—' }}</b>
              </span>
            </div>
          </div>

          <!-- .number -->
          <div class="p-3 bg-white rounded-xl border border-slate-200 space-y-3">
            <h4 class="font-bold text-xs text-slate-700">۲) مودیفایر .number (تبدیل خودکار به عدد واقعی در جاوااسکریپت):</h4>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <!-- ورودی معمولی -->
              <div class="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <label class="block text-[11px] font-bold text-slate-600 mb-1">بدون .number (رفتار پیش‌فرض HTML):</label>
                <input
                  v-model="normalInputVal"
                  class="w-full px-2.5 py-1 border border-slate-300 rounded text-xs mb-1 bg-white focus:outline-emerald-500"
                />
                <div class="text-[11px] font-mono text-slate-600">
                  نوع: <b class="text-rose-600">{{ typeof normalInputVal }}</b> | مقدار: <b class="text-slate-800">"{{ normalInputVal }}"</b>
                </div>
              </div>

              <!-- ورودی با .number -->
              <div class="p-2.5 bg-emerald-50/50 rounded-lg border border-emerald-200">
                <label class="block text-[11px] font-bold text-emerald-800 mb-1">همراه با v-model.number:</label>
                <input
                  v-model.number="numberValue"
                  class="w-full px-2.5 py-1 border border-emerald-300 rounded text-xs mb-1 bg-white focus:outline-emerald-500"
                />
                <div class="text-[11px] font-mono text-slate-600">
                  نوع: <b class="text-emerald-700">{{ typeof numberValue }}</b> | مقدار: <b class="text-slate-800">{{ numberValue }}</b>
                </div>
              </div>
            </div>
            <p class="text-[11px] text-slate-500">
              نکته: اگر متنی غیرعددی تایپ شود، Vue به صورت خودکار مقدار را به عنوان رشته اولیه نگه می‌دارد (Fallback).
            </p>
          </div>

          <!-- .trim -->
          <div class="p-3 bg-white rounded-xl border border-slate-200">
            <h4 class="font-bold text-xs text-slate-700 mb-1">۳) مودیفایر .trim (حذف فاصله‌های خالی ابتدا و انتها):</h4>
            <div class="flex flex-col sm:flex-row gap-2 items-center">
              <input
                v-model.trim="trimmedText"
                placeholder="چند فاصله قبل و بعد تایپ کنید..."
                class="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-sm w-full focus:outline-emerald-500"
              />
              <span class="text-xs font-mono bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border w-full sm:w-auto">
                طول رشته (length): <b class="text-emerald-700">{{ trimmedText.length }}</b> | مقدار: <b class="text-emerald-700">"{{ trimmedText }}"</b>
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
          عنصر <code>&lt;input type='number'&gt;</code> در جاوااسکریپت معمولی همیشه مقدار <code>target.value</code> را به عنوان رشته برمی‌گرداند!
          استفاده از <code>v-model.number</code> این سردرد را حل می‌کند و بلافاصله آن را با <code>parseFloat()</code> به عدد واقعی تبدیل می‌نماید.
        </CalloutBox>
      </template>
    </ConceptCard>

    <!-- کلید راهنمای صفحه بعدی -->
    <div class="mt-8 p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
      <div>
        <h4 class="font-bold text-base">اصلاح‌کننده‌ها را مسلط شدید؟</h4>
        <p class="text-xs sm:text-sm text-emerald-100 mt-0.5">
          حالا به بخش مقایسه‌ها و تفاوت‌های چالش‌برانگیز (مثل <code>v-if</code> در برابر <code>v-show</code>) برویم.
        </p>
      </div>
      <router-link
        to="/compare"
        class="px-4 py-2 bg-white text-emerald-700 hover:bg-emerald-50 text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs shrink-0 flex items-center gap-1.5"
      >
        <span>رفتن به بخش تفاوت‌ها و مقایسه‌ها</span>
        <ArrowLeft class="w-4 h-4" />
      </router-link>
    </div>
  </div>
</template>
