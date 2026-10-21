import { z } from 'zod'
import type { ManualMovementReason, MovementReason, StockAdjustmentInput } from '../types'

export const MANUAL_REASONS = ['PURCHASE', 'SALE', 'RETURN', 'ADJUSTMENT'] as const satisfies readonly ManualMovementReason[]

export const MAX_QUANTITY = 1_000_000

export const reasonLabels: Record<MovementReason, string> = {
  PURCHASE: 'Purchase (received from supplier)',
  SALE: 'Sale',
  RETURN: 'Customer return',
  ADJUSTMENT: 'Inventory adjustment',
  TRANSFER_IN: 'Transfer in',
  TRANSFER_OUT: 'Transfer out',
}

const removingReasons: ReadonlySet<ManualMovementReason> = new Set(['SALE'])

export const adjustStockSchema = z.object({
  reason: z.enum(MANUAL_REASONS),
  direction: z.enum(['add', 'remove']),
  quantity: z
    .string()
    .trim()
    .min(1, 'Quantity is required')
    .regex(/^\d+$/, 'Enter a whole number')
    .refine((value) => Number(value) >= 1, 'Quantity must be at least 1')
    .refine((value) => Number(value) <= MAX_QUANTITY, `Quantity must be at most ${MAX_QUANTITY.toLocaleString()}`),
  note: z.string().trim().max(500, 'Note must be 500 characters or less'),
})

export type AdjustStockFormValues = z.infer<typeof adjustStockSchema>

export const adjustStockFormFields = ['reason', 'quantity', 'note'] as const

export const adjustStockServerFieldAliases = { quantityChange: 'quantity' } as const

export const emptyAdjustStockForm: AdjustStockFormValues = {
  reason: 'PURCHASE',
  direction: 'add',
  quantity: '',
  note: '',
}

export function isRemoval(values: Pick<AdjustStockFormValues, 'reason' | 'direction'>): boolean {
  return values.reason === 'ADJUSTMENT' ? values.direction === 'remove' : removingReasons.has(values.reason)
}

export function signedQuantityChange(values: AdjustStockFormValues): number {
  const quantity = Number(values.quantity)
  return isRemoval(values) ? -quantity : quantity
}

export function toStockAdjustmentInput(
  values: AdjustStockFormValues,
  productId: number,
  warehouseId: number,
): StockAdjustmentInput {
  return {
    productId,
    warehouseId,
    quantityChange: signedQuantityChange(values),
    reason: values.reason,
    note: values.note || null,
  }
}
