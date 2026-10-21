import { productsApi } from '../api/productsApi'
import type { ProductInput } from '../types'
import { useProductMutation } from './useProductMutation'

export function useUpdateProduct(id: number) {
  return useProductMutation((input: ProductInput) => productsApi.update(id, input))
}
