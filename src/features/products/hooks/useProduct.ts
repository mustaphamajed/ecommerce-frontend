import { useQuery } from '@tanstack/react-query'
import { productKeys } from '../api/productKeys'
import { productsApi } from '../api/productsApi'

export function useProduct(id: number) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: ({ signal }) => productsApi.get(id, signal),
  })
}
