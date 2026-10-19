import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { categoriesApi } from '../api/categoriesApi'
import { categoryKeys } from '../api/categoryKeys'
import type { CategoryListParams } from '../types'

export function useCategories(params: CategoryListParams) {
  return useQuery({
    queryKey: categoryKeys.list(params),
    queryFn: ({ signal }) => categoriesApi.list(params, signal),
    placeholderData: keepPreviousData,
  })
}
