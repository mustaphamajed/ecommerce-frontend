import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userKeys } from '../api/userKeys'

type MutationOptions = {
  errorToast?: boolean
}

export function useUserMutation<TVariables, TResult>(
  mutationFn: (variables: TVariables) => Promise<TResult>,
  { errorToast = false }: MutationOptions = {},
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn,
    meta: { errorToast },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: userKeys.all }),
  })
}
