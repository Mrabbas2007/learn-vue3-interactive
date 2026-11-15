<script setup>
import { ref } from 'vue'
import { Check } from '@lucide/vue'
import PageHeader from '../components/layout/PageHeader.vue'
import ConceptCard from '../components/common/ConceptCard.vue'
import CodeSnippet from '../components/common/CodeSnippet.vue'
import CalloutBox from '../components/common/CalloutBox.vue'

const copiedToken = ref('')

const tokensCssCode = `@import "tailwindcss";

@theme {
  --color-brand-500: #10b981;
  --color-brand-600: #059669;
  
  /* توکن معنایی برند */
  --color-primary: var(--color-brand-500);

  /* توکن‌های وضعیت و بازخورد */
  --color-danger-surface: #fff1f2;
  --color-danger-text: #9f1239;
  --color-success-surface: #ecfdf5;
  --color-success-text: #065f46;

  /* توکن گردی */
  --radius-card: 1rem;
}

/* تطبیق خودکار با دارک‌مود بدون دست‌زدن به مارک‌آپ HTML */
.dark {
  --color-danger-surface: rgb(244 63 94 / 0.14);
  --color-danger-text: #fda4af;
  --color-success-surface: rgb(16 185 129 / 0.14);
  --color-success-text: #6ee7b7;
}`

const brandTokens = [
  { name: '--color-brand-50', hex: '#ecfdf5', class: 'bg-brand-50 text-emerald-950' },
  { name: '--color-brand-100', hex: '#d1fae5', class: 'bg-brand-100 text-emerald-950' },
  { name: '--color-brand-200', hex: '#a7f3d0', class: 'bg-brand-200 text-emerald-950' },
  { name: '--color-brand-300', hex: '#6ee7b7', class: 'bg-brand-300 text-emerald-950' },
  { name: '--color-brand-400', hex: '#34d399', class: 'bg-brand-400 text-emerald-950' },
  { name: '--color-brand-500', hex: '#10b981', class: 'bg-brand-500 text-emerald-950' },
  { name: '--color-brand-600', hex: '#059669', class: 'bg-brand-600 text-emerald-950' },
  { name: '--color-brand-700', hex: '#047857', class: 'bg-brand-700 text-white' },
  { name: '--color-brand-800', hex: '#065f46', class: 'bg-brand-800 text-white' },
  { name: '--color-brand-900', hex: '#064e3b', class: 'bg-brand-900 text-white' },
]

const semanticTokens = [
  { label: 'رنگ اصلی (Primary)', token: '--color-primary', usage: 'bg-primary / text-primary' },
  { label: 'پس‌زمینه صفحه (Surface Bg)', token: '--color-surface-bg', usage: 'bg-surface-bg' },
  { label: 'کارت‌ها (Surface Card)', token: '--color-surface-card', usage: 'bg-surface-card' },
  { label: 'حاشیه ظریف (Border Subtle)', token: '--color-border-subtle', usage: 'border-border-subtle' },
  { label: 'متن اصلی (Text Main)', token: '--color-text-main', usage: 'text-text-main' },
  { label: 'متن کم‌رنگ (Text Muted)', token: '--color-text-muted', usage: 'text-text-muted' },
]

