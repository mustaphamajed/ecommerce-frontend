import { useQuery } from '@tanstack/react-query'
import { roleKeys } from '../api/roleKeys'
import { rolesApi } from '../api/rolesApi'

export function useRoleList() {
  return useQuery({
    queryKey: roleKeys.all,
    queryFn: ({ signal }) => rolesApi.list(signal),
  })
}
