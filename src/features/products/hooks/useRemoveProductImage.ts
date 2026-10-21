import { productsApi } from '../api/productsApi'
import { useProductMutation } from './useProductMutation'

export function useRemoveProductImage(id: number) {
  return useProductMutation(() => productsApi.removeImage(id), { errorToast: true })
}
