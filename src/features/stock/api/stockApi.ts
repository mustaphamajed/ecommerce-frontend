import { api, type PageResponse } from '@/lib/api'
import { toSortParam } from '@/lib/hooks/useListParams'
import type {
  StockAdjustmentInput,
  StockLevel,
  StockLevelParams,
  StockMovement,
  StockMovementParams,
  Warehouse,
} from '../types'

export const STOCK_PAGE_SIZE = 10
export const MOVEMENTS_PAGE_SIZE = 10
export const LOW_STOCK_THRESHOLD = 5

export const stockApi = {
  levels: ({ warehouseId, query, lowStockOnly, page, sort }: StockLevelParams, signal?: AbortSignal) =>
    api.get<PageResponse<StockLevel>>('/stock/levels', {
      query: {
        warehouseId,
        q: query,
        maxQuantity: lowStockOnly ? LOW_STOCK_THRESHOLD : undefined,
        page,
        size: STOCK_PAGE_SIZE,
        sort: toSortParam(sort),
      },
      signal,
    }),
  movements: ({ warehouseId, productId, page }: StockMovementParams, signal?: AbortSignal) =>
    api.get<PageResponse<StockMovement>>('/stock/movements', {
      query: { warehouseId, productId, page, size: MOVEMENTS_PAGE_SIZE },
      signal,
    }),
  adjust: (input: StockAdjustmentInput) => api.post<StockMovement>('/stock/adjustments', input),
  warehouses: (signal?: AbortSignal) => api.get<Warehouse[]>('/warehouses', { signal }),
}
