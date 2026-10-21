import { rolesApi } from '../api/rolesApi'
import type { RoleInput } from '../types'
import { useRoleMutation } from './useRoleMutation'

export function useUpdateRole(id: number) {
  return useRoleMutation((input: RoleInput) => rolesApi.update(id, input))
}
