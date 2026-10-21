import { rolesApi } from '../api/rolesApi'
import { useRoleMutation } from './useRoleMutation'

export function useDeleteRole() {
  return useRoleMutation((id: number) => rolesApi.remove(id))
}
