import type { IAuthService } from '../../services/AuthService'

export interface AuthRouterGuardContext {
  // inputs
  to: string
  from: string
  authService: IAuthService

  // outputs
  updatedTo: string | undefined
}

export type AuthRouterGuardFunction = (
  context: AuthRouterGuardContext,
) => Promise<AuthRouterGuardContext>
