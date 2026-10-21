import { useState } from 'react'
import { Badge, Pagination, SearchForm } from '@/components/ui'
import { useStockLevels } from '../hooks/useStockLevels'
import { useStockListParams } from '../hooks/useStockListParams'
import { useWarehouseAccess } from '../hooks/useWarehouseAccess'
import type { StockLevel, Warehouse } from '../types'
import { AdjustStockDialog } from './AdjustStockDialog'
import { LowStockToggle } from './LowStockToggle'
import { StockLevelsResults } from './StockLevelsResults'
import { WarehouseSelect } from './WarehouseSelect'

type StockWorkspaceProps = {
  warehouses: Warehouse[]
}

export function StockWorkspace({ warehouses }: StockWorkspaceProps) {
  const access = useWarehouseAccess()
  const listParams = useStockListParams(warehouses, access.assignedWarehouseIds)
  const warehouse = warehouses.find((candidate) => candidate.id === listParams.warehouseId) ?? warehouses[0]
  const canAdjust = access.canAdjust(warehouse.id)
  const levelsQuery = useStockLevels({
    warehouseId: warehouse.id,
    query: listParams.query,
    lowStockOnly: listParams.lowStockOnly,
    page: listParams.page,
    sort: listParams.sort,
  })
  const levels = levelsQuery.data?.content ?? []
  const [levelToAdjust, setLevelToAdjust] = useState<StockLevel | null>(null)

  return (
    <>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <WarehouseSelect
          warehouses={warehouses}
          value={warehouse.id}
          canAdjust={access.canAdjust}
          onChange={listParams.setWarehouseId}
        />
        <SearchForm
          initialQuery={listParams.query}
          onSearch={listParams.setQuery}
          label="Search products"
          placeholder="Search by name or SKU"
        />
        <LowStockToggle checked={listParams.lowStockOnly} onChange={listParams.setLowStockOnly} />
        <div className="lg:ml-auto">
          <Badge variant={canAdjust ? 'green' : 'neutral'}>
            {canAdjust ? `You can adjust stock in ${warehouse.code}` : `Read-only in ${warehouse.code}`}
          </Badge>
        </div>
      </div>

      <StockLevelsResults
        levels={levels}
        isLoading={levelsQuery.isPending}
        isError={levelsQuery.isError}
        hasFilters={listParams.hasFilters}
        onClearFilters={listParams.clear}
        onRetry={() => levelsQuery.refetch()}
        sort={listParams.sort}
        warehouseId={warehouse.id}
        canAdjust={canAdjust}
        onSort={listParams.toggleSort}
        onAdjust={setLevelToAdjust}
      />

      <Pagination
        page={listParams.page}
        totalPages={levelsQuery.data?.totalPages ?? 0}
        onPageChange={listParams.setPage}
      />

      <AdjustStockDialog level={levelToAdjust} warehouse={warehouse} onClose={() => setLevelToAdjust(null)} />
    </>
  )
}
