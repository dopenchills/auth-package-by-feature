import { isProtectedPath } from 'src/features/shared.authn/views/router/helpers/pathHelpers'
import { sessionStorageService } from 'src/shared/storage/views/sessionStorageService'
import { AFTER_LOGIN_PATH_SESSION_STORAGE_KEY } from './constants/sessionStorage'
import type { AuthRouterGuardContext, AuthRouterGuardFunction } from './AuthRouterGuard'

export const saveRouteWhenLoggingIn: AuthRouterGuardFunction = async (
  context,
): Promise<AuthRouterGuardContext> => {
  const isLoggedIn = await context.authService.getIsLoggedIn()

  if (!isLoggedIn && isProtectedPath(context.to)) {
    sessionStorageService.save(AFTER_LOGIN_PATH_SESSION_STORAGE_KEY, context.to)
  }

  return context
}
