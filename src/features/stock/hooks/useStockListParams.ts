import { useListParams } from '@/lib/hooks/useListParams'
import type { Warehouse } from '../types'

function parseId(value: string): number | null {
  const parsed = Number.parseInt(value, 10)
  return Number.isNaN(parsed) ? null : parsed
}

export function useStockListParams(warehouses: Warehouse[], preferredWarehouseIds: number[]) {
  const params = useListParams({ field: 'name', direction: 'asc' })
  const requestedWarehouseId = parseId(params.get('warehouse'))
  const warehouseId =
    warehouses.find((warehouse) => warehouse.id === requestedWarehouseId)?.id ??
    warehouses.find((warehouse) => preferredWarehouseIds.includes(warehouse.id))?.id ??
    warehouses[0]?.id ??
    null
  const lowStockOnly = params.get('low') === '1'

  return {
    ...params,
    warehouseId,
    lowStockOnly,
    productId: parseId(params.get('product')),
    hasFilters: params.query !== '' || lowStockOnly,
    setWarehouseId: (id: number) => params.update({ warehouse: String(id), product: null }),
    setLowStockOnly: (enabled: boolean) => params.update({ low: enabled ? '1' : null }),
    setProductId: (id: number | null) => params.update({ product: id === null ? null : String(id) }, false),
  }
}
