import { paths } from 'src/shared/router/paths'
import type {
  AuthRouterGuardWorkflowFunction,
  AuthRouterGuardWorkflowContext,
} from './AuthRouterGuardWorkflow'

export const authNavigationGuard: AuthRouterGuardWorkflowFunction = async (
  context,
): Promise<AuthRouterGuardWorkflowContext> => {
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
