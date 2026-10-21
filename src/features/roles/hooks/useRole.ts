import { useQuery } from '@tanstack/react-query'
import { roleKeys } from '../api/roleKeys'
import { rolesApi } from '../api/rolesApi'

export function useRole(id: number) {
  return useQuery({
    queryKey: roleKeys.detail(id),
    queryFn: ({ signal }) => rolesApi.get(id, signal),
  })
}
