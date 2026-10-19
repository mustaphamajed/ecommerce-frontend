import type { Permission } from '@/features/auth'

export type NavigationItem = {
  to: string
  label: string
  permission?: Permission
  end?: boolean
}

export const navigationItems: NavigationItem[] = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/categories', label: 'Categories', permission: 'product:read' },
  { to: '/admin/users', label: 'Users', permission: 'user:read' },
]
