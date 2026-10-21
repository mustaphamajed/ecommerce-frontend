import { useMutation, useQueryClient } from '@tanstack/react-query'
import { catalogKeys } from '@/features/catalog'
import { categoryKeys } from '@/features/categories'
import { productKeys } from '../api/productKeys'

type MutationOptions = {
  errorToast?: boolean
}

export function useProductMutation<TVariables, TResult>(
  mutationFn: (variables: TVariables) => Promise<TResult>,
  { errorToast = false }: MutationOptions = {},
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn,
    meta: { errorToast },
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: productKeys.all }),
        queryClient.invalidateQueries({ queryKey: categoryKeys.all }),
        queryClient.invalidateQueries({ queryKey: catalogKeys.all }),
      ]),
  })
}
