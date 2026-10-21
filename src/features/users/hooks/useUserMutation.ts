import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userKeys } from '../api/userKeys'

export function useUserMutation<TVariables, TResult>(mutationFn: (variables: TVariables) => Promise<TResult>) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: userKeys.all }),
  })
}
