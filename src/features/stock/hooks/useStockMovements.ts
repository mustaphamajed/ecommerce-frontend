import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { stockApi } from '../api/stockApi'
import { stockKeys } from '../api/stockKeys'
import type { StockMovementParams } from '../types'

export function useStockMovements(params: StockMovementParams) {
  return useQuery({
    queryKey: stockKeys.movements(params),
    queryFn: ({ signal }) => stockApi.movements(params, signal),
    placeholderData: keepPreviousData,
  })
}
