import { api, type PageResponse } from '@/lib/api'
import { toSortParam } from '@/lib/hooks/useListParams'
import type { Category, CategoryInput, CategoryListParams } from '../types'

export const CATEGORIES_PAGE_SIZE = 20

export const categoriesApi = {
  list: ({ query, page, sort }: CategoryListParams, signal?: AbortSignal) =>
    api.get<PageResponse<Category>>('/categories', {
      query: { q: query, page, size: CATEGORIES_PAGE_SIZE, sort: toSortParam(sort) },
      signal,
    }),
  get: (id: number, signal?: AbortSignal) => api.get<Category>(`/categories/${id}`, { signal }),
  create: (input: CategoryInput) => api.post<Category>('/categories', input),
  update: (id: number, input: CategoryInput) => api.put<Category>(`/categories/${id}`, input),
  remove: (id: number) => api.delete<void>(`/categories/${id}`),
}
