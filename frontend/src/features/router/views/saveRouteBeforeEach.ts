import { isAuthPath } from 'src/features/shared.authn/views/router/helpers/isAuthPath'
import { authService } from 'src/features/shared.authn/views/variables/authService'
import type { NavigationGuardWithThis } from 'vue-router'
import { AFTER_LOGIN_PATH_SESSION_STORAGE_KEY } from './constants'
import { sessionStorageService } from 'src/shared/storage/views/sessionStorageService'

const shouldSaveRoute = (to: string, isLoggedIn: boolean): boolean => {
  if (!isLoggedIn && !isAuthPath(to)) {
    return true
  }

  return false
}

export const saveRouteBeforeEach: NavigationGuardWithThis<undefined> = (to) => {
  if (shouldSaveRoute(to.path, authService.getIsLoggedIn())) {
    sessionStorageService.save(AFTER_LOGIN_PATH_SESSION_STORAGE_KEY, to.path)
  }
}
