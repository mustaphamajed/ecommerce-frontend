import { Outlet } from 'react-router'
import { useAuth } from '../context/useAuth'
import type { Permission } from '../types'
import { AccessDenied } from './AccessDenied'

type RequirePermissionProps = {
  permission: Permission
}

export function RequirePermission({ permission }: RequirePermissionProps) {
  const { hasPermission } = useAuth()

  return hasPermission(permission) ? <Outlet /> : <AccessDenied />
}
