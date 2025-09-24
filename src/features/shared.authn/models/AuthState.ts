export type AuthState =
  | {
      isLoggedIn: true
      accessToken: string
      refreshToken: string
    }
  | {
      isLoggedIn: false
    }
