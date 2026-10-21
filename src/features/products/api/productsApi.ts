import { api, type PageResponse } from '@/lib/api'
import { toSortParam } from '@/lib/hooks/useListParams'
import type { Product, ProductInput, ProductListParams } from '../types'

export const PRODUCTS_PAGE_SIZE = 20

const MAX_CATEGORY_OPTIONS = 100

export type CategoryOption = {
  id: number
  name: string
}

export const productsApi = {
  list: ({ query, categoryId, status, page, sort }: ProductListParams, signal?: AbortSignal) =>
    api.get<PageResponse<Product>>('/products', {
      query: {
        q: query,
        categoryId,
        status,
        page,
        size: PRODUCTS_PAGE_SIZE,
        sort: toSortParam(sort),
      },
      signal,
    }),
  get: (id: number, signal?: AbortSignal) => api.get<Product>(`/products/${id}`, { signal }),
  create: (input: ProductInput) => api.post<Product>('/products', input),
  update: (id: number, input: ProductInput) => api.put<Product>(`/products/${id}`, input),
  archive: (id: number) => api.post<Product>(`/products/${id}/archive`),
  restore: (id: number) => api.post<Product>(`/products/${id}/restore`),
  categoryOptions: async (signal?: AbortSignal) => {
    const page = await api.get<PageResponse<CategoryOption>>('/categories', {
      query: { size: MAX_CATEGORY_OPTIONS, sort: 'name,asc' },
      signal,
    })
    return page.content.map(({ id, name }) => ({ id, name }))
  },
}
