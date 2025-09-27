import { err, ok, type Result } from '../result/Result'
import type { IStorage } from './IStorage'

export class SessionStorageService implements IStorage {
  save(key: string, value: string): Result<void> {
    try {
      window.sessionStorage.setItem(key, value)
      return ok(undefined)
    } catch (error) {
      return error instanceof Error ? err(error) : err(new Error(String(error)))
    }
  }

  get(key: string): Result<string> {
    const item = window.sessionStorage.getItem(key)

    if (item === null) {
      return err(new Error('Item not found'))
    }

    return ok(item)
  }

  remove(key: string): Result<void> {
    const item = window.sessionStorage.getItem(key)

    if (item === null) {
      return err(new Error('Item not found'))
    }

    window.sessionStorage.removeItem(key)
    return ok(undefined)
  }
}
