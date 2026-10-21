import type { Permission } from '@/features/auth'

export type Role = {
  id: number
  name: string
  description: string | null
  builtIn: boolean
  permissions: Permission[]
  userCount: number
}

export type RoleInput = {
  name: string
  description: string | null
  permissions: Permission[]
}
