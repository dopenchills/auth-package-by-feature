import { authNavigationGuardBeforeEach } from 'src/features/shared.authn/views/router/authNavigationGuardBeforeEach'
import { saveRouteBeforeEach } from 'src/features/shared.authn/views/router/saveRouteBeforeEach'
import { paths } from 'src/shared/router/paths'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: paths.top,
      component: () => import('src/features/top/views/pages/HomeView.vue'),
    },
    {
      path: paths.about,
      component: () => import('src/features/top/views/pages/AboutView.vue'),
    },
    {
      path: paths.logIn,
      component: () => import('src/features/shared.authn/views/pages/LogInView.vue'),
    },
    {
      path: paths.authCallback,
      component: () => import('src/features/shared.authn/views/pages/AuthCallbackView.vue'),
    },
  ],
})

router.beforeEach(saveRouteBeforeEach)
router.beforeEach(authNavigationGuardBeforeEach)

export default router
