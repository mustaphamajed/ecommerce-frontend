import { useQuery } from '@tanstack/react-query'
import { userKeys } from '../api/userKeys'
import { usersApi } from '../api/usersApi'

export function useRoles() {
  return useQuery({
    queryKey: userKeys.roles(),
    queryFn: ({ signal }) => usersApi.roles(signal),
    staleTime: 5 * 60_000,
  })
}
