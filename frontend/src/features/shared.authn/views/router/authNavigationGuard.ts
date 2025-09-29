import { paths } from 'src/shared/router/paths'
import type { AuthRouterGuardFunction, AuthRouterGuardContext } from './AuthRouterGuard'

export const authNavigationGuard: AuthRouterGuardFunction = async (
  context,
): Promise<AuthRouterGuardContext> => {
  const isLoggedIn = await context.authService.getIsLoggedIn()

  if (isLoggedIn && context.to === paths.logIn) {
    return {
      ...context,
      updatedTo: paths.top,
    }
  }

  if (isLoggedIn) {
    return {
      ...context,
      updatedTo: undefined,
    }
  }

  if (context.to === paths.logIn) {
    return {
      ...context,
      updatedTo: undefined,
    }
  }

  return {
    ...context,
    updatedTo: paths.logIn,
  }
}
