import { Boxes, LayoutDashboard, Package, ShieldCheck, Tags, Users, type LucideIcon } from 'lucide-react'
import type { Permission } from '@/features/auth'

export type NavigationItem = {
  to: string
  label: string
  icon: LucideIcon
  permission?: Permission
  end?: boolean
}

export type NavigationSection = {
  title: string
  items: NavigationItem[]
}

export const navigationSections: NavigationSection[] = [
  {
    title: 'Overview',
    items: [{ to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true }],
  },
  {
    title: 'Catalog',
    items: [
      { to: '/admin/products', label: 'Products', icon: Package, permission: 'product:read' },
      { to: '/admin/categories', label: 'Categories', icon: Tags, permission: 'product:read' },
      { to: '/admin/stock', label: 'Stock', icon: Boxes, permission: 'stock:read' },
    ],
  },
  {
    title: 'Access',
    items: [
      { to: '/admin/users', label: 'Users', icon: Users, permission: 'user:read' },
      { to: '/admin/roles', label: 'Roles', icon: ShieldCheck, permission: 'role:manage' },
    ],
  },
]
