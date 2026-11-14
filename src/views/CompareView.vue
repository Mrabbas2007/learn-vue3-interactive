<script setup>
import { ref } from 'vue'
import { ArrowLeft } from '@lucide/vue'
import ConceptCard from '../components/common/ConceptCard.vue'
import CodeSnippet from '../components/common/CodeSnippet.vue'
import CalloutBox from '../components/common/CalloutBox.vue'
import VIfVsVShowChild from '../components/learning/VIfVsVShowChild.vue'

// ---------- ۱) نمونه کد مقایسه .lazy و .stop ----------
const lazyVsStopCode = `<!-- ۱) .lazy نحوه و زمان اتصال داده را کنترل می‌کند -->
<input v-model.lazy="username" />

<!-- ۲) .stop مانع از انتشار رویداد کلیک در DOM می‌شود -->
<button @click.stop="doAction">اقدام</button>`

const ifVsShowCode = `<!-- v-if: المان به طور کامل در درخت DOM حذف یا اضافه می‌شود -->
<div v-if="isOpen">محتوای سنگین</div>

<!-- v-show: المان همیشه در DOM هست، فقط display: none می‌گیرد -->
<div v-show="isOpen">تب فعال</div>`

// ---------- ۱) مقایسه .lazy در برابر .stop ----------
const liveText = ref('')
const lazyText = ref('')
const parentClicks = ref(0)
const stopClicks = ref(0)
const normalChildClicks = ref(0)

