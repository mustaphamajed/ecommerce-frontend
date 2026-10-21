import type { WarehouseStockSummary } from '../types'
import { WarehouseHealthRow } from './WarehouseHealthRow'

type WarehouseHealthListProps = {
  warehouses: WarehouseStockSummary[]
  lowStockThreshold: number
}

export function WarehouseHealthList({ warehouses, lowStockThreshold }: WarehouseHealthListProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-card">
      <div className="border-b border-slate-100 px-5 py-4">
        <h2 className="text-base font-semibold">Warehouse health</h2>
        <p className="mt-0.5 text-sm text-slate-500">Click a warehouse to see its low-stock products.</p>
      </div>
      <ul className="divide-y divide-slate-100">
        {warehouses.map((warehouse) => (
          <WarehouseHealthRow key={warehouse.warehouseId} warehouse={warehouse} lowStockThreshold={lowStockThreshold} />
        ))}
      </ul>
    </section>
  )
}
