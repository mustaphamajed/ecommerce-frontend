import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { stockApi } from '../api/stockApi'
import { stockKeys } from '../api/stockKeys'
import type { StockLevelParams } from '../types'

export function useStockLevels(params: StockLevelParams | null) {
  return useQuery({
    queryKey: params ? stockKeys.levels(params) : stockKeys.all,
    queryFn: ({ signal }) => stockApi.levels(params as StockLevelParams, signal),
    enabled: params !== null,
    placeholderData: keepPreviousData,
  })
}
