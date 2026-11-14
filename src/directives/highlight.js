/**
 * دایرکتیو سفارشی: v-highlight
 * 
 * دایرکتیو چیست؟
 * کدی با قابلیت استفاده مجدد که مستقیماً به چرخه‌ی حیات (Lifecycle) المان DOM متصل می‌شود.
 * این ابزار زمانی عالی است که نیاز دارید تغییرات سطح پایینی روی المان‌های DOM اعمال کنید
 * که کامپوننت‌ها به تنهایی برای آن مناسب نیستند.
 * 
 * ساختار شیء دایرکتیو:
 * - mounted(el, binding): زمانی که عنصر به DOM متصل شد اجرا می‌شود.
 * - updated(el, binding): زمانی که کامپوننت والد یا متغیر متصل به دایرکتیو به‌روز شد اجرا می‌شود.
 * - unmounted(el): هنگام حذف عنصر از DOM برای پاک‌سازی ایونت‌ها و جلوگیری از Memory Leak اجرا می‌شود.
 * 
 * پارامترها:
 * - el: المان واقعی DOM (مثلاً HTMLSpanElement یا HTMLDivElement)
 * - binding.value: مقداری که به دایرکتیو داده شده (مثلاً v-highlight="'#fef08a'" یا متغیر پویا)
 * - binding.modifiers: آبجکتی از پسوندها (مثلاً v-highlight.hover.big => { hover: true, big: true })
 * - binding.arg: آرگومان احتمالی (مثلاً v-highlight:background => arg = 'background')
 */

function applyHighlight(el, binding) {
  const defaultColor = '#fef08a' // رنگ زرد پاستلی ملایم بر اساس تم
  const color = binding.value || defaultColor

  if (binding.modifiers.big) {
    el.style.fontSize = '1.25rem'
    el.style.fontWeight = '700'
  }

  // اگر اصلاح‌کننده .hover فعال باشد، رنگ فقط هنگام قرار گرفتن موس اعمال می‌شود
  if (binding.modifiers.hover) {
    // ذخیره توابع برای امکان پاک‌سازی در unmounted
    if (!el.__highlightHandlers__) {
      el.__highlightHandlers__ = {
        enter: () => {
          el.style.backgroundColor = el.__highlightColor__ || defaultColor
          el.style.transition = 'background-color 0.2s ease'
        },
        leave: () => {
          el.style.backgroundColor = 'transparent'
        },
      }
      el.addEventListener('mouseenter', el.__highlightHandlers__.enter)
      el.addEventListener('mouseleave', el.__highlightHandlers__.leave)
    }
    // رنگ جاری را به‌روز می‌کنیم تا در هاور بعدی از رنگ جدید استفاده شود
    el.__highlightColor__ = color
  } else {
    // حالت عادی بدون هاور: رنگ بلافاصله اعمال می‌شود
    el.style.backgroundColor = color
    el.style.transition = 'background-color 0.2s ease'
    el.style.padding = '0.15rem 0.4rem'
    el.style.borderRadius = '0.375rem'
  }
}

const highlight = {
  // ۱. هوک اتصال به صفحه
  mounted(el, binding) {
    applyHighlight(el, binding)
  },

  // ۲. هوک به‌روزرسانی (وقتی متغیر رنگ تغییر کند این متد صدا زده می‌شود)
  updated(el, binding) {
    applyHighlight(el, binding)
  },

  // ۳. هوک حذف از صفحه (پاک‌سازی برای جلوگیری از Memory Leak)
  unmounted(el) {
    if (el.__highlightHandlers__) {
      el.removeEventListener('mouseenter', el.__highlightHandlers__.enter)
      el.removeEventListener('mouseleave', el.__highlightHandlers__.leave)
      delete el.__highlightHandlers__
      delete el.__highlightColor__
    }
  },
}

export default highlight
