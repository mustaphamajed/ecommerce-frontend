import { useSearchParams } from 'react-router'

type ParamChanges = Record<string, string | null>

export function useCatalogFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get('q') ?? ''
  const category = searchParams.get('category') ?? ''
  const page = toZeroBasedPage(searchParams.get('page'))

  const update = (changes: ParamChanges) =>
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous)
      for (const [key, value] of Object.entries(changes)) {
        if (value) {
          next.set(key, value)
        } else {
          next.delete(key)
        }
      }
      return next
    })

  return {
    query,
    category,
    page,
    hasFilters: query !== '' || category !== '',
    setQuery: (value: string) => update({ q: value.trim() || null, page: null }),
    setCategory: (slug: string) => update({ category: slug || null, page: null }),
    setPage: (nextPage: number) => update({ page: nextPage > 0 ? String(nextPage + 1) : null }),
    clear: () => setSearchParams(new URLSearchParams()),
  }
}

function toZeroBasedPage(value: string | null): number {
  const parsed = Number.parseInt(value ?? '', 10)
  return Number.isNaN(parsed) || parsed < 1 ? 0 : parsed - 1
}
