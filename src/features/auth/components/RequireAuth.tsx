import { Navigate, Outlet, useLocation } from 'react-router'
import { FullPageSpinner } from '@/components/ui'
import { useAuth } from '../context/useAuth'

export function RequireAuth() {
  const { status } = useAuth()
  const location = useLocation()

  return {
    loading: <FullPageSpinner />,
    authenticated: <Outlet />,
    anonymous: <Navigate to="/login" replace state={{ from: location }} />,
  }[status]
}
