import type { NavigationGuardWithThis } from 'vue-router'
import { authService } from '../variables/authService'
import { paths } from 'src/shared/routes/paths'
import type { IAuthService } from '../../services/AuthService'

export const getNextPathForAuth = (pathTo: string, authService: IAuthService): string => {
  if (
    authService.getIsLoggedIn() &&
    (pathTo === paths.logIn || pathTo === paths.authCallback)
  ) {
    return paths.top
  }

  if (authService.getIsLoggedIn()) {
    return pathTo
  }

  if (
    !authService.getIsLoggedIn() &&
    (pathTo === paths.logIn || pathTo === paths.authCallback)
  ) {
    return pathTo
  }

  return paths.logIn
}

// Adapt `getNextPath` to Vue Router way
export const authNavigationGuardBeforeEach: NavigationGuardWithThis<undefined> = (to) => {
  const nextPath = getNextPathForAuth(to.path, authService)

  // return `undefined` when there's no need to update path
  // otherwise, Vue Router tries to update path infinitely
  if (to.path === nextPath) {
    return
  }

  return nextPath
}
