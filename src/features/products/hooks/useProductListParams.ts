import { useListParams } from '@/lib/hooks/useListParams'
import type { ProductStatusFilter } from '../types'

const STATUSES: ProductStatusFilter[] = ['ACTIVE', 'ARCHIVED']

export function useProductListParams() {
  const params = useListParams({ field: 'updatedAt', direction: 'desc' })
  const rawStatus = params.get('status')
  const status: ProductStatusFilter = STATUSES.find((value) => value === rawStatus) ?? ''
  const parsedCategoryId = Number.parseInt(params.get('categoryId'), 10)
  const categoryId = Number.isNaN(parsedCategoryId) ? null : parsedCategoryId

  return {
    ...params,
    status,
    categoryId,
    hasFilters: params.query !== '' || status !== '' || categoryId !== null,
    setStatus: (value: ProductStatusFilter) => params.update({ status: value || null }),
    setCategoryId: (value: number | null) => params.update({ categoryId: value === null ? null : String(value) }),
  }
}
