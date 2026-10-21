import { productsApi } from '../api/productsApi'
import { useProductMutation } from './useProductMutation'

export function useArchiveProduct() {
  return useProductMutation((id: number) => productsApi.archive(id))
}
