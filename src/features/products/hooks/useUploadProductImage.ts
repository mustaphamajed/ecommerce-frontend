import { productsApi } from '../api/productsApi'
import { useProductMutation } from './useProductMutation'

export function useUploadProductImage(id: number) {
  return useProductMutation((image: File) => productsApi.uploadImage(id, image), { errorToast: true })
}
