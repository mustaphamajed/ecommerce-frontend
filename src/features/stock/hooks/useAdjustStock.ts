import { useMutation, useQueryClient } from '@tanstack/react-query'
import { stockApi } from '../api/stockApi'
import { stockKeys } from '../api/stockKeys'
import type { StockAdjustmentInput } from '../types'

export function useAdjustStock() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: StockAdjustmentInput) => stockApi.adjust(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: stockKeys.all }),
  })
}
