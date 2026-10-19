import { useMutation } from '@tanstack/react-query'
import { categoriesApi } from '../api/categoriesApi'
import { useInvalidateCategories } from './useInvalidateCategories'

export function useDeleteCategory() {
  const invalidateCategories = useInvalidateCategories()

  return useMutation({
    mutationFn: (id: number) => categoriesApi.remove(id),
    onSuccess: invalidateCategories,
  })
}
