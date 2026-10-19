import type { CategoryListParams } from '../types'

export const categoryKeys = {
  all: ['categories'] as const,
  lists: () => [...categoryKeys.all, 'list'] as const,
  list: (params: CategoryListParams) => [...categoryKeys.lists(), params] as const,
  detail: (id: number) => [...categoryKeys.all, 'detail', id] as const,
}
