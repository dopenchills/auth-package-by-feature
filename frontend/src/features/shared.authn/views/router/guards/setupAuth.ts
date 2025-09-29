import type { AuthRouterGuardContext, AuthRouterGuardFunction } from './AuthRouterGuard'

export const setupAuth: AuthRouterGuardFunction = async (
  context,
): Promise<AuthRouterGuardContext> => {
  await context.authService.initialize()
  await context.authService.handleLogInRedirect()
  return context
}
