import { createContext } from 'react'
import type { AuthStatus, CurrentUser, Permission } from '../types'

export type AuthContextValue = {
  status: AuthStatus
  user: CurrentUser | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  hasPermission: (permission: Permission) => boolean
}

export const AuthContext = createContext<AuthContextValue | null>(null)
