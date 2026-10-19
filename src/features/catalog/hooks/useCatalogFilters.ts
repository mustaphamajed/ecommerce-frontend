import { useListParams } from '@/lib/hooks/useListParams'

export function useCatalogFilters() {
  const params = useListParams()
  const category = params.get('category')

  return {
    query: params.query,
    category,
    page: params.page,
    hasFilters: params.query !== '' || category !== '',
    setQuery: params.setQuery,
    setCategory: (slug: string) => params.update({ category: slug || null }),
    setPage: params.setPage,
    clear: params.clear,
  }
}
