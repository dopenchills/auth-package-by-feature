import { paths } from 'src/shared/router/paths'

export const isAuthPath = (path: string): boolean => {
  const authPaths: string[] = [paths.logIn, paths.authCallback]
  return authPaths.includes(path)
}
