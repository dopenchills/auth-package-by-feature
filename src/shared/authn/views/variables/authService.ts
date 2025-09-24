import { reactive } from 'vue'
import { AuthService, type IAuthService } from '../../services/AuthService'

// Singleton
export const authService = reactive<IAuthService>(new AuthService())
