import { useListParams } from '@/lib/hooks/useListParams'
import type { Warehouse } from '../types'

function parseId(value: string): number | null {
  const parsed = Number.parseInt(value, 10)
  return Number.isNaN(parsed) ? null : parsed
}

export function useStockHistoryParams(warehouses: Warehouse[]) {
  const params = useListParams()
  const requestedWarehouseId = parseId(params.get('warehouse'))
  const warehouseId = warehouses.some((warehouse) => warehouse.id === requestedWarehouseId)
    ? requestedWarehouseId
    : null

  return {
    page: params.page,
    setPage: params.setPage,
    warehouseId,
    productId: parseId(params.get('product')),
    setWarehouseId: (id: number | null) => params.update({ warehouse: id === null ? null : String(id) }),
    clearProduct: () => params.update({ product: null }),
  }
}
