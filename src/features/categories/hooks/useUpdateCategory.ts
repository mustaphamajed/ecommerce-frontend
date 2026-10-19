import { useMutation } from '@tanstack/react-query'
import { categoriesApi } from '../api/categoriesApi'
import type { CategoryInput } from '../types'
import { useInvalidateCategories } from './useInvalidateCategories'

export function useUpdateCategory(id: number) {
  const invalidateCategories = useInvalidateCategories()

  return useMutation({
    mutationFn: (input: CategoryInput) => categoriesApi.update(id, input),
    onSuccess: invalidateCategories,
  })
}
