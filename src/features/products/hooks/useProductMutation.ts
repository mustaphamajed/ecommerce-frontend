import { useMutation, useQueryClient } from '@tanstack/react-query'
import { catalogKeys } from '@/features/catalog'
import { categoryKeys } from '@/features/categories'
import { productKeys } from '../api/productKeys'

export function useProductMutation<TVariables, TResult>(mutationFn: (variables: TVariables) => Promise<TResult>) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: productKeys.all }),
        queryClient.invalidateQueries({ queryKey: categoryKeys.all }),
        queryClient.invalidateQueries({ queryKey: catalogKeys.all }),
      ]),
  })
}
