import { api, type PageResponse } from '@/lib/api'
import { toSortParam } from '@/lib/hooks/useListParams'
import type {
  CreateUserInput,
  Role,
  User,
  UserListParams,
  UserProfileInput,
  UserStatusFilter,
  Warehouse,
} from '../types'

export const USERS_PAGE_SIZE = 10

const enabledByStatus: Record<UserStatusFilter, boolean | undefined> = {
  '': undefined,
  active: true,
  disabled: false,
}

export const usersApi = {
  list: ({ query, status, page, sort }: UserListParams, signal?: AbortSignal) =>
    api.get<PageResponse<User>>('/users', {
      query: { q: query, enabled: enabledByStatus[status], page, size: USERS_PAGE_SIZE, sort: toSortParam(sort) },
      signal,
    }),
  get: (id: number, signal?: AbortSignal) => api.get<User>(`/users/${id}`, { signal }),
  create: (input: CreateUserInput) => api.post<User>('/users', input),
  updateProfile: (id: number, input: UserProfileInput) => api.put<User>(`/users/${id}`, input),
  assignRoles: (id: number, roleIds: number[]) => api.put<User>(`/users/${id}/roles`, { roleIds }),
  assignWarehouses: (id: number, warehouseIds: number[]) =>
    api.put<User>(`/users/${id}/warehouses`, { warehouseIds }),
  resetPassword: (id: number, password: string) => api.put<void>(`/users/${id}/password`, { password }),
  enable: (id: number) => api.post<User>(`/users/${id}/enable`),
  disable: (id: number) => api.post<User>(`/users/${id}/disable`),
  roles: (signal?: AbortSignal) => api.get<Role[]>('/roles', { signal }),
  warehouses: (signal?: AbortSignal) => api.get<Warehouse[]>('/warehouses', { signal }),
}
