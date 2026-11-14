<script setup>
import { ref } from 'vue'
import { CheckCircle2, AlertTriangle, XCircle, Trash2, ArrowLeft } from '@lucide/vue'
import ConceptCard from '../components/common/ConceptCard.vue'
import CodeSnippet from '../components/common/CodeSnippet.vue'
import CalloutBox from '../components/common/CalloutBox.vue'

// -------------------------------------------------------------
// نمونه کدهای آموزشی
// -------------------------------------------------------------
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

// -------------------------------------------------------------
// دایرکتیوهای سفارشی محلی
// -------------------------------------------------------------
const vFocus = {
  mounted(el) {
    el.focus()
  },
}

const vRedBold = {
  mounted(el) {
    el.style.color = '#ef4444'
    el.style.fontWeight = 'bold'
  },
}

// -------------------------------------------------------------
// متغیرهای وضعیت
// -------------------------------------------------------------
const statusType = ref('success')
let nextFruitId = 5
const fruits = ref([
  { id: 1, name: 'سیب' },
  { id: 2, name: 'پرتقال' },
  { id: 3, name: 'موز' },
  { id: 4, name: 'انگور' },
])
const newFruit = ref('')
const isButtonActive = ref(false)
const selectedColor = ref('#fef08a')

function addFruit() {
  if (newFruit.value.trim()) {
    fruits.value.push({
      id: nextFruitId++,
      name: newFruit.value.trim(),
    })
    newFruit.value = ''
  }
}

