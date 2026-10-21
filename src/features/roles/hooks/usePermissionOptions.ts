import { useQuery } from '@tanstack/react-query'
import { roleKeys } from '../api/roleKeys'
import { rolesApi } from '../api/rolesApi'

export function usePermissionOptions() {
  return useQuery({
    queryKey: roleKeys.permissions(),
    queryFn: ({ signal }) => rolesApi.permissions(signal),
    staleTime: Infinity,
  })
}
