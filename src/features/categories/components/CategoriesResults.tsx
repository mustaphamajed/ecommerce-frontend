import { SearchX, Tags, TriangleAlert } from 'lucide-react'
import { Button, EmptyState, Spinner } from '@/components/ui'
import type { SortState } from '@/lib/hooks/useListParams'
import type { Category } from '../types'
import { CategoriesTable } from './CategoriesTable'

type CategoriesResultsProps = {
  categories: Category[]
  isLoading: boolean
  isError: boolean
  hasSearch: boolean
  sort: SortState | null
  canWrite: boolean
  onSort: (field: string) => void
  onDelete: (category: Category) => void
  onClearSearch: () => void
  onRetry: () => void
}

type ResultsState = 'loading' | 'error' | 'noMatch' | 'empty' | 'ready'

export function CategoriesResults({
  categories,
  isLoading,
  isError,
  hasSearch,
  sort,
  canWrite,
  onSort,
  onDelete,
  onClearSearch,
  onRetry,
}: CategoriesResultsProps) {
  const state = resultsState(categories, isLoading, isError, hasSearch)

  return {
    loading: (
      <div className="flex justify-center py-24 text-brand-600">
        <Spinner className="size-8" />
      </div>
    ),
    error: (
      <EmptyState
        icon={TriangleAlert}
        title="We couldn't load the categories"
        action={<Button onClick={onRetry}>Try again</Button>}
      />
    ),
    noMatch: (
      <EmptyState
        icon={SearchX}
        title="No categories match your search"
        action={
          <Button variant="secondary" onClick={onClearSearch}>
            Clear search
          </Button>
        }
      />
    ),
    empty: (
      <EmptyState
        icon={Tags}
        title="No categories yet"
        description="Create your first category to organize products."
      />
    ),
    ready: (
      <CategoriesTable categories={categories} sort={sort} canWrite={canWrite} onSort={onSort} onDelete={onDelete} />
    ),
  }[state]
}

function resultsState(categories: Category[], isLoading: boolean, isError: boolean, hasSearch: boolean): ResultsState {
  if (isLoading) {
    return 'loading'
  }
  if (isError) {
    return 'error'
  }
  if (categories.length > 0) {
    return 'ready'
  }
  return hasSearch ? 'noMatch' : 'empty'
}
