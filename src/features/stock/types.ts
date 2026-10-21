import type { SortState } from '@/lib/hooks/useListParams'

export type MovementReason = 'PURCHASE' | 'SALE' | 'ADJUSTMENT' | 'RETURN' | 'TRANSFER_IN' | 'TRANSFER_OUT'

export type ManualMovementReason = Exclude<MovementReason, 'TRANSFER_IN' | 'TRANSFER_OUT'>

export type StockLevel = {
  productId: number
  sku: string
  productName: string
  categoryName: string | null
  quantity: number
  updatedAt: string | null
}

export type StockMovement = {
  id: number
  productId: number
  sku: string
  productName: string
  warehouseId: number
  warehouseCode: string
  quantityChange: number
  reason: MovementReason
  note: string | null
  createdBy: string | null
  createdAt: string
}

export type Warehouse = {
  id: number
  code: string
  name: string
}

export type StockLevelParams = {
  warehouseId: number
  query: string
  lowStockOnly: boolean
  page: number
  sort: SortState | null
}

export type StockMovementParams = {
  warehouseId: number
  productId: number | null
  page: number
}

export type StockAdjustmentInput = {
  productId: number
  warehouseId: number
  quantityChange: number
  reason: ManualMovementReason
  note: string | null
}
