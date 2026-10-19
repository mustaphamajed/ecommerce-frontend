import { useQueryClient } from '@tanstack/react-query'
import { catalogKeys } from '@/features/catalog'
import { categoryKeys } from '../api/categoryKeys'

export function useInvalidateCategories() {
  const queryClient = useQueryClient()

  return () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: categoryKeys.all }),
      queryClient.invalidateQueries({ queryKey: catalogKeys.all }),
    ])
}
