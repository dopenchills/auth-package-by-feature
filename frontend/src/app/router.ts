import { authNavigationGuard } from 'src/features/shared.authn/views/router/authNavigationGuard'
import type { AuthRouterGuardWorkflowContext } from 'src/features/shared.authn/views/router/AuthRouterGuardWorkflow'
import { handleLogInRedirect } from 'src/features/shared.authn/views/router/handleLogInRedirect'
import { saveRoute } from 'src/features/shared.authn/views/router/saveRoute'
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
  const result = await Promise.resolve<AuthRouterGuardWorkflowContext>({
    to: to.path,
    from: from.path,
    authService,

    // output
    updatedTo: undefined,
  })
    .then(handleLogInRedirect)
    .then(authNavigationGuard)
    .then(saveRoute)

  return result.updatedTo
})

export default router
