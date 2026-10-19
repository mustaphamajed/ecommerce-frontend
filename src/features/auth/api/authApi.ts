import { api } from '@/lib/api'
import type { CurrentUser, TokenResponse } from '../types'

export const authApi = {
  login: (email: string, password: string) =>
    api.post<TokenResponse>('/auth/login', { email, password }, { skipAuthRefresh: true }),
  logout: () => api.post<void>('/auth/logout', undefined, { skipAuthRefresh: true }),
  me: () => api.get<CurrentUser>('/auth/me'),
}
