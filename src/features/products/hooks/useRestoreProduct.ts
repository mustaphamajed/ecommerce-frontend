import { productsApi } from '../api/productsApi'
import { useProductMutation } from './useProductMutation'

export function useRestoreProduct() {
  return useProductMutation((id: number) => productsApi.restore(id), { errorToast: true })
}
