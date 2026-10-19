import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { catalogApi } from '../api/catalogApi'
import { catalogKeys } from '../api/catalogKeys'
import type { CatalogProductsParams } from '../types'

export function useCatalogProducts(params: CatalogProductsParams) {
  return useQuery({
    queryKey: catalogKeys.products(params),
    queryFn: ({ signal }) => catalogApi.getProducts(params, signal),
    placeholderData: keepPreviousData,
  })
}
