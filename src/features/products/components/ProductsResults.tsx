import { Package, SearchX, TriangleAlert } from 'lucide-react'
import type { ComponentProps } from 'react'
import { Button, EmptyState, TableSkeleton } from '@/components/ui'
import type { Product } from '../types'
import { ProductsTable } from './ProductsTable'

type ProductsResultsProps = Omit<ComponentProps<typeof ProductsTable>, 'products'> & {
  products: Product[]
  isLoading: boolean
  isError: boolean
  hasFilters: boolean
  onClearFilters: () => void
  onRetry: () => void
}

type ResultsState = 'loading' | 'error' | 'noMatch' | 'empty' | 'ready'

export function ProductsResults({
  products,
  isLoading,
  isError,
  hasFilters,
  onClearFilters,
  onRetry,
  ...tableProps
}: ProductsResultsProps) {
  const state = resultsState(products, isLoading, isError, hasFilters)

  return {
    loading: <TableSkeleton columns={6} />,
    error: (
      <EmptyState
        icon={TriangleAlert}
        title="We couldn't load the products"
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
      <EmptyState icon={Package} title="No products yet" description="Create your first product to fill the catalog." />
    ),
    ready: <ProductsTable products={products} {...tableProps} />,
  }[state]
}

function resultsState(products: Product[], isLoading: boolean, isError: boolean, hasFilters: boolean): ResultsState {
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
