import { useQuery } from '@tanstack/react-query'
import { categoriesApi } from '../api/categoriesApi'
import { categoryKeys } from '../api/categoryKeys'

export function useCategory(id: number) {
  return useQuery({
    queryKey: categoryKeys.detail(id),
    queryFn: ({ signal }) => categoriesApi.get(id, signal),
  })
}
