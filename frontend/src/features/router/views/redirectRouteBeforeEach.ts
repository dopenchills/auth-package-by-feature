import type { NavigationGuardWithThis } from 'vue-router'
import { AFTER_LOGIN_PATH_SESSION_STORAGE_KEY } from './constants'
import { isAuthPath } from 'src/features/shared.authn/views/router/helpers/isAuthPath'
import { authService } from 'src/features/shared.authn/views/variables/authService'
import { sessionStorageService } from 'src/shared/storage/views/sessionStorageService'

const shouldRedirect = (to: string, from: string, isLoggedIn: boolean): boolean => {
  if (isAuthPath(from) && !isAuthPath(to) && isLoggedIn) {
    return true
  }

  return false
}

export const redirectRouteBeforeEach: NavigationGuardWithThis<undefined> = (
  to,
  from,
): string | undefined => {
  console.log(to, from)
  if (shouldRedirect(to.path, from.path, authService.getIsLoggedIn())) {
    const redirectToResult = sessionStorageService.get(AFTER_LOGIN_PATH_SESSION_STORAGE_KEY)

    if (!redirectToResult.isSuccess) {
      return undefined
    }

    sessionStorageService.remove(AFTER_LOGIN_PATH_SESSION_STORAGE_KEY)
    return redirectToResult.data
  }

  return undefined
}
