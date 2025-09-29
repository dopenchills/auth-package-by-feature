import { authNavigationGuard } from 'src/features/shared.authn/views/router/guards/authNavigationGuard'
import type { AuthRouterGuardContext } from 'src/features/shared.authn/views/router/guards/AuthRouterGuard'
import { saveRouteWhenLoggingIn } from 'src/features/shared.authn/views/router/guards/saveRouteWhenLoggingIn'
import { setupAuth } from 'src/features/shared.authn/views/router/guards/setupAuth'
import { authService } from 'src/features/shared.authn/views/variables/authService'
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

router.beforeEach(async (to, from) => {
  const result = await Promise.resolve<AuthRouterGuardContext>({
    to: to.path,
    from: from.path,
    authService,

    // output
    updatedTo: undefined,
  })
    .then(setupAuth)
    .then(authNavigationGuard)
    .then(saveRouteWhenLoggingIn)

  return result.updatedTo
})

export default router
