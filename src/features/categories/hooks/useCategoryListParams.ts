import { useListParams } from '@/lib/hooks/useListParams'

export function useCategoryListParams() {
  return useListParams({ field: 'name', direction: 'asc' })
}
