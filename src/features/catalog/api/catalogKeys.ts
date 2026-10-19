import type { CatalogProductsParams } from '../types'

export const catalogKeys = {
  all: ['catalog'] as const,
  products: (params: CatalogProductsParams) => [...catalogKeys.all, 'products', params] as const,
  categories: () => [...catalogKeys.all, 'categories'] as const,
}
