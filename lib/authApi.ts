import api from './api'
import { ApiResponse, AuthTokens } from '@/types'

export const authApi = {
  register: (name: string, email: string, password: string) =>
    api.post<ApiResponse<AuthTokens>>('/api/auth/register', { name, email, password }),

  login: (email: string, password: string) =>
    api.post<ApiResponse<AuthTokens>>('/api/auth/login', { email, password }),

  refresh: (refreshToken: string) =>
    api.post<ApiResponse<AuthTokens>>('/api/auth/refresh', { refreshToken }),
}
