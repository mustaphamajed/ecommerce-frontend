import { Package, SearchX, TriangleAlert } from 'lucide-react'
import type { ComponentProps } from 'react'
import { Button, EmptyState, Spinner } from '@/components/ui'
import type { StockLevel } from '../types'
import { StockLevelsTable } from './StockLevelsTable'

type StockLevelsResultsProps = Omit<ComponentProps<typeof StockLevelsTable>, 'levels'> & {
  levels: StockLevel[]
  isLoading: boolean
  isError: boolean
  hasFilters: boolean
  onClearFilters: () => void
  onRetry: () => void
}

type ResultsState = 'loading' | 'error' | 'noMatch' | 'empty' | 'ready'

export function StockLevelsResults({
  levels,
  isLoading,
  isError,
  hasFilters,
  onClearFilters,
  onRetry,
  ...tableProps
}: StockLevelsResultsProps) {
  const state = resultsState(levels, isLoading, isError, hasFilters)

  return {
    loading: (
      <div className="flex justify-center py-24 text-brand-600">
        <Spinner className="size-8" />
      </div>
    ),
    error: (
      <EmptyState
        icon={TriangleAlert}
        title="We couldn't load the stock"
        action={<Button onClick={onRetry}>Try again</Button>}
      />
    ),
    noMatch: (
      <EmptyState
        icon={SearchX}
        title="No products match your filters"
        action={
          <Button variant="secondary" onClick={onClearFilters}>
            Clear filters
          </Button>
        }
      />
    ),
    empty: (
      <EmptyState
        icon={Package}
        title="No active products"
        description="Create products to start tracking their stock."
      />
    ),
    ready: <StockLevelsTable levels={levels} {...tableProps} />,
  }[state]
}

function resultsState(levels: StockLevel[], isLoading: boolean, isError: boolean, hasFilters: boolean): ResultsState {
  if (isLoading) {
    return 'loading'
  }
  if (isError) {
    return 'error'
  }
  if (levels.length > 0) {
    return 'ready'
  }
  return hasFilters ? 'noMatch' : 'empty'
}
