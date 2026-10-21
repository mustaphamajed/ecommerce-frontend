import { History, TriangleAlert } from 'lucide-react'
import { Button, EmptyState, Pagination, TableSkeleton } from '@/components/ui'
import { useStockHistoryParams } from '../hooks/useStockHistoryParams'
import { useStockMovements } from '../hooks/useStockMovements'
import type { StockMovement, Warehouse } from '../types'
import { HistoryWarehouseFilter } from './HistoryWarehouseFilter'
import { StockMovementsTable } from './StockMovementsTable'

type StockHistoryWorkspaceProps = {
  warehouses: Warehouse[]
}

type HistoryState = 'loading' | 'error' | 'empty' | 'ready'

function historyState(movements: StockMovement[], isLoading: boolean, isError: boolean): HistoryState {
  if (isLoading) {
    return 'loading'
  }
  if (isError) {
    return 'error'
  }
  return movements.length === 0 ? 'empty' : 'ready'
}

export function StockHistoryWorkspace({ warehouses }: StockHistoryWorkspaceProps) {
  const params = useStockHistoryParams(warehouses)
  const movementsQuery = useStockMovements({
    warehouseId: params.warehouseId,
    productId: params.productId,
    page: params.page,
  })
  const movements = movementsQuery.data?.content ?? []
  const productName = params.productId === null ? null : (movements[0]?.productName ?? `Product #${params.productId}`)

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <HistoryWarehouseFilter warehouses={warehouses} value={params.warehouseId} onChange={params.setWarehouseId} />
        {productName && (
          <div className="flex items-center gap-2 rounded-lg border border-brand-200 bg-brand-50 py-1.5 pr-1.5 pl-3 text-sm text-brand-700">
            Product: <strong className="font-medium">{productName}</strong>
            <Button variant="ghost" className="px-2 py-1 text-brand-700" onClick={params.clearProduct}>
              Show all products
            </Button>
          </div>
        )}
      </div>

      {
        {
          loading: <TableSkeleton columns={6} />,
          error: (
            <EmptyState
              icon={TriangleAlert}
              title="We couldn't load the history"
              action={<Button onClick={() => movementsQuery.refetch()}>Try again</Button>}
            />
          ),
          empty: (
            <EmptyState icon={History} title="No movements yet" description="Stock adjustments will appear here." />
          ),
          ready: <StockMovementsTable movements={movements} />,
        }[historyState(movements, movementsQuery.isPending, movementsQuery.isError)]
      }

      <Pagination page={params.page} totalPages={movementsQuery.data?.totalPages ?? 0} onPageChange={params.setPage} />
    </>
  )
}
