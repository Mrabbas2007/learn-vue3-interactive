import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initTheme } from './composables/useTheme'

// استایل‌های پایه، فونت‌ها، تنظیمات RTL و دیزاین توکن‌های Tailwind CSS v4
import './assets/main.css'

// دایرکتیو سفارشی سراسری (Global Custom Directive)
import highlight from './directives/highlight'

// ۱. اعمال تم ذخیره‌شده (یا تم سیستم) پیش از اولین رندر تا پرش رنگ نداشته باشیم
initTheme()

// ۲. ساخت نمونه برنامه Vue با کامپوننت ریشه App
const app = createApp(App)

// ۳. رجیستر کردن روتر برای مسیریابی بین صفحات
app.use(router)

// ۴. ثبت دایرکتیو به صورت سراسری؛ پس از این در تمام کامپوننت‌ها به عنوان v-highlight در دسترس است
app.directive('highlight', highlight)

// ۵. اتصال برنامه به المان <div id="app"> در فایل index.html
app.mount('#app')
