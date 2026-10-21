import { Package, SearchX, TriangleAlert } from 'lucide-react'
import { Button, EmptyState } from '@/components/ui'
import type { CatalogProduct } from '../types'
import { ProductGrid } from './ProductGrid'
import { ProductGridSkeleton } from './ProductGridSkeleton'

type CatalogResultsProps = {
  products: CatalogProduct[]
  isLoading: boolean
  isError: boolean
  hasFilters: boolean
  onClearFilters: () => void
  onRetry: () => void
}

type ResultsState = 'loading' | 'error' | 'noMatch' | 'empty' | 'ready'

export function CatalogResults({
  products,
  isLoading,
  isError,
  hasFilters,
  onClearFilters,
  onRetry,
}: CatalogResultsProps) {
  const state = resultsState(products, isLoading, isError, hasFilters)

  return {
    loading: <ProductGridSkeleton />,
    error: (
      <EmptyState
        icon={TriangleAlert}
        title="We couldn't load the products"
        description="Please check your connection and try again."
        action={<Button onClick={onRetry}>Try again</Button>}
      />
    ),
    noMatch: (
      <EmptyState
        icon={SearchX}
        title="No products match your search"
        description="Try another search or category."
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
        title="No products yet"
        description="New products will appear here soon. Come back later!"
      />
    ),
    ready: <ProductGrid products={products} />,
  }[state]
}

function resultsState(
  products: CatalogProduct[],
  isLoading: boolean,
  isError: boolean,
  hasFilters: boolean,
): ResultsState {
  if (isLoading) {
    return 'loading'
  }
  if (isError) {
    return 'error'
  }
  if (products.length > 0) {
    return 'ready'
  }
  return hasFilters ? 'noMatch' : 'empty'
}
