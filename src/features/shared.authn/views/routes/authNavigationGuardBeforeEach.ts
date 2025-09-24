import type { NavigationGuardWithThis } from 'vue-router'
import { authService } from '../variables/authService'
import { paths } from 'src/shared/routes/paths'

const isAuthPath = (path: string): boolean => {
  const authPaths: string[] = [paths.logIn, paths.authCallback]
  return authPaths.includes(path)
}

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
export const authNavigationGuardBeforeEach: NavigationGuardWithThis<undefined> = (to) => {
  const nextPath = getNextPathForAuth(to.path, authService.getIsLoggedIn())

  // return `undefined` when there's no need to update path
  // otherwise, Vue Router tries to update path infinitely
  if (to.path === nextPath) {
    return
  }

  return nextPath
}
