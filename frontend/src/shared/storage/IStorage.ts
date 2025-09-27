import type { Result } from '../result/Result'

export interface IStorage {
  save(key: string, value: string): Result<void>
  get(key: string): Result<string>
  remove(key: string): Result<void>
}
