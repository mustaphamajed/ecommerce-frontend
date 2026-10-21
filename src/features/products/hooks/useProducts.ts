import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { productKeys } from '../api/productKeys'
import { productsApi } from '../api/productsApi'
import type { ProductListParams } from '../types'

export function useProducts(params: ProductListParams) {
  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: ({ signal }) => productsApi.list(params, signal),
    placeholderData: keepPreviousData,
  })
}
