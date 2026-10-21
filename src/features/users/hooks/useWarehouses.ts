import { useQuery } from '@tanstack/react-query'
import { userKeys } from '../api/userKeys'
import { usersApi } from '../api/usersApi'

export function useWarehouses() {
  return useQuery({
    queryKey: userKeys.warehouses(),
    queryFn: ({ signal }) => usersApi.warehouses(signal),
    staleTime: 5 * 60_000,
  })
}
