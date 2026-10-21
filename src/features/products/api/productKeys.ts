import type { ProductListParams } from '../types'

export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (params: ProductListParams) => [...productKeys.lists(), params] as const,
  detail: (id: number) => [...productKeys.all, 'detail', id] as const,
  categoryOptions: () => [...productKeys.all, 'category-options'] as const,
}
