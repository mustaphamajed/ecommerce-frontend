import { api, type PageResponse } from '@/lib/api'
import type { CatalogCategory, CatalogProduct, CatalogProductsParams } from '../types'

export const CATALOG_PAGE_SIZE = 12

export const catalogApi = {
  getProducts: ({ query, category, page }: CatalogProductsParams, signal?: AbortSignal) =>
    api.get<PageResponse<CatalogProduct>>('/catalog/products', {
      query: { q: query, category, page, size: CATALOG_PAGE_SIZE },
      signal,
    }),
  getCategories: (signal?: AbortSignal) => api.get<CatalogCategory[]>('/catalog/categories', { signal }),
}
