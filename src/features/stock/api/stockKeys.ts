import type { StockLevelParams, StockMovementParams } from '../types'

export const stockKeys = {
  all: ['stock'] as const,
  levels: (params: StockLevelParams) => [...stockKeys.all, 'levels', params] as const,
  movements: (params: StockMovementParams) => [...stockKeys.all, 'movements', params] as const,
  warehouses: () => [...stockKeys.all, 'warehouses'] as const,
}
