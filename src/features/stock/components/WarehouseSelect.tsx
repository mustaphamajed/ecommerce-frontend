import { Select } from '@/components/ui'
import type { Warehouse } from '../types'

type WarehouseSelectProps = {
  warehouses: Warehouse[]
  value: number
  canAdjust: (warehouseId: number) => boolean
  onChange: (warehouseId: number) => void
}

export function WarehouseSelect({ warehouses, value, canAdjust, onChange }: WarehouseSelectProps) {
  return (
    <Select label="Warehouse" value={String(value)} onChange={(event) => onChange(Number(event.target.value))}>
      {warehouses.map((warehouse) => (
        <option key={warehouse.id} value={String(warehouse.id)}>
          {warehouse.code} · {warehouse.name}
          {canAdjust(warehouse.id) ? '' : ' (read-only)'}
        </option>
      ))}
    </Select>
  )
}
