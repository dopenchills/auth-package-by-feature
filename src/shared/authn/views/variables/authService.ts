import { reactive } from 'vue'
import { AuthService } from '../../services/AuthService'

// Singleton
export const authService = reactive(new AuthService())
