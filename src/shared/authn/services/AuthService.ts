import { err, ok, type Result } from 'src/shared/result/Result'
import type { AuthState } from '../models/AuthState'

export interface IAuthService {
  logIn(): Promise<Result<void>>
  handleLogInRedirect(): Promise<Result<void>>
  logOut(): Promise<Result<void>>
  getIsLoggedIn(): boolean
  getAccessToken(): Promise<Result<string>>
}

export class AuthService implements IAuthService {
  private state: AuthState = {
    isLoggedIn: false,
  }

  async logIn(): Promise<Result<void>> {
    console.log('logging in')

    // assuming browser navigate to external login page, then redirected to auth callback
    window.location.href = '/auth/callback'

    return ok(undefined)
  }

  async logOut(): Promise<Result<void>> {
    console.log('logging out')

    this.state = {
      isLoggedIn: false,
    }

    return ok(undefined)
  }

  async handleLogInRedirect(): Promise<Result<void>> {
    console.log('handling logging in flow after redirect')

    this.state = {
      isLoggedIn: true,
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    }

    return ok(undefined)
  }

  getIsLoggedIn(): boolean {
    return this.state.isLoggedIn
  }

  async getAccessToken(): Promise<Result<string>> {
    if (this.state.isLoggedIn === false) {
      return err(new Error('user is not logged in'))
    }

    console.log('getting access token (refresh access token if needed)')
    this.state = {
      isLoggedIn: true,
      accessToken: 'accessToken2',
      refreshToken: 'refreshToken2',
    }

    return ok(this.state.accessToken)
  }
}
