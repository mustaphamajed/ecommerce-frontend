import { Link } from 'react-router'
import { Badge } from '@/components/ui'
import type { WarehouseStockSummary } from '../types'

type WarehouseHealthRowProps = {
  warehouse: WarehouseStockSummary
  lowStockThreshold: number
}

const numberFormatter = new Intl.NumberFormat('fr-FR')

export function WarehouseHealthRow({ warehouse, lowStockThreshold }: WarehouseHealthRowProps) {
  const isHealthy = warehouse.lowStockProducts === 0 && warehouse.outOfStockProducts === 0

  return (
    <li>
      <Link
        to={`/admin/stock?warehouse=${warehouse.warehouseId}&low=1`}
        className="flex items-center justify-between gap-4 px-5 py-3 transition hover:bg-slate-50"
      >
        <div className="min-w-0">
          <p className="font-medium text-slate-900">
            {warehouse.code} <span className="font-normal text-slate-500">· {warehouse.name}</span>
          </p>
          <p className="text-xs text-slate-400">{numberFormatter.format(warehouse.totalUnits)} units in stock</p>
        </div>
        <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
          {isHealthy && <Badge variant="green">All good</Badge>}
          {warehouse.lowStockProducts > 0 && (
            <Badge variant="amber">
              {warehouse.lowStockProducts} low (≤ {lowStockThreshold})
            </Badge>
          )}
          {warehouse.outOfStockProducts > 0 && <Badge variant="red">{warehouse.outOfStockProducts} out of stock</Badge>}
        </div>
      </Link>
    </li>
  )
}
