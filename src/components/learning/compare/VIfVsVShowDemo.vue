<script setup>
import { ref } from 'vue'
import VIfVsVShowChild from './VIfVsVShowChild.vue'

const isIfVisible = ref(true)
const isShowVisible = ref(true)

const comparisonRows = [
  {
    feature: 'وضعیت در درخت DOM',
    ifBehavior: 'کاملاً حذف و بازسازی می‌شود',
    showBehavior: 'همیشه در DOM باقی می‌ماند',
  },
  {
    feature: 'هزینه رندر اولیه (Initial)',
    ifBehavior: 'اگر false باشد هیچ هزینه‌ای ندارد',
    showBehavior: 'حتی اگر مخفی باشد هم رندر می‌شود',
  },
  {
    feature: 'هزینه تغییر وضعیت مکرر (Toggle)',
    ifBehavior: 'بالا (حذف و ساخت دوباره‌ی کامپوننت و اجرای دوباره‌ی چرخه‌ی حیات)',
    showBehavior: 'بسیار پایین (فقط تغییر استایل درون‌خطی display)',
  },
  {
    feature: 'حفظ وضعیت داخلی فیلدها',
    ifBehavior: 'پاک می‌شود (Reset)',
    showBehavior: 'دست‌نخورده حفظ می‌شود',
  },
  {
    feature: 'پشتیبانی از v-else',
    ifBehavior: 'دارد',
    showBehavior: 'ندارد',
  },
  {
    feature: 'کاربرد ایده‌آل',
    ifBehavior: 'شرط‌هایی که به ندرت تغییر می‌کنند (احراز هویت، دسترسی ادمین)',
    showBehavior: 'المان‌هایی که مدام باز و بسته می‌شوند (تب‌ها، منوها، تول‌تیپ‌ها)',
  },
]
</script>

<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- تست v-if -->
      <div class="bg-surface-card p-4 rounded-xl border border-border-subtle flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-bold text-xs text-rose-800 dark:text-rose-300">
              آزمایش v-if (تخریب و ایجاد مجدد)
            </h3>
            <button
              @click="isIfVisible = !isIfVisible"
              type="button"
              class="px-2.5 py-1 text-xs font-bold rounded-lg bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-500/25 cursor-pointer border border-rose-200 dark:border-rose-500/30 transition-colors min-h-9"
            >
              {{ isIfVisible ? 'حذف از DOM (تخریب)' : 'ایجاد مجدد در DOM' }}
            </button>
          </div>
          <p class="text-xs text-text-muted mb-3 leading-relaxed">
            در کادر متن بنویسید یا شمارنده را بالا ببرید؛ سپس روی دکمه حذف کلیک کنید. با ساخت دوباره، متوجه
            می‌شوید تمام اطلاعات داخلی پاک (Reset) شده‌اند چون کل کامپوننت از نو متولد شده است!
          </p>

          <div v-if="isIfVisible" class="my-2">
            <VIfVsVShowChild type="if" />
          </div>
          <div
            v-else
            class="p-4 bg-surface-subtle border border-dashed border-border-medium rounded-xl text-xs text-text-muted text-center font-mono my-2"
          >
            &lt;!--v-if--&gt; (کامپوننت به‌طور کامل از DOM و حافظه حذف شد)
          </div>
        </div>

        <!-- وضعیت زنده در DOM -->
        <div
          class="mt-3 p-2 rounded-lg bg-rose-50/70 dark:bg-rose-500/12 border border-rose-200 dark:border-rose-500/30 text-[11px] font-mono text-rose-800 dark:text-rose-300 flex items-center justify-between"
        >
          <span>وضعیت در DOM:</span>
          <b>{{ isIfVisible ? 'تزریق شده در DOM (فعال)' : 'کاملاً حذف شده از DOM' }}</b>
        </div>
      </div>

      <!-- تست v-show -->
      <div class="bg-surface-card p-4 rounded-xl border border-border-subtle flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-bold text-xs text-emerald-800 dark:text-emerald-300">
              آزمایش v-show (فقط display: none)
            </h3>
            <button
              @click="isShowVisible = !isShowVisible"
              type="button"
              class="px-2.5 py-1 text-xs font-bold rounded-lg bg-primary-light text-primary-text hover:bg-emerald-100 dark:hover:bg-emerald-500/20 cursor-pointer border border-emerald-200 dark:border-emerald-500/30 transition-colors min-h-9"
            >
              {{ isShowVisible ? 'مخفی با CSS' : 'نمایش مجدد' }}
            </button>
          </div>
          <p class="text-xs text-text-muted mb-3 leading-relaxed">
            متن بنویسید و شمارنده را بالا ببرید؛ سپس آن را مخفی کنید. با نمایش دوباره، می‌بینید که مقادیر
            دست‌نخورده باقی مانده‌اند چون المان هرگز از بین نرفته است!
          </p>

          <div v-show="isShowVisible" class="my-2">
            <VIfVsVShowChild type="show" />
          </div>
          <div
            v-if="!isShowVisible"
            class="p-4 bg-surface-subtle border border-dashed border-border-medium rounded-xl text-xs text-text-muted text-center font-mono my-2"
          >
            المان در DOM زنده است اما با استایل style="display: none" مخفی شده!
          </div>
        </div>

        <!-- وضعیت زنده در DOM -->
        <div
          class="mt-3 p-2 rounded-lg bg-emerald-50/70 dark:bg-emerald-500/12 border border-emerald-200 dark:border-emerald-500/30 text-[11px] font-mono text-emerald-800 dark:text-emerald-300 flex items-center justify-between"
        >
          <span>وضعیت در DOM:</span>
          <b>{{ isShowVisible ? 'نمایش با استایل عادی' : 'پنهان با style="display: none"' }}</b>
        </div>
      </div>
    </div>

    <!-- جدول مقایسه‌ای دقیق v-if و v-show -->
    <div class="mt-6">
      <h4 class="text-xs font-bold text-text-body mb-2">جدول مقایسه‌ای دقیق v-if و v-show:</h4>
      <div class="overflow-x-auto rounded-xl border border-border-subtle">
        <table class="w-full text-right text-xs">
          <thead class="bg-surface-subtle text-text-body font-bold border-b border-border-subtle">
            <tr>
              <th class="p-2.5">معیار مقایسه</th>
              <th class="p-2.5 text-rose-700 dark:text-rose-300 font-mono">v-if</th>
              <th class="p-2.5 text-primary-text font-mono">v-show</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border-subtle bg-surface-card">
            <tr v-for="row in comparisonRows" :key="row.feature">
              <td class="p-2.5 font-bold text-text-body">{{ row.feature }}</td>
              <td class="p-2.5 text-text-body">{{ row.ifBehavior }}</td>
              <td class="p-2.5 text-text-body">{{ row.showBehavior }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
