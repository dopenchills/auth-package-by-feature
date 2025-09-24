import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('src/features/top/views/pages/HomeView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('src/features/top/views/pages/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('src/shared/authn/views/pages/LogInView.vue'),
    },
    {
      path: '/auth/callback',
      name: 'authCallback',
      component: () => import('src/shared/authn/views/pages/AuthCallbackView.vue'),
    },
  ],
})

export default router
