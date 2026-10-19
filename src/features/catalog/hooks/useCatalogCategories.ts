import { useQuery } from '@tanstack/react-query'
import { catalogApi } from '../api/catalogApi'
import { catalogKeys } from '../api/catalogKeys'

export function useCatalogCategories() {
  return useQuery({
    queryKey: catalogKeys.categories(),
    queryFn: ({ signal }) => catalogApi.getCategories(signal),
    staleTime: 5 * 60_000,
  })
}
