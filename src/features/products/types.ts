import type { SortState } from '@/lib/hooks/useListParams'

export type ProductStatus = 'ACTIVE' | 'ARCHIVED'

export type Product = {
  id: number
  sku: string
  name: string
  description: string | null
  price: number
  status: ProductStatus
  categoryId: number | null
  categoryName: string | null
  imageUrl: string | null
  createdAt: string
  updatedAt: string
}

export type ProductInput = {
  sku: string
  name: string
  description: string | null
  price: number
  categoryId: number | null
}

export type ProductStatusFilter = '' | ProductStatus

export type ProductListParams = {
  query: string
  categoryId: number | null
  status: ProductStatusFilter
  page: number
  sort: SortState | null
}
