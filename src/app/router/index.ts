import { authNavigationGuardBeforeEach } from 'src/features/shared.authn/views/routes/authNavigationGuardBeforeEach'
import { paths } from 'src/shared/routes/paths'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: paths.top,
      name: 'home',
      component: () => import('src/features/top/views/pages/HomeView.vue'),
    },
    {
      path: paths.about,
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('src/features/top/views/pages/AboutView.vue'),
    },
    {
      path: paths.logIn,
      name: 'login',
      component: () => import('src/features/shared.authn/views/pages/LogInView.vue'),
    },
    {
      path: paths.authCallback,
      name: 'authCallback',
      component: () => import('src/features/shared.authn/views/pages/AuthCallbackView.vue'),
    },
  ],
})

router.beforeEach(authNavigationGuardBeforeEach)

export default router
