import type { IStorage } from '../IStorage'
import { SessionStorageService } from '../SessionStorageService'

// Singleton
export const sessionStorageService: IStorage = new SessionStorageService()
