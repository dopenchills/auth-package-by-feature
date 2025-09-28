import type { IAuthService } from '../../services/AuthService'

export interface AuthRouterGuardWorkflowContext {
  // inputs
  to: string
  from: string
  authService: IAuthService

  // outputs
  updatedTo: string | undefined
}

export type AuthRouterGuardWorkflowFunction = (
  context: AuthRouterGuardWorkflowContext,
) => Promise<AuthRouterGuardWorkflowContext>
