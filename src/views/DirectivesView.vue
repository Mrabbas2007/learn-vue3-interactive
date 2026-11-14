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
  <!-- همیشه یک key منحصر‌به‌فرد مشخص کنید (ترجیحاً id نه index!) -->
  <li v-for="(item, index) in items" :key="item.id">
    {{ index + 1 }}. {{ item.name }}
  </li>
</ul>`

const vBindCode = `<!-- روش آبجکتی: اگر isActive برابر true باشد کلاس active اضافه می‌شود -->
<div :class="{ 'bg-emerald-500 text-white': isActive }"></div>

<!-- روش سه‌تایی (Ternary) با آرایه: -->
<div :class="[ isActive ? 'shadow-lg' : 'opacity-50' ]"></div>`

const customDirectiveCode = `// ساخت دایرکتیو سفارشی با Lifecycle Hooks
export default {
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
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-3">
        <span>گام ۲ از نقشه راه</span>
        <span>•</span>
        <span>دستورهای ویژه HTML</span>
      </div>
      <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
        دستورها (Directives) در Vue 3
      </h1>
      <p class="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed">
        دستور (Directive) ویژگی خاصی در قالب HTML است که با پیشوند <code class="text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded font-mono font-bold">v-</code> آغاز می‌شود
        و به عنصر DOM قابلیت‌های پویا مثل شرط، حلقه، یا اتصال مقادیر اضافه می‌کند.
      </p>
    </div>

    <!-- ========================================================= -->
    <!-- درس ۱: دستورهای شرطی (v-if, v-else-if, v-else) -->
    <!-- ========================================================= -->
    <ConceptCard
      title="۱. رندر شرطی: v-if و v-else-if و v-else"
      badge="v-if"
      description="این دستورات عناصری از صفحه را بر اساس شرط‌های جاوااسکریپتی به طور کامل در درخت DOM حذف یا اضافه می‌کنند."
    >
      <template #demo>
        <div class="space-y-4">
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-xs font-bold text-slate-600">انتخاب وضعیت:</span>
            <button
              v-for="type in ['success', 'warning', 'error']"
              :key="type"
              @click="statusType = type"
              type="button"
              :class="[
                'px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer border',
                statusType === type
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100',
              ]"
            >
              {{ type }}
            </button>
          </div>

          <!-- شرط‌های رندر -->
          <div class="p-4 rounded-xl border transition-all text-sm">
            <div v-if="statusType === 'success'" class="text-emerald-700 font-semibold flex items-center gap-2">
              <CheckCircle2 class="w-4 h-4 text-emerald-600 shrink-0" />
              <span>عملیات با موفقیت انجام شد (شرط v-if برقرار است)</span>
            </div>
            <div v-else-if="statusType === 'warning'" class="text-amber-700 font-semibold flex items-center gap-2">
              <AlertTriangle class="w-4 h-4 text-amber-600 shrink-0" />
              <span>هشدار: مشکلی در سیستم وجود دارد (شرط v-else-if برقرار است)</span>
            </div>
            <div v-else class="text-rose-700 font-semibold flex items-center gap-2">
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
      description="برای رندر کردن آرایه‌ها یا آبجکت‌ها از v-for استفاده می‌کنیم. مشخص کردن :key یک شناسه یکتا به Vue می‌دهد تا المان‌ها را با حداکثر سرعت به‌روز کند."
    >
      <template #demo>
        <div class="space-y-3">
          <!-- فرم افزودن آیتم -->
          <form @submit.prevent="addFruit" class="flex gap-2">
            <input
              v-model="newFruit"
              placeholder="نام میوه جدید را بنویسید..."
              class="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:outline-emerald-500"
            />
            <button
              type="submit"
              class="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-2xs"
            >
              افزودن به لیست
            </button>
          </form>

          <!-- لیست میوه‌ها -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            <div
              v-for="(fruit, index) in fruits"
              :key="fruit.id"
              class="flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-xl text-sm"
            >
              <span class="font-semibold text-slate-800">
                <span class="text-xs text-slate-400 font-mono ml-1">{{ index + 1 }}.</span>
                {{ fruit.name }}
                <span class="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 mr-1.5">
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
        <CalloutBox type="warning" title="چرا هرگز نباید index را به عنوان key استفاده کنیم؟">
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
              class="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg cursor-pointer"
            >
              تغییر وضعیت دکمه
            </button>
            <span class="text-xs text-slate-600">
              وضعیت متغیر isButtonActive:
              <b :class="isButtonActive ? 'text-emerald-600' : 'text-rose-600'">
                {{ isButtonActive }}
              </b>
            </span>
          </div>

          <!-- المان با کلاس و استایل پویا -->
          <div
            :class="[
              'p-4 rounded-xl border text-sm transition-all duration-300',
              isButtonActive
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-sm'
                : 'bg-slate-50 border-slate-200 text-slate-500',
            ]"
          >
            <span>این باکس به صورت پویا با استفاده از <code>:class</code> استایل خود را تغییر می‌دهد!</span>
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
    <!-- درس ۴: دایرکتیو سفارشی (Custom Directives) و چرخه حیات آن -->
    <!-- ========================================================= -->
    <ConceptCard
      title="۴. ساخت دایرکتیو سفارشی (Custom Directives)"
      badge="دستورهای خودمان"
      description="گاهی نیاز دارید کارهایی انجام دهید که نیاز به دسترسی مستقیم به المان واقعی صفحه (DOM) دارد، مثل فوکوس خودکار، هایلایت، یا گوش دادن به اسکرول."
    >
      <template #demo>
        <div class="space-y-4">
          <!-- دستور محلی v-focus -->
          <div class="bg-white p-3.5 rounded-xl border border-slate-200">
            <h4 class="font-bold text-xs text-slate-700 mb-1">دستور محلی v-focus (فوکوس خودکار در زمان لود):</h4>
            <p class="text-xs text-slate-500 mb-2">به محض لود صفحه، کرسر داخل این فیلد قرار گرفته است:</p>
            <input
              v-focus
              placeholder="من با v-focus به طور خودکار فوکوس شدم!"
              class="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:outline-emerald-500"
            />
          </div>

          <!-- دستور محلی v-red-bold -->
          <div class="bg-white p-3.5 rounded-xl border border-slate-200">
            <h4 class="font-bold text-xs text-slate-700 mb-1">دستور محلی v-red-bold:</h4>
            <p v-red-bold class="text-sm">این متن مستقیماً توسط دایرکتیو v-red-bold قرمز و ضخیم شده است.</p>
          </div>

          <!-- دستور سراسری v-highlight -->
          <div class="bg-white p-3.5 rounded-xl border border-slate-200 space-y-3">
            <h4 class="font-bold text-xs text-slate-700">دستور سراسری v-highlight با پارامترها و Modifierها:</h4>
            
            <div class="flex flex-wrap items-center gap-3">
              <label class="text-xs font-bold text-slate-600">انتخاب رنگ داینامیک:</label>
              <select
                v-model="selectedColor"
                class="px-2.5 py-1 border border-slate-300 rounded-lg text-xs bg-white focus:outline-emerald-500"
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
                <span v-highlight.hover="selectedColor" class="cursor-pointer border-b border-dashed border-slate-400">
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
          در کامپوزیشن ای‌پی‌آی وقتی از <code>&lt;script setup&gt;</code> استفاده می‌کنید، نیازی به ثبت دستی نیست! کافیست متغیر دایرکتیو با حرف کوچک <code>v</code> و سپس نام آن با حروف PascalCase شروع شود. به عنوان مثال:
          <br />
          <code>const vMyTooltip = { ... }</code> در تمپلیت به شکل <code>v-my-tooltip</code> در دسترس خواهد بود.
        </CalloutBox>
      </template>
    </ConceptCard>

    <!-- کلید راهنمای صفحه بعدی -->
    <div class="mt-8 p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
      <div>
        <h4 class="font-bold text-base">دستورها را آموختید؟</h4>
        <p class="text-xs sm:text-sm text-emerald-100 mt-0.5">
          اکنون زمان بررسی جادوی اصلاح‌کننده‌ها (Modifiers) مثل <code>@click.stop</code> و <code>v-model.lazy</code> است.
        </p>
      </div>
      <router-link
        to="/modifiers"
        class="px-4 py-2 bg-white text-emerald-700 hover:bg-emerald-50 text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs shrink-0 flex items-center gap-1.5"
      >
        <span>رفتن به بخش اصلاح‌کننده‌ها (Modifiers)</span>
        <ArrowLeft class="w-4 h-4" />
      </router-link>
    </div>
  </div>
</template>
