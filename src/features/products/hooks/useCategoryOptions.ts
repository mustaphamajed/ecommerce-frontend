import { useQuery } from '@tanstack/react-query'
import { productKeys } from '../api/productKeys'
import { productsApi } from '../api/productsApi'

export function useCategoryOptions() {
  return useQuery({
    queryKey: productKeys.categoryOptions(),
    queryFn: ({ signal }) => productsApi.categoryOptions(signal),
    staleTime: 5 * 60_000,
  })
}
