import type {
  AuthRouterGuardWorkflowContext,
  AuthRouterGuardWorkflowFunction,
} from './AuthRouterGuardWorkflow'

export const handleLogInRedirect: AuthRouterGuardWorkflowFunction = async (
  context,
): Promise<AuthRouterGuardWorkflowContext> => {
  await context.authService.initialize()
  await context.authService.handleLogInRedirect()
  return context
}
