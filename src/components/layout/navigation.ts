import type { Permission } from '@/features/auth'

export type NavigationItem = {
  to: string
  label: string
  permission?: Permission
  end?: boolean
}

export const navigationItems: NavigationItem[] = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/categories', label: 'Categories', permission: 'product:read' },
  { to: '/users', label: 'Users', permission: 'user:read' },
]
