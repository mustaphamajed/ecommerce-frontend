import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { refreshAccessToken, setSessionExpiredHandler, tokenStore } from '@/lib/api'
import { authApi } from '../api/authApi'
import type { AuthStatus, CurrentUser, Permission } from '../types'
import { AuthContext, type AuthContextValue } from './AuthContext'

type AuthState = {
  status: AuthStatus
  user: CurrentUser | null
}

type AuthProviderProps = {
  children: ReactNode
}

const ANONYMOUS: AuthState = { status: 'anonymous', user: null }

export function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient()
  const [state, setState] = useState<AuthState>({ status: 'loading', user: null })

  const signOutLocally = useCallback(() => {
    tokenStore.clear()
    queryClient.clear()
    setState(ANONYMOUS)
  }, [queryClient])

  useEffect(() => {
    setSessionExpiredHandler(signOutLocally)
    return () => setSessionExpiredHandler(null)
  }, [signOutLocally])

  useEffect(() => {
    let cancelled = false
    restoreSession().then((user) => {
      if (!cancelled) {
        setState(user ? { status: 'authenticated', user } : ANONYMOUS)
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const tokens = await authApi.login(email, password)
    tokenStore.set(tokens.accessToken)
    const user = await authApi.me()
    setState({ status: 'authenticated', user })
  }, [])

  const logout = useCallback(async () => {
    try {
      await authApi.logout()
    } finally {
      signOutLocally()
    }
  }, [signOutLocally])

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      login,
      logout,
      hasPermission: (permission: Permission) => state.user?.permissions.includes(permission) ?? false,
    }),
    [state, login, logout],
  )

  return <AuthContext value={value}>{children}</AuthContext>
}

async function restoreSession(): Promise<CurrentUser | null> {
  const refreshed = await refreshAccessToken()
  return refreshed ? authApi.me().catch(() => null) : null
}
