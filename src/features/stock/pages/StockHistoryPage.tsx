import { ArrowLeft } from 'lucide-react'
import { Button, ButtonLink, EmptyState, PageHeader, Spinner } from '@/components/ui'
import { StockHistoryWorkspace } from '../components/StockHistoryWorkspace'
import { useStockWarehouses } from '../hooks/useStockWarehouses'

export function StockHistoryPage() {
  const warehousesQuery = useStockWarehouses()
  const state = warehousesQuery.isPending ? 'loading' : warehousesQuery.isError ? 'error' : 'ready'

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Stock history"
        description="Every stock movement, newest first: who changed what, where and why."
        actions={
          <ButtonLink to="/admin/stock" variant="secondary">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to stock
          </ButtonLink>
        }
      />
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
          ready: <StockHistoryWorkspace warehouses={warehousesQuery.data ?? []} />,
        }[state]
      }
    </section>
  )
}
