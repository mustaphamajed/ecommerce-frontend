import { usersApi } from '../api/usersApi'
import type { UserAccessInput } from '../types'
import { useUserMutation } from './useUserMutation'

export function useUpdateUserAccess(id: number) {
  return useUserMutation(async ({ roleIds, warehouseIds }: UserAccessInput) => {
    await usersApi.assignRoles(id, roleIds)
    return usersApi.assignWarehouses(id, warehouseIds)
  })
}
