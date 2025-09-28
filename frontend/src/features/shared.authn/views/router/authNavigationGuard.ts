import { paths } from 'src/shared/router/paths'
import type {
  AuthRouterGuardWorkflowFunction,
  AuthRouterGuardWorkflowContext,
} from './AuthRouterGuardWorkflow'
import { isAuthPath } from './helpers/pathHelpers'

export const authNavigationGuard: AuthRouterGuardWorkflowFunction = async (
  context,
): Promise<AuthRouterGuardWorkflowContext> => {
  const isLoggedIn = await context.authService.getIsLoggedIn()

  if (isLoggedIn && isAuthPath(context.to)) {
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

  if (isAuthPath(context.to)) {
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
