import { Select } from '@/components/ui'
import type { Warehouse } from '../types'

type HistoryWarehouseFilterProps = {
  warehouses: Warehouse[]
  value: number | null
  onChange: (warehouseId: number | null) => void
}

export function HistoryWarehouseFilter({ warehouses, value, onChange }: HistoryWarehouseFilterProps) {
  return (
    <Select
      label="Filter by warehouse"
      value={value === null ? '' : String(value)}
      onChange={(event) => onChange(event.target.value === '' ? null : Number(event.target.value))}
    >
      <option value="">All warehouses</option>
      {warehouses.map((warehouse) => (
        <option key={warehouse.id} value={String(warehouse.id)}>
          {warehouse.code} · {warehouse.name}
        </option>
      ))}
    </Select>
  )
}
