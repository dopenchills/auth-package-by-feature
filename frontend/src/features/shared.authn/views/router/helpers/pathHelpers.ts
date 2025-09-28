import { paths } from 'src/shared/router/paths'

/**
 * Paths related to authentication
 */
export const isAuthPath = (path: string): boolean => {
  const authPaths: string[] = [paths.logIn, paths.authCallback]
  return authPaths.includes(path)
}

/**
 * Paths that authenticated users can view
 */
export const isProtectedPath = (path: string): boolean => {
  return !isAuthPath(path)
}
