import { useState } from 'react'
import { Button, EmptyState, Pagination, Spinner } from '@/components/ui'
import { useStockMovements } from '../hooks/useStockMovements'
import type { Warehouse } from '../types'
import { StockMovementsTable } from './StockMovementsTable'

type StockMovementsPanelProps = {
  warehouse: Warehouse
  productId: number | null
  productName: string | null
  onClearProduct: () => void
}

export function StockMovementsPanel({ warehouse, productId, productName, onClearProduct }: StockMovementsPanelProps) {
  const [page, setPage] = useState(0)
  const movementsQuery = useStockMovements({ warehouseId: warehouse.id, productId, page })
  const movements = movementsQuery.data?.content ?? []
  const state = movementsQuery.isPending
    ? 'loading'
    : movementsQuery.isError
      ? 'error'
      : movements.length === 0
        ? 'empty'
        : 'ready'

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Movement history</h2>
          <p className="text-sm text-slate-500">
            {productName ? `${productName} in ${warehouse.code}` : `All products in ${warehouse.code}`}
          </p>
        </div>
        {productId !== null && (
          <Button variant="ghost" onClick={onClearProduct}>
            Show all products
          </Button>
        )}
      </div>
      {
        {
          loading: (
            <div className="flex justify-center py-12 text-brand-600">
              <Spinner className="size-6" />
            </div>
          ),
          error: (
            <EmptyState
              title="We couldn't load the history"
              action={<Button onClick={() => movementsQuery.refetch()}>Try again</Button>}
            />
          ),
          empty: <EmptyState title="No movements yet" description="Adjustments will appear here." />,
          ready: <StockMovementsTable movements={movements} />,
        }[state]
      }
      <Pagination page={page} totalPages={movementsQuery.data?.totalPages ?? 0} onPageChange={setPage} />
    </section>
  )
}
