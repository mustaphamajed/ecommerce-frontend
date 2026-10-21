import { useQuery } from '@tanstack/react-query'
import { stockApi } from '../api/stockApi'
import { stockKeys } from '../api/stockKeys'

export function useStockWarehouses() {
  return useQuery({
    queryKey: stockKeys.warehouses(),
    queryFn: ({ signal }) => stockApi.warehouses(signal),
    staleTime: 5 * 60_000,
  })
}
