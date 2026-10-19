import { useSearchParams } from 'react-router'

export type SortDirection = 'asc' | 'desc'

export type SortState = {
  field: string
  direction: SortDirection
}

type ParamChanges = Record<string, string | null>

export function useListParams(defaultSort?: SortState) {
  const [searchParams, setSearchParams] = useSearchParams()

  const update = (changes: ParamChanges, resetPage = true) =>
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous)
      const allChanges = resetPage ? { ...changes, page: null } : changes
      for (const [key, value] of Object.entries(allChanges)) {
        if (value) {
          next.set(key, value)
        } else {
          next.delete(key)
        }
      }
      return next
    })

  const sort = parseSort(searchParams.get('sort')) ?? defaultSort ?? null
  const query = searchParams.get('q') ?? ''

  return {
    query,
    page: toZeroBasedPage(searchParams.get('page')),
    sort,
    get: (key: string) => searchParams.get(key) ?? '',
    update,
    setQuery: (value: string) => update({ q: value.trim() || null }),
    setPage: (page: number) => update({ page: page > 0 ? String(page + 1) : null }, false),
    toggleSort: (field: string) => {
      const direction: SortDirection = sort?.field === field && sort.direction === 'asc' ? 'desc' : 'asc'
      update({ sort: `${field},${direction}` })
    },
    clear: () => setSearchParams(new URLSearchParams()),
  }
}

export function toSortParam(sort: SortState | null): string | undefined {
  return sort ? `${sort.field},${sort.direction}` : undefined
}

function parseSort(value: string | null): SortState | null {
  const [field, direction] = (value ?? '').split(',')
  return field && (direction === 'asc' || direction === 'desc') ? { field, direction } : null
}

function toZeroBasedPage(value: string | null): number {
  const parsed = Number.parseInt(value ?? '', 10)
  return Number.isNaN(parsed) || parsed < 1 ? 0 : parsed - 1
}
