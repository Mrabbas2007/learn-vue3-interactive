import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import BasicsView from '../views/BasicsView.vue'
import LifecycleView from '../views/LifecycleView.vue'
import DirectivesView from '../views/DirectivesView.vue'
import ModifiersView from '../views/ModifiersView.vue'
import CompareView from '../views/CompareView.vue'
import TokensView from '../views/TokensView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'خانه — نقشه راه یادگیری' },
  },
  {
    path: '/basics',
    name: 'basics',
    component: BasicsView,
    meta: { title: 'مفاهیم پایه — واکنش‌پذیری و ref' },
  },
  {
    path: '/lifecycle',
    name: 'lifecycle',
    component: LifecycleView,
    meta: { title: 'چرخه حیات — Lifecycle Hooks' },
  },
  {
    path: '/directives',
    name: 'directives',
    component: DirectivesView,
    meta: { title: 'دستورها — Directives' },
  },
  {
    path: '/modifiers',
    name: 'modifiers',
    component: ModifiersView,
    meta: { title: 'اصلاح‌کننده‌ها — Modifiers' },
  },
  {
    path: '/compare',
    name: 'compare',
    component: CompareView,
    meta: { title: 'تفاوت‌ها و مقایسه‌ها' },
  },
  {
    path: '/tokens',
    name: 'tokens',
    component: TokensView,
    meta: { title: 'ویترین دیزاین توکن‌های Tailwind v4' },
  },
  {
    // مسیر عمومی برای آدرس‌های نامعتبر: به‌جای صفحه‌ی خالی، 404 واقعی نشان می‌دهد
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: { title: 'صفحه پیدا نشد' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
})

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} | کارگاه Vue 3`
  }
})

export default router
