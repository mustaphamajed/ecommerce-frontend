import { Button, EmptyState, PageHeader, Spinner } from '@/components/ui'
import { StockWorkspace } from '../components/StockWorkspace'
import { useStockWarehouses } from '../hooks/useStockWarehouses'

export function StockPage() {
  const warehousesQuery = useStockWarehouses()
  const warehouses = warehousesQuery.data ?? []
  const state = warehousesQuery.isPending
    ? 'loading'
    : warehousesQuery.isError
      ? 'error'
      : warehouses.length === 0
        ? 'empty'
        : 'ready'

  return (
    <section className="flex flex-col gap-6">
      <PageHeader title="Stock" description="Quantities per warehouse, adjustments and their history." />
      {
        {
          loading: (
            <div className="flex justify-center py-24 text-brand-600">
              <Spinner className="size-8" />
            </div>
          ),
          error: (
            <EmptyState
              title="We couldn't load the warehouses"
              action={<Button onClick={() => warehousesQuery.refetch()}>Try again</Button>}
            />
          ),
          empty: <EmptyState title="No warehouses yet" description="Stock is tracked per warehouse." />,
          ready: <StockWorkspace warehouses={warehouses} />,
        }[state]
      }
    </section>
  )
}