function removeFruit(id) {
  fruits.value = fruits.value.filter((fruit) => fruit.id !== id)
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <!-- هدر صفحه -->
    <div class="mb-8">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-light text-primary-text border border-emerald-200 dark:border-emerald-500/30 mb-3">
        <span>گام ۳ از نقشه راه</span>
        <span>•</span>
        <span>دستورهای ویژه HTML</span>
      </div>
      <h1 class="text-2xl sm:text-3xl font-extrabold text-text-main tracking-tight">
        دستورها (Directives) در Vue 3
      </h1>
      <p class="text-text-body mt-2 text-sm sm:text-base leading-relaxed">
        دستور (Directive) ویژگی خاصی در قالب HTML است که با پیشوند <code class="text-primary-text bg-primary-light px-1 py-0.5 rounded font-mono font-bold">v-</code> آغاز می‌شود
        و به عنصر DOM قابلیت‌های پویا مثل شرط، حلقه، یا اتصال مقادیر اضافه می‌کند.
      </p>
    </div>

    <!-- ========================================================= -->
    <!-- درس ۱: دستورهای شرطی (v-if, v-else-if, v-else) -->
    <!-- ========================================================= -->
    <ConceptCard
      title="۱. رندر شرطی: v-if و v-else-if و v-else"
      badge="v-if"
      description="این دستورات عناصری از صفحه را بر اساس شرط‌های جاوااسکریپتی به‌طور کامل در درخت DOM حذف یا اضافه می‌کنند."
    >
      <template #demo>
        <div class="space-y-4">
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-xs font-bold text-text-body">انتخاب وضعیت:</span>
            <button
              v-for="type in ['success', 'warning', 'error']"
              :key="type"
              @click="statusType = type"
              type="button"
              :class="[
                'px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer border',
                statusType === type
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-surface-card text-text-body border-border-medium hover:bg-surface-hover',
              ]"
            >
              {{ type }}
            </button>
          </div>

          <!-- شرط‌های رندر -->
          <div class="p-4 rounded-xl border transition-all text-sm">
            <div v-if="statusType === 'success'" class="text-primary-text font-semibold flex items-center gap-2">
              <CheckCircle2 class="w-4 h-4 text-primary-text shrink-0" />
              <span>عملیات با موفقیت انجام شد (شرط v-if برقرار است)</span>
            </div>
            <div v-else-if="statusType === 'warning'" class="text-amber-700 dark:text-amber-300 font-semibold flex items-center gap-2">
              <AlertTriangle class="w-4 h-4 text-amber-600 shrink-0" />
              <span>هشدار: مشکلی در سیستم وجود دارد (شرط v-else-if برقرار است)</span>
            </div>
            <div v-else class="text-rose-700 dark:text-rose-300 font-semibold flex items-center gap-2">
              <XCircle class="w-4 h-4 text-rose-600 shrink-0" />
              <span>خطا رخ داده است (شرط v-else برقرار است)</span>
            </div>
          </div>
        </div>
      </template>

      <template #code>
        <CodeSnippet
          title="نحوه استفاده از v-if / v-else"
          :code="vIfCode"
        />
      </template>
    </ConceptCard>

    <!-- ========================================================= -->
    <!-- درس ۲: تکرار و لیست‌ها با v-for و راز :key -->
    <!-- ========================================================= -->
    <ConceptCard
      title="۲. رندر لیست‌ها با v-for و ضرورت حیاتی :key"
      badge="v-for"
      description="برای رندر کردن آرایه‌ها یا آبجکت‌ها از v-for استفاده می‌کنیم. مشخص کردن :key یک شناسه یکتا به Vue می‌دهد تا هنگام تغییر لیست، المان‌های درست را بازاستفاده کند و وضعیت هر آیتم جابه‌جا نشود."
    >
      <template #demo>
        <div class="space-y-3">
          <!-- فرم افزودن آیتم -->
          <form @submit.prevent="addFruit" class="flex gap-2">
            <input
              v-model="newFruit"
              placeholder="نام میوه جدید را بنویسید..."
              class="flex-1 px-3 py-1.5 border border-border-medium rounded-lg text-sm focus:outline-brand-500"
            />
            <button
              type="submit"
              class="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-2xs min-h-9"
            >
              افزودن به لیست
            </button>
          </form>

          <!-- لیست میوه‌ها -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            <div
              v-for="(fruit, index) in fruits"
              :key="fruit.id"
              class="flex items-center justify-between p-2.5 bg-surface-card border border-border-subtle rounded-xl text-sm"
            >
              <span class="font-semibold text-text-main">
                <span class="text-xs text-text-subtle font-mono ml-1">{{ index + 1 }}.</span>
                {{ fruit.name }}
                <span class="text-[10px] font-mono text-primary-text bg-primary-light px-1.5 py-0.5 rounded border border-brand-200 mr-1.5">
                  id: {{ fruit.id }}
                </span>
              </span>
              <button
                @click="removeFruit(fruit.id)"
                type="button"
                class="text-xs text-rose-500 hover:text-rose-700 hover:bg-rose-50 px-2 py-1 rounded transition-colors cursor-pointer flex items-center gap-1"
              >
                <Trash2 class="w-3.5 h-3.5" />
                <span>حذف</span>
              </button>
            </div>
          </div>
        </div>
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

    <!-- ========================================================= -->
    <!-- درس ۳: اتصال ویژگی‌ها با v-bind (علامت اختصاری :) -->
    <!-- ========================================================= -->
    <ConceptCard
      title="۳. اتصال خصوصیات (Attributes) با v-bind (یا :)"
      badge="v-bind / :"
      description="برای وصل کردن متغیرها به ویژگی‌های HTML مانند class، style، href، disabled یا src از پیشوند دونقطه (:) استفاده می‌کنیم."
    >
      <template #demo>
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <button
              @click="isButtonActive = !isButtonActive"
              type="button"
              class="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg cursor-pointer min-h-9"
            >
              تغییر وضعیت دکمه
            </button>
            <span class="text-xs text-text-body">
              وضعیت متغیر isButtonActive:
              <b :class="isButtonActive ? 'text-primary-text' : 'text-rose-600'">
                {{ isButtonActive }}
              </b>
            </span>
          </div>

          <!-- المان با کلاس و استایل پویا -->
          <div
            :class="[
              'p-4 rounded-xl border text-sm transition-all duration-300',
              isButtonActive
                ? 'bg-primary-light border-emerald-300 text-emerald-900 shadow-sm'
                : 'bg-surface-subtle border-border-subtle text-text-muted',
            ]"
          >
            <span>این باکس به‌صورت پویا با استفاده از <code>:class</code> استایل خود را تغییر می‌دهد!</span>
          </div>
        </div>
      </template>

      <template #code>
        <CodeSnippet
          title="سینتکس آرایه‌ای و آبجکتی :class"
          :code="vBindCode"
        />
      </template>
    </ConceptCard>

    <!-- ========================================================= -->
    <!-- درس ۴: دایرکتیو سفارشی (Custom Directives) و چرخه‌ی حیات آن -->
    <!-- ========================================================= -->
    <ConceptCard
      title="۴. ساخت دایرکتیو سفارشی (Custom Directives)"
      badge="دستورهای خودمان"
      description="گاهی نیاز دارید کارهایی انجام دهید که نیاز به دسترسی مستقیم به المان واقعی صفحه (DOM) دارد، مثل فوکوس خودکار، هایلایت، یا گوش دادن به اسکرول."
    >
      <template #demo>
        <div class="space-y-4">
          <!-- دستور محلی v-focus -->
          <div class="bg-surface-card p-3.5 rounded-xl border border-border-subtle">
            <h3 class="font-bold text-xs text-text-body mb-1">دستور محلی v-focus (فوکوس خودکار در زمان لود):</h3>
            <p class="text-xs text-text-muted mb-2">به محض لود صفحه، کرسر داخل این فیلد قرار گرفته است:</p>
            <input
              v-focus
              placeholder="من با v-focus به‌طور خودکار فوکوس شدم!"
              class="w-full px-3 py-1.5 border border-border-medium rounded-lg text-sm focus:outline-brand-500"
            />
          </div>

          <!-- دستور محلی v-red-bold -->
          <div class="bg-surface-card p-3.5 rounded-xl border border-border-subtle">
            <h3 class="font-bold text-xs text-text-body mb-1">دستور محلی v-red-bold:</h3>
            <p v-red-bold class="text-sm">این متن مستقیماً توسط دایرکتیو v-red-bold قرمز و ضخیم شده است.</p>
          </div>

          <!-- دستور سراسری v-highlight -->
          <div class="bg-surface-card p-3.5 rounded-xl border border-border-subtle space-y-3">
            <h3 class="font-bold text-xs text-text-body">دستور سراسری v-highlight با پارامترها و Modifierها:</h3>
            
            <div class="flex flex-wrap items-center gap-3">
              <label class="text-xs font-bold text-text-body">انتخاب رنگ داینامیک:</label>
              <select
                v-model="selectedColor"
                class="px-2.5 py-1 border border-border-medium rounded-lg text-xs bg-surface-card focus:outline-brand-500"
              >
                <option value="#fef08a">زرد پاستلی (#fef08a)</option>
                <option value="#a7f3d0">سبز نعنایی (#a7f3d0)</option>
                <option value="#bae6fd">آبی آسمانی (#bae6fd)</option>
                <option value="#fbcfe8">صورتی ملایم (#fbcfe8)</option>
              </select>
            </div>

            <div class="space-y-2 text-sm">
              <p>
                ۱. هایلایت ثابت با مقدار داینامیک:
                <span v-highlight="selectedColor">متن هایلایت شده با رنگ انتخابی</span>
              </p>
              <p>
                ۲. هایلایت فقط در زمان هاور (<code class="text-xs font-mono">v-highlight.hover</code>):
                <span v-highlight.hover="selectedColor" class="cursor-pointer border-b border-dashed border-border-medium">
                  ماوس را روی من بیاورید تا هایلایت شوم!
                </span>
              </p>
              <p>
                ۳. همراه با مودیفایر سایز بزرگ (<code class="text-xs font-mono">v-highlight.big</code>):
                <span v-highlight.big="'#fde047'">متن بزرگ و هایلایت شده</span>
              </p>
            </div>
          </div>
        </div>
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

    <!-- کلید راهنمای صفحه بعدی -->
    <div class="mt-8 p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
      <div>
        <h2 class="font-bold text-base">دستورها را آموختید؟</h2>
        <p class="text-xs sm:text-sm text-emerald-100 dark:text-emerald-300 mt-0.5">
          اکنون زمان بررسی جادوی اصلاح‌کننده‌ها (Modifiers) مثل <code>@click.stop</code> و <code>v-model.lazy</code> است.
        </p>
      </div>
      <router-link
        to="/modifiers"
        class="px-4 py-2 bg-surface-card text-primary-text hover:bg-emerald-50 text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs shrink-0 flex items-center gap-1.5"
      >
        <span>رفتن به بخش اصلاح‌کننده‌ها (Modifiers)</span>
        <ArrowLeft class="w-4 h-4" />
      </router-link>
    </div>
  </div>
</template>
