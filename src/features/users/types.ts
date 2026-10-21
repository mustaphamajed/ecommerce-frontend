import type { SortState } from '@/lib/hooks/useListParams'

export type RoleSummary = {
  id: number
  name: string
}

export type WarehouseSummary = {
  id: number
  code: string
  name: string
}

export type User = {
  id: number
  email: string
  firstName: string
  lastName: string
  enabled: boolean
  roles: RoleSummary[]
  warehouses: WarehouseSummary[]
  createdAt: string
  updatedAt: string
}

export type Role = {
  id: number
  name: string
  description: string | null
  builtIn: boolean
  permissions: string[]
}

export type Warehouse = WarehouseSummary

export type UserStatusFilter = '' | 'active' | 'disabled'

export type UserListParams = {
  query: string
  status: UserStatusFilter
  page: number
  sort: SortState | null
}

export type CreateUserInput = {
  email: string
  firstName: string
  lastName: string
  password: string
  roleIds: number[]
  warehouseIds: number[]
}

export type UserProfileInput = {
  email: string
  firstName: string
  lastName: string
}

export type UserAccessInput = {
  roleIds: number[]
  warehouseIds: number[]
}
