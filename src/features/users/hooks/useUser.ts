import { useQuery } from '@tanstack/react-query'
import { userKeys } from '../api/userKeys'
import { usersApi } from '../api/usersApi'

export function useUser(id: number) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: ({ signal }) => usersApi.get(id, signal),
  })
}
