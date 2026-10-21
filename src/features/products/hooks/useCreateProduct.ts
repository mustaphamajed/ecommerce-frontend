import { productsApi } from '../api/productsApi'
import type { ProductInput } from '../types'
import { useProductMutation } from './useProductMutation'

export function useCreateProduct() {
  return useProductMutation((input: ProductInput) => productsApi.create(input))
}
