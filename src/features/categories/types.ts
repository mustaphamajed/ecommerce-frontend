import type { SortState } from '@/lib/hooks/useListParams'

export type Category = {
  id: number
  name: string
  slug: string
  description: string | null
  productCount: number
  createdAt: string
  updatedAt: string
}

export type CategoryInput = {
  name: string
  description: string | null
  slug: string | null
}

export type CategoryListParams = {
  query: string
  page: number
  sort: SortState | null
}