const statusTokens = [
  {
    label: 'خطا / Danger',
    token: '--color-danger-*',
    surfaceClass: 'bg-danger-surface border-danger-border text-danger-text',
    subtle: 'text-danger-subtle',
    desc: 'نمایش خطاها و شرایط بحرانی با کنتراست تضمین‌شده در هر دو تم',
  },
  {
    label: 'موفقیت / Success',
    token: '--color-success-*',
    surfaceClass: 'bg-success-surface border-success-border text-success-text',
    subtle: 'text-success-subtle',
    desc: 'نمایش وضعیت‌های مثبت و موفقیت‌آمیز بودن عملیات‌ها',
  },
  {
    label: 'هشدار / Warning',
    token: '--color-warning-*',
    surfaceClass: 'bg-warning-surface border-warning-border text-warning-text',
    subtle: 'text-warning-text',
    desc: 'نمایش خطرات احتمالی و نکات مراقبتی',
  },
  {
    label: 'اطلاعات / Info',
    token: '--color-info-*',
    surfaceClass: 'bg-info-surface border-info-border text-info-text',
    subtle: 'text-info-text',
    desc: 'نمایش پیام‌های کمکی، نکات و مستندات',
  },
]

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    copiedToken.value = text
    setTimeout(() => {
      copiedToken.value = ''
    }, 1500)
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <!-- هدر صفحه -->
    <PageHeader
      step="گام ۶ از نقشه راه"
      topic="معماری Tailwind CSS v4"
      title="دیزاین توکن‌ها (Design Tokens) در Tailwind v4"
      description="دیزاین توکن‌ها، بنیادی‌ترین اجزای سازنده‌ی یک دیزاین سیستم هستند (رنگ‌ها، فاصله‌ها، گوشه‌ها، فونت‌ها). در Tailwind v4 این توکن‌ها بدون نیاز به فایل جاوااسکریپت، مستقیماً درون بلوک @theme تعریف می‌شوند."
    />

    <!-- پالت رنگ‌های برند -->
    <ConceptCard
      title="۱. پالت توکن‌های رنگی برند (Brand Color Scale)"
      badge="پالت رنگ‌ها"
      description="این رنگ‌ها اساس پالت رابط کاربری ما را تشکیل می‌دهند. روی هر کدام کلیک کنید تا متغیر آن کپی شود."
    >
      <template #demo>
        <div class="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          <div
            v-for="token in brandTokens"
            :key="token.name"
            @click="copyText(token.name)"
            :class="[
              'p-3 rounded-xl border border-border-subtle cursor-pointer transition-transform hover:scale-102 flex flex-col justify-between h-20 shadow-2xs',
              token.class,
            ]"
          >
            <span class="text-xs font-mono font-bold tracking-tight">{{ token.hex }}</span>
            <span class="text-[10px] font-mono opacity-85 truncate">{{ token.name.replace('--color-', '') }}</span>
          </div>
        </div>
        <p v-if="copiedToken" class="mt-3 text-xs text-primary-text font-bold text-center flex items-center justify-center gap-1.5">
          <Check class="w-4 h-4" />
          <span>توکن "{{ copiedToken }}" کپی شد!</span>
        </p>
      </template>

      <template #code>
        <CodeSnippet
          title="نحوه تعریف در src/assets/main.css"
          lang="css"
          :code="tokensCssCode"
        />
      </template>
    </ConceptCard>

    <!-- توکن‌های معنایی -->
    <ConceptCard
      title="۲. توکن‌های معنایی (Semantic Tokens)"
      badge="معنا محوری"
      description="به جای اینکه مستقیماً بنویسیم bg-brand-500، از نام‌های معنایی مانند bg-primary یا text-text-main استفاده می‌کنیم تا در آینده تغییر تم با یک خط کد ممکن باشد."
    >
      <template #demo>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            v-for="item in semanticTokens"
            :key="item.token"
            class="p-3.5 bg-surface-card border border-border-subtle rounded-xl flex items-center justify-between"
          >
            <div>
              <h3 class="text-xs font-bold text-text-main">{{ item.label }}</h3>
              <code class="text-[11px] text-text-muted font-mono">{{ item.token }}</code>
            </div>
            <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-subtle text-text-body border">
              {{ item.usage }}
            </span>
          </div>
        </div>
      </template>

      <template #callout>
        <CalloutBox type="tip" title="چرا از دیزاین توکن استفاده می‌کنیم؟">
          ۱. <b>یکپارچگی بصری</b>: تمامی دکمه‌ها، حاشیه‌ها و متون از یک منبع واحد رنگ می‌گیرند.
          <br />
          ۲. <b>تغییر آسان تم یا دارک مود</b>: اگر فردا تصمیم بگیرید رنگ تم را از سبز به آبی تغییر دهید، کافیست فقط متغیر <code>--color-primary</code> را در CSS تغییر دهید، نه اینکه هزاران کلاس را در فایل‌های مختلف ادیت کنید!
        </CalloutBox>
      </template>
    </ConceptCard>

    <!-- توکن‌های گردی و فونت -->
    <ConceptCard
      title="۳. توکن‌های گردی لبه‌ها (Radius Tokens)"
      badge="Typography & Radius"
      description="توکن‌های گردی گوشه‌ها برای المان‌های مختلف (کارت، دکمه و بَج)."
    >
      <template #demo>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div class="p-4 bg-surface-card border border-border-subtle rounded-2xl flex flex-col items-center justify-center text-center">
            <div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-500/30 rounded-card mb-2 flex items-center justify-center text-xs font-bold text-emerald-800 dark:text-emerald-300">
              Card
            </div>
            <span class="text-xs font-bold text-text-body">--radius-card</span>
            <span class="text-[10px] text-text-subtle font-mono">1rem (16px)</span>
          </div>

          <div class="p-4 bg-surface-card border border-border-subtle rounded-2xl flex flex-col items-center justify-center text-center">
            <div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-500/30 rounded-button mb-2 flex items-center justify-center text-xs font-bold text-emerald-800 dark:text-emerald-300">
              Btn
            </div>
            <span class="text-xs font-bold text-text-body">--radius-button</span>
            <span class="text-[10px] text-text-subtle font-mono">0.625rem (10px)</span>
          </div>

          <div class="p-4 bg-surface-card border border-border-subtle rounded-2xl flex flex-col items-center justify-center text-center">
            <div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-500/30 rounded-badge mb-2 flex items-center justify-center text-xs font-bold text-emerald-800 dark:text-emerald-300">
              Pill
            </div>
            <span class="text-xs font-bold text-text-body">--radius-badge</span>
            <span class="text-[10px] text-text-subtle font-mono">9999px (کامل گرد)</span>
          </div>
        </div>
      </template>
    </ConceptCard>

    <!-- توکن‌های وضعیت و فیدبک -->
    <ConceptCard
      title="۴. توکن‌های وضعیت و بازخورد (Status Tokens)"
      badge="معماری دسترس‌پذیری و تم"
      description="این توکن‌ها برای نمایش شرایط خطا، هشدار، موفقیت و اطلاعات طراحی شده‌اند تا در هر دو حالت روشن و تاریک، کنتراست متن‌ها و حاشیه‌ها تضمین شود."
    >
      <template #demo>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            v-for="item in statusTokens"
            :key="item.token"
            :class="['p-3.5 rounded-xl border flex flex-col justify-between space-y-2', item.surfaceClass]"
          >
            <div class="flex items-center justify-between">
              <h3 class="text-xs font-bold">{{ item.label }}</h3>
              <code class="text-[10px] font-mono opacity-80">{{ item.token }}</code>
            </div>
            <p :class="['text-xs leading-relaxed', item.subtle]">
              {{ item.desc }}
            </p>
          </div>
        </div>
      </template>

      <template #callout>
        <CalloutBox type="under-the-hood" title="چرا توکن‌های وضعیت جداگانه ضروری هستند؟">
          استفاده مستقیم از کلاس‌هایی مانند <code>text-rose-900</code> یا <code>bg-rose-50</code> بدون نسخه دارک‌مود، کنتراست را در حالت تاریک به ۱.۲:۱ کاهش می‌دهد و متن نامرئی می‌شود. با تعریف توکن‌های معنایی مثل <code>bg-danger-surface</code> و <code>text-danger-text</code>، تغییر تم به شکل خودکار و طبق استاندارد WCAG AA انجام می‌پذیرد.
        </CalloutBox>
      </template>
    </ConceptCard>
  </div>
</template>
