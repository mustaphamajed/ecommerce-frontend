import type { UserListParams } from '../types'

export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (params: UserListParams) => [...userKeys.lists(), params] as const,
  detail: (id: number) => [...userKeys.all, 'detail', id] as const,
  roles: () => ['roles'] as const,
  warehouses: () => ['warehouses'] as const,
}
