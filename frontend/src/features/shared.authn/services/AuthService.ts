import { err, ok, type Result } from 'src/shared/result/Result'
import * as msal from '@azure/msal-browser'
import { paths } from 'src/shared/router/paths'

export interface IAuthService {
  initialize(): Promise<msal.IPublicClientApplication>
  logIn(): Promise<Result<void>>
  handleLogInRedirect(): Promise<Result<void>>
  logOut(): Promise<Result<void>>
  getIsLoggedIn(): Promise<boolean>
  getAccessToken(): Promise<Result<string>>
}

export class AuthService implements IAuthService {
  private pca: msal.IPublicClientApplication | undefined

  async initialize(): Promise<msal.IPublicClientApplication> {
    this.pca = await msal.createStandardPublicClientApplication({
      auth: {
        clientId: '74157be3-dc6c-4cef-87f8-2a5147e6ae9d',
        authority: 'https://login.microsoftonline.com/bd2dd8b7-2bf5-456d-9dda-80f8b462c6c9',
        redirectUri: `${import.meta.env.BASE_URL}${paths.authCallback.replace(/^\//, '')}`,
      },
    })

    await this.pca.initialize()

    return this.pca
  }

  private async getPca(): Promise<msal.IPublicClientApplication> {
    if (this.pca === undefined) {
      this.pca = await this.initialize()
    }

    return this.pca
  }

  private async getAccount(): Promise<msal.AccountInfo | undefined> {
    const pca = await this.getPca()

    const accounts = pca.getAllAccounts()
    console.log(accounts)
    if (accounts.length === 1) {
      return accounts[0]
    }

    return undefined
  }

  async logIn(): Promise<Result<void>> {
    const pca = await this.getPca()
    await pca.loginRedirect({
      scopes: ['User.Read'],
    })

    // not reaching here because of redirect
    return ok(undefined)
  }

  async logOut(): Promise<Result<void>> {
    const pca = await this.getPca()
    await pca.logoutRedirect({
      account: await this.getAccount(),
    })

    // not reaching here because of redirect
    return ok(undefined)
  }

  async handleLogInRedirect(): Promise<Result<void>> {
    const pca = await this.getPca()

    try {
      const authenticationResult = await pca.handleRedirectPromise()

      if (authenticationResult === null) {
        console.warn('Not coming back from auth redirect')
      }

      return ok(undefined)
    } catch (error) {
      console.error(error)
      return error instanceof Error ? err(error) : err(new Error(String(error)))
    }
  }

  async getIsLoggedIn(): Promise<boolean> {
    return (await this.getAccount()) !== undefined
  }

  async getAccessToken(): Promise<Result<string>> {
    const pca = await this.getPca()

    if (!(await this.getIsLoggedIn())) {
      return err(new Error('user is not logged in'))
    }

    try {
      const authenticationResult = await pca.acquireTokenSilent({
        scopes: ['User.Read'],
      })

      return ok(authenticationResult.accessToken)
    } catch (error) {
      return error instanceof Error ? err(error) : err(new Error(String(error)))
    }
  }
}
