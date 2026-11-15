<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Activity, ArrowLeft, MousePointer2 } from '@lucide/vue'
import VueParticleOrb from '../components/common/VueParticleOrb.vue'

// «گوی را بچرخانید» بعد از اولین تعامل یا ۸ ثانیه محو می‌شود.
const showDragHint = ref(true)
let hintTimer = null
onMounted(() => {
  hintTimer = setTimeout(() => (showDragHint.value = false), 8000)
})
onUnmounted(() => clearTimeout(hintTimer))
function onOrbInteract() {
  showDragHint.value = false
}

const chapters = [
  {
    step: '۱',
    path: '/basics',
    title: 'مفاهیم پایه و پیش‌نیازها (Basics)',
    badge: 'شروع از صفر',
    color: 'emerald',
    description:
      'قلب تپنده Vue چگونه کار می‌کند؟ سیستم واکنش‌پذیری، تفاوت ref و reactive، محاسبه‌شده‌های computed و کارکرد مخفی v-model.',
    highlights: ['ref vs reactive', 'چرا .value؟', 'computed و حافظه کش', 'v-model زیر کاپوت'],
  },
  {
    step: '۲',
    path: '/lifecycle',
    title: 'چرخه‌ی حیات کامپوننت (Lifecycle)',
    badge: 'تست زنده بصری',
    color: 'emerald',
    description:
      'کامپوننت چگونه متولد می‌شود و از بین می‌رود؟ شبیه‌ساز تصویری هوک‌های onMounted، onUpdated و onUnmounted به همراه حل باگ Memory Leak.',
    highlights: [
      'استعاره صحنه تئاتر',
      'لحظه طلایی onMounted',
      'حل باگ نشت حافظه',
      'شبیه‌ساز زنده وقایع',
    ],
  },
  {
    step: '۳',
    path: '/directives',
    title: 'دستورها (Directives)',
    badge: 'پیشوند v-*',
    color: 'teal',
    description:
      'دستورهای جادویی برای کنترل رندر صفحه: رندر شرطی، حلقه‌ها، اتصال پویا به کلاس‌ها و استایل‌ها، و ساخت دستور سفارشی خودمان.',
    highlights: [
      'v-if و v-else',
      'v-for و ضرورت :key',
      ':class و :style پویا',
      'ساخت Custom Directive',
    ],
  },
  {
    step: '۴',
    path: '/modifiers',
    title: 'اصلاح‌کننده‌ها (Modifiers)',
    badge: 'پسوند با نقطه .',
    color: 'sky',
    description:
      'تغییر رفتار پیش‌فرض رویدادها و ورودی‌ها بدون نیاز به نوشتن دستی stopPropagation، preventDefault یا تبدیل انواع داده.',
    highlights: ['@click.stop', '@submit.prevent', 'v-model.lazy', 'v-model.number و .trim'],
  },
  {
    step: '۵',
    path: '/compare',
    title: 'تفاوت‌ها و مقایسه‌های عمیق',
    badge: 'تحلیل دقیق DOM',
    color: 'indigo',
    description:
      'مقایسه‌های فنی مهم برای پاسخ به سوالات مصاحبه و بهینه‌سازی پروژه‌ها: چرا .lazy با .stop فرق دارد؟ هزینه v-if در برابر v-show.',
    highlights: ['.lazy vs .stop', 'v-if vs v-show', 'حفظ وضعیت (State)', 'هزینه رندر DOM'],
  },
  {
    step: '۶',
    path: '/tokens',
    title: 'دیزاین توکن‌ها در Tailwind v4',
    badge: 'معماری مدرن CSS',
    color: 'purple',
    description:
      'آشنایی با سیستم مدرن @theme در Tailwind CSS v4، متغیرهای معنایی، پالت رنگی و استایل‌دهی تمیز بدون فایل کانفیگ قدیمی.',
    highlights: ['دایرکتیو @theme', 'Semantic Tokens', 'پالت رنگی برند', 'توکن‌های گردی (Radius)'],
  },
]
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-6 sm:py-10">
    <!-- ========================================================
         بخش هیرو با پس‌زمینه شیشه‌ای مدرن (Glassmorphic Hero)
         ======================================================== -->
    <section
      class="relative mb-16 sm:mb-20 rounded-3xl p-6 sm:p-10 lg:p-12 bg-surface-card/70 backdrop-blur-xl border border-border-subtle shadow-[0_10px_35px_-5px_rgba(16,185,129,0.06),0_1px_3px_0_rgba(0,0,0,0.02)] overflow-hidden"
    >
      <!-- خط هایلایت انعکاس نور بالای شیشه -->
      <div
        class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent pointer-events-none"
      ></div>

      <!-- پس‌زمینه‌ی نرم شیشه‌ای: شبکه‌ی نقطه‌ای محو + هاله‌های نور زمردی -->
      <div aria-hidden="true" class="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          class="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:18px_18px]"
        ></div>
        <div
          class="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-emerald-400/15 blur-3xl animate-glow"
        ></div>
        <div
          class="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-teal-400/15 blur-3xl animate-glow"
        ></div>
      </div>

      <div class="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        <!-- ستون متن (در RTL سمت راست) -->
        <div class="lg:col-span-7 text-center lg:text-right">
          <!-- kicker خطی، بدون کپسول -->
          <div class="inline-flex items-center gap-3 text-sm font-bold text-primary-text">
            <span class="h-px w-8 bg-emerald-500/70" aria-hidden="true"></span>
            <span>کارگاه تعاملی Vue 3</span>
          </div>

          <!-- تیتر ضربه‌ای -->
          <h1
            class="mt-5 text-4xl sm:text-5xl lg:text-[3.4rem] font-black text-text-main tracking-tight leading-[1.3] sm:leading-[1.25]"
          >
            Vue 3 را عمیق بفهم،
            <br />
            <span
              class="bg-gradient-to-l from-emerald-600 via-teal-500 to-emerald-600 bg-clip-text text-transparent"
            >
              نه فقط حفظ کن.
            </span>
          </h1>

          <!-- معرفی -->
          <p
            class="mt-5 text-text-body text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0"
          >
            از سیستم واکنش‌پذیری تا چرخه‌ی حیات و دستورهای سفارشی — همه‌چیز با آزمایشگاه‌های تعاملی،
            شبیه‌سازهای زنده و کدهای خودتوضیح فارسی. برای کسی که می‌خواهد «چرا» را بفهمد، نه فقط
            «چگونه» را.
          </p>

          <!-- دکمه‌های اکشن -->
          <div class="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
            <router-link
              to="/basics"
              class="px-7 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl transition-all shadow-sm hover:shadow-emerald-500/25 hover:shadow-lg active:scale-98 flex items-center gap-2 cursor-pointer"
            >
              <span>شروع یادگیری از گام اول</span>
              <ArrowLeft class="w-4 h-4" />
            </router-link>
            <router-link
              to="/lifecycle"
              class="px-6 py-3.5 bg-surface-card hover:bg-slate-50 dark:hover:bg-surface-hover text-text-body font-bold text-sm rounded-xl border border-border-subtle transition-all shadow-2xs hover:border-emerald-300 dark:hover:border-emerald-500/30 flex items-center gap-2 cursor-pointer"
            >
              <Activity class="w-4 h-4 text-primary-text" />
              <span>شبیه‌ساز چرخه‌ی حیات</span>
            </router-link>
          </div>
        </div>

        <!-- ستون انیمیشن سه‌بعدی Particle Orb (در RTL سمت چپ) -->
        <div class="relative lg:col-span-5 flex justify-center items-center">
          <!-- هاله‌ی نرم پشت گوی -->
          <div
            class="absolute inset-0 flex items-center justify-center pointer-events-none"
            aria-hidden="true"
          >
            <div
              class="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-emerald-400/10 blur-3xl animate-glow"
            ></div>
          </div>
          <VueParticleOrb @interact="onOrbInteract" />
          <!-- راهنمای تعامل با گوی سه‌بعدی -->
          <Transition name="fade">
            <div
              v-if="showDragHint"
              class="absolute inset-x-0 -bottom-2 flex justify-center pointer-events-none"
            >
              <div
                class="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold text-text-muted bg-surface-card/85 backdrop-blur-sm border border-border-subtle shadow-2xs"
              >
                <MousePointer2 class="w-3 h-3 text-primary-text" />
                <span>گوی را با ماوس بچرخانید</span>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </section>

    <!-- ========================================================
         نقشه راه یادگیری (Roadmap Grid)
         ======================================================== -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-xl sm:text-2xl font-extrabold text-text-main tracking-tight">
            نقشه راه یادگیری سرفصل‌ها
          </h2>
          <p class="text-xs sm:text-sm text-text-muted mt-1">
            پیشنهاد می‌شود سرفصل‌ها را به ترتیب از گام ۱ تا ۶ دنبال کنید.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <router-link
          v-for="ch in chapters"
          :key="ch.path"
          :to="ch.path"
          class="group relative bg-surface-card border border-border-subtle rounded-2xl p-6 transition-all duration-200 hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-500/40 hover:-translate-y-0.5 flex flex-col justify-between"
        >
          <div>
            <!-- هدر کارت فصل -->
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2.5">
                <span
                  class="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center justify-center font-mono"
                >
                  {{ ch.step }}
                </span>
                <span
                  class="text-xs font-semibold px-2 py-0.5 rounded-full bg-surface-subtle text-text-body"
                >
                  {{ ch.badge }}
                </span>
              </div>
              <ArrowLeft
                class="w-4 h-4 text-primary-text group-hover:translate-x-[-4px] transition-transform shrink-0"
              />
            </div>

            <!-- عنوان و متن -->
            <h3
              class="text-base font-bold text-text-main group-hover:text-primary-text transition-colors mb-2"
            >
              {{ ch.title }}
            </h3>
            <p class="text-xs text-text-muted leading-relaxed mb-4">
              {{ ch.description }}
            </p>
          </div>

          <!-- تگ‌های نکات آموزشی -->
          <div class="flex flex-wrap gap-1.5 pt-3 border-t border-border-subtle">
            <span
              v-for="h in ch.highlights"
              :key="h"
              class="text-[10px] font-mono px-2 py-0.5 rounded-md bg-surface-subtle text-text-body border border-border-subtle"
            >
              {{ h }}
            </span>
          </div>
        </router-link>
      </div>
    </div>

    <!-- فوتر آموزشی کوچک -->
    <div class="mt-12 text-center text-xs text-text-subtle">
      طراحی شده برای یادگیری شفاف • توسعه یافته با Vue 3 + Tailwind CSS v4 + Vite
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(4px);
}
</style>