// ---------- ۲) مقایسه v-if در برابر v-show ----------
const isIfVisible = ref(true)
const isShowVisible = ref(true)
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <!-- هدر صفحه -->
    <div class="mb-8">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-3">
        <span>گام ۴ از نقشه راه</span>
        <span>•</span>
        <span>تحلیل عمیق و تفاوت‌های چالش‌برانگیز</span>
      </div>
      <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
        تفاوت‌ها و مقایسه‌های کلیدی در Vue 3
      </h1>
      <p class="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed">
        بسیاری از سوالات مصاحبه‌های کاری و چالش‌های پروژه‌های واقعی به دلیل درک نکردن تفاوت‌های ظریف بین این دستورات است.
        در این صفحه تفاوت آن‌ها را به صورت عملی و درون DOM بررسی می‌کنیم.
      </p>
    </div>

    <!-- ========================================================= -->
    <!-- مقایسه ۱: .lazy در برابر .stop -->
    <!-- ========================================================= -->
    <ConceptCard
      title="۱. مقایسه .lazy در برابر .stop — چرا مبتدی‌ها این دو را اشتباه می‌گیرند؟"
      badge="تفاوت فاز عملکرد"
      description="هر دو پسوند با نقطه (.) هستند، اما در دو دنیای کاملاً جداگانه زندگی می‌کنند: یکی روی متغیر و کیبورد (v-model) کار می‌کند و دیگری روی انتشار رویدادها در صفحه (DOM Events)."
    >
      <template #demo>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- کارت .lazy -->
          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
            <div>
              <div class="flex items-center justify-between mb-1">
                <h4 class="font-bold text-xs text-emerald-800">۱) فیلد v-model معمولی (لحظه‌ای):</h4>
                <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  @input
                </span>
              </div>
              <input
                v-model="liveText"
                placeholder="تایپ کنید (همزمان با هر کلید)..."
                class="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm mb-1 focus:outline-emerald-500"
              />
              <p class="text-xs text-slate-600 font-mono">
                مقدار زنده: <b class="text-emerald-700">{{ liveText || '—' }}</b>
              </p>
            </div>

            <div class="pt-2 border-t border-slate-100">
              <div class="flex items-center justify-between mb-1">
                <h4 class="font-bold text-xs text-teal-800">۲) فیلد v-model.lazy (تنبلی در سینک):</h4>
                <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200">
                  @change
                </span>
              </div>
              <input
                v-model.lazy="lazyText"
                placeholder="تایپ کنید و سپس بیرون کلیک کنید..."
                class="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm mb-1 focus:outline-teal-500"
              />
              <p class="text-xs text-slate-600 font-mono">
                مقدار پس از خروج فوکوس: <b class="text-teal-700">{{ lazyText || '—' }}</b>
              </p>
            </div>
          </div>

          <!-- کارت .stop -->
          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div class="flex items-center justify-between mb-2">
              <h4 class="font-bold text-xs text-indigo-800">۲) مودیفایر @click.stop</h4>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                Event Handling
              </span>
            </div>
            <p class="text-xs text-slate-500 mb-3">
              با دو دکمه زیر مقایسه کنید؛ یکی نشت رویداد به والد را متوقف می‌کند و دیگری اجازه نشت می‌دهد:
            </p>
            <div
              @click="parentClicks++"
              class="p-3 border-2 border-dashed border-indigo-200 rounded-lg bg-indigo-50/30 flex flex-col gap-2.5"
            >
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-indigo-900">کادر والد (شنونده کلیک):</span>
                <span class="text-xs font-mono font-bold bg-white text-indigo-700 px-2.5 py-0.5 rounded border border-indigo-200 shadow-2xs">
                  کلیک‌های والد: {{ parentClicks }}
                </span>
              </div>
              <div class="flex flex-wrap items-center gap-2">
                <button
                  @click.stop="stopClicks++"
                  type="button"
                  class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-transform active:scale-95 shadow-2xs"
                >
                  کلیک با .stop (والد بی‌خبر)
                </button>
                <button
                  @click="normalChildClicks++"
                  type="button"
                  class="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-transform active:scale-95 shadow-2xs"
                >
                  کلیک بدون stop (والد هم شمرده می‌شود!)
                </button>
              </div>
              <div class="text-[11px] font-mono text-slate-600 bg-white/70 p-1.5 rounded border border-indigo-100 flex items-center justify-between">
                <span>کلیک‌های فرزند دارای stop: <b>{{ stopClicks }}</b></span>
                <span>کلیک‌های فرزند بدون stop: <b>{{ normalChildClicks }}</b></span>
              </div>
            </div>
          </div>
        </div>
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
            <li>• <b><code>.lazy</code></b> مربوط به <b>داده‌ها و متغیرها</b> است (می‌گوید چه زمانی مقدار ورودی وارد حافظه شود).</li>
            <li>• <b><code>.stop</code></b> مربوط به <b>رویدادهای مرورگر</b> است (می‌گوید اجازه نده این کلیک بالا برود و پدر را فعال کند).</li>
          </ul>
        </CalloutBox>
      </template>
    </ConceptCard>

    <!-- ========================================================= -->
    <!-- مقایسه ۲: v-if در برابر v-show -->
    <!-- ========================================================= -->
    <ConceptCard
      title="۲. مقایسه v-if در برابر v-show — چه زمانی از کدام استفاده کنیم؟"
      badge="عملکرد و حافظه DOM"
      description="تفاوت کلیدی این دو در این است که v-if عنصر را به طور کامل از درخت HTML حذف و نابود می‌کند، در حالی که v-show فقط با CSS آن را مخفی می‌سازد و حافظه داخلی آن را حفظ می‌کند."
    >
      <template #demo>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- تست v-if -->
          <div class="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <h4 class="font-bold text-xs text-rose-800">آزمایش v-if (تخریب و ایجاد مجدد)</h4>
                <button
                  @click="isIfVisible = !isIfVisible"
                  type="button"
                  class="px-2.5 py-1 text-xs font-bold rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 cursor-pointer border border-rose-200 transition-colors"
                >
                  {{ isIfVisible ? 'حذف از DOM (تخریب)' : 'ایجاد مجدد در DOM' }}
                </button>
              </div>
              <p class="text-xs text-slate-500 mb-3 leading-relaxed">
                در کادر متن بنویسید یا شمارنده را بالا ببرید؛ سپس روی دکمه حذف کلیک کنید. با ساخت دوباره، متوجه می‌شوید تمام اطلاعات داخلی پاک (Reset) شده‌اند چون کل کامپوننت از نو متولد شده است!
              </p>
              
              <div v-if="isIfVisible" class="my-2">
                <VIfVsVShowChild type="if" />
              </div>
              <div v-else class="p-4 bg-slate-100 border border-dashed border-slate-300 rounded-xl text-xs text-slate-500 text-center font-mono my-2">
                &lt;!--v-if--&gt; (کامپوننت به طور کامل از DOM و حافظه حذف شد)
              </div>
            </div>

            <!-- وضعیت زنده در DOM -->
            <div class="mt-3 p-2 rounded-lg bg-rose-50/70 border border-rose-200 text-[11px] font-mono text-rose-800 flex items-center justify-between">
              <span>وضعیت در DOM:</span>
              <b>{{ isIfVisible ? 'تزریق شده در DOM (فعال)' : 'کاملاً حذف شده از DOM' }}</b>
            </div>
          </div>

          <!-- تست v-show -->
          <div class="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <h4 class="font-bold text-xs text-emerald-800">آزمایش v-show (فقط display: none)</h4>
                <button
                  @click="isShowVisible = !isShowVisible"
                  type="button"
                  class="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 cursor-pointer border border-emerald-200 transition-colors"
                >
                  {{ isShowVisible ? 'مخفی با CSS' : 'نمایش مجدد' }}
                </button>
              </div>
              <p class="text-xs text-slate-500 mb-3 leading-relaxed">
                متن بنویسید و شمارنده را بالا ببرید؛ سپس آن را مخفی کنید. با نمایش دوباره، می‌بینید که مقادیر دست‌نخورده باقی مانده‌اند چون المان هرگز از بین نرفته است!
              </p>
              
              <div v-show="isShowVisible" class="my-2">
                <VIfVsVShowChild type="show" />
              </div>
              <div v-if="!isShowVisible" class="p-4 bg-slate-100 border border-dashed border-slate-300 rounded-xl text-xs text-slate-500 text-center font-mono my-2">
                المان در DOM زنده است اما با استایل style="display: none" مخفی شده!
              </div>
            </div>

            <!-- وضعیت زنده در DOM -->
            <div class="mt-3 p-2 rounded-lg bg-emerald-50/70 border border-emerald-200 text-[11px] font-mono text-emerald-800 flex items-center justify-between">
              <span>وضعیت در DOM:</span>
              <b>{{ isShowVisible ? 'نمایش با استایل عادی' : 'پنهان با style="display: none"' }}</b>
            </div>
          </div>
        </div>
      </template>

      <template #code>
        <CodeSnippet
          title="مقایسه سینتکس v-if و v-show"
          :code="ifVsShowCode"
        />
        <div class="mt-4">
          <h4 class="text-xs font-bold text-slate-700 mb-2">جدول مقایسه‌ای دقیق v-if و v-show:</h4>
          <div class="overflow-x-auto rounded-xl border border-slate-200">
            <table class="w-full text-right text-xs">
              <thead class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th class="p-2.5">معیار مقایسه</th>
                  <th class="p-2.5 text-rose-700 font-mono">v-if</th>
                  <th class="p-2.5 text-emerald-700 font-mono">v-show</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 bg-white">
                <tr>
                  <td class="p-2.5 font-bold text-slate-700">وضعیت در درخت DOM</td>
                  <td class="p-2.5 text-slate-600">کاملاً حذف و بازسازی می‌شود</td>
                  <td class="p-2.5 text-slate-600">همیشه در DOM باقی می‌ماند</td>
                </tr>
                <tr>
                  <td class="p-2.5 font-bold text-slate-700">هزینه رندر اولیه (Initial)</td>
                  <td class="p-2.5 text-slate-600">اگر false باشد هیچ هزینه‌ای ندارد</td>
                  <td class="p-2.5 text-slate-600">حتی اگر مخفی باشد هم رندر می‌شود</td>
                </tr>
                <tr>
                  <td class="p-2.5 font-bold text-slate-700">هزینه تغییر وضعیت مکرر (Toggle)</td>
                  <td class="p-2.5 text-slate-600">بالا (تخریب و ایجاد دوباره لایف‌سایکل)</td>
                  <td class="p-2.5 text-slate-600">بسیار پایین (فقط تغییر کلاس یا استایل CSS)</td>
                </tr>
                <tr>
                  <td class="p-2.5 font-bold text-slate-700">حفظ وضعیت داخلی فیلدها</td>
                  <td class="p-2.5 text-slate-600">پاک می‌شود (Reset)</td>
                  <td class="p-2.5 text-slate-600">دست‌نخورده حفظ می‌شود</td>
                </tr>
                <tr>
                  <td class="p-2.5 font-bold text-slate-700">پشتیبانی از v-else</td>
                  <td class="p-2.5 text-slate-600">دارد</td>
                  <td class="p-2.5 text-slate-600">ندارد</td>
                </tr>
                <tr>
                  <td class="p-2.5 font-bold text-slate-700">کاربرد ایده‌آل</td>
                  <td class="p-2.5 text-slate-600">شرط‌هایی که به ندرت تغییر می‌کنند (احراز هویت، دسترسی ادمین)</td>
                  <td class="p-2.5 text-slate-600">المان‌هایی که مدام باز و بسته می‌شوند (تب‌ها، منوها، تول‌تیپ‌ها)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>

      <template #callout>
        <CalloutBox type="tip" title="فرمول طلایی انتخاب:">
          اگر عنصری قرار است مرتباً در صفحه پنهان و آشکار شود حتماً از <code>v-show</code> استفاده کنید تا مرورگر نیازی به ساخت دوباره‌ی DOM نداشته باشد.
          اگر عنصر سنگینی دارید که ممکن است اصلاً کاربر آن را نبیند (مثل مودال پیچیده)، از <code>v-if</code> استفاده کنید تا سرعت اولیه لود صفحه بالا بماند.
        </CalloutBox>
      </template>
    </ConceptCard>

    <!-- کلید بازگشت یا رفتن به ویترین توکن‌ها -->
    <div class="mt-8 p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
      <div>
        <h4 class="font-bold text-base">علاقه‌مند به یادگیری دیزاین سیستم هستید؟</h4>
        <p class="text-xs sm:text-sm text-emerald-100 mt-0.5">
          ببینید چطور Tailwind CSS v4 با سیستم Design Tokens این تم زیبا را با سرعت بالا تولید کرده است.
        </p>
      </div>
      <router-link
        to="/tokens"
        class="px-4 py-2 bg-white text-emerald-700 hover:bg-emerald-50 text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs shrink-0 flex items-center gap-1.5"
      >
        <span>مشاهده ویترین دیزاین توکن‌ها</span>
        <ArrowLeft class="w-4 h-4" />
      </router-link>
    </div>
  </div>
</template>
