import type { NavigationGuardWithThis } from 'vue-router'
import { authService } from '../variables/authService'

export const handleLogInRedirectBeforeEach: NavigationGuardWithThis<undefined> = async () => {
  await authService.initialize()
  await authService.handleLogInRedirect()
}
