import { useMutation, useQueryClient } from '@tanstack/react-query'
import { roleKeys } from '../api/roleKeys'

const USERS_QUERY_KEY = ['users'] as const

export function useRoleMutation<TVariables, TResult>(mutationFn: (variables: TVariables) => Promise<TResult>) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: roleKeys.all }),
        queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY }),
      ]),
  })
}
