import type { NavigationGuardWithThis } from 'vue-router'
import { authService } from '../variables/authService'
import { paths } from 'src/shared/router/paths'
import { isAuthPath } from './helpers/pathHelpers'

export const getNextPathForAuth = (pathTo: string, isLoggedIn: boolean): string => {
  if (isLoggedIn && isAuthPath(pathTo)) {
    return paths.top
  }

  if (isLoggedIn) {
    return pathTo
  }

  if (isAuthPath(pathTo)) {
    return pathTo
  }

  return paths.logIn
}

// Adapt `getNextPath` to Vue Router way
export const authNavigationGuardBeforeEach: NavigationGuardWithThis<undefined> = async (to) => {
  const nextPath = getNextPathForAuth(to.path, await authService.getIsLoggedIn())

  // return `undefined` when there's no need to update path
  // otherwise, Vue Router tries to update path infinitely
  if (to.path === nextPath) {
    return
  }

  return nextPath
}
