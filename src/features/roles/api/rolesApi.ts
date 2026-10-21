import type { Permission } from '@/features/auth'
import { api } from '@/lib/api'
import type { Role, RoleInput } from '../types'

export const rolesApi = {
  list: (signal?: AbortSignal) => api.get<Role[]>('/roles', { signal }),
  get: (id: number, signal?: AbortSignal) => api.get<Role>(`/roles/${id}`, { signal }),
  permissions: (signal?: AbortSignal) => api.get<Permission[]>('/roles/permissions', { signal }),
  create: (input: RoleInput) => api.post<Role>('/roles', input),
  update: (id: number, input: RoleInput) => api.put<Role>(`/roles/${id}`, input),
  remove: (id: number) => api.delete<void>(`/roles/${id}`),
}
