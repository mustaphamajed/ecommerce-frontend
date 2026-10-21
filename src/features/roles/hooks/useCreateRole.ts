import { rolesApi } from '../api/rolesApi'
import type { RoleInput } from '../types'
import { useRoleMutation } from './useRoleMutation'

export function useCreateRole() {
  return useRoleMutation((input: RoleInput) => rolesApi.create(input))
}
