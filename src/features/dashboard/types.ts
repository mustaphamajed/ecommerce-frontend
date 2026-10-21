import type { StockMovement } from '@/features/stock'

export type CatalogStats = {
  activeProducts: number
  archivedProducts: number
  categories: number
}

export type WarehouseStockSummary = {
  warehouseId: number
  code: string
  name: string
  totalUnits: number
  lowStockProducts: number
  outOfStockProducts: number
}

export type StockStats = {
  totalUnits: number
  lowStockThreshold: number
  warehouses: WarehouseStockSummary[]
  recentMovements: StockMovement[]
}

export type UserStats = {
  activeUsers: number
  disabledUsers: number
}

export type Dashboard = {
  catalog: CatalogStats | null
  stock: StockStats | null
  users: UserStats | null
}
