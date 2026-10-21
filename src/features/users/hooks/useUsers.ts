import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { userKeys } from '../api/userKeys'
import { usersApi } from '../api/usersApi'
import type { UserListParams } from '../types'

export function useUsers(params: UserListParams) {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: ({ signal }) => usersApi.list(params, signal),
    placeholderData: keepPreviousData,
  })
}
