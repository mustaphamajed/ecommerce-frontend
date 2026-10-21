import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { Alert, Button, SelectField, TextAreaField, TextField } from '@/components/ui'
import { applyServerErrors } from '@/lib/forms/applyServerErrors'
import { useAdjustStock } from '../hooks/useAdjustStock'
import {
  adjustStockFormFields,
  adjustStockSchema,
  adjustStockServerFieldAliases,
  emptyAdjustStockForm,
  isRemoval,
  MANUAL_REASONS,
  reasonLabels,
  signedQuantityChange,
  toStockAdjustmentInput,
  type AdjustStockFormValues,
} from '../schemas/adjustStockSchema'
import type { StockLevel, Warehouse } from '../types'
import { StockChangePreview } from './StockChangePreview'

type AdjustStockFormProps = {
  level: StockLevel
  warehouse: Warehouse
  onDone: () => void
  onCancel: () => void
}

export function AdjustStockForm({ level, warehouse, onDone, onCancel }: AdjustStockFormProps) {
  const adjustStock = useAdjustStock()
  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<AdjustStockFormValues>({
    resolver: zodResolver(adjustStockSchema),
    defaultValues: emptyAdjustStockForm,
  })
  const values = useWatch({ control })
  const reason = values.reason ?? emptyAdjustStockForm.reason
  const direction = values.direction ?? emptyAdjustStockForm.direction
  const quantity = Number(values.quantity)
  const hasValidQuantity = Number.isInteger(quantity) && quantity > 0

  const submit = handleSubmit(async (formValues) => {
    if (isRemoval(formValues) && Number(formValues.quantity) > level.quantity) {
      setError('quantity', { message: `Only ${level.quantity} in stock` })
      return
    }
    try {
      await adjustStock.mutateAsync(toStockAdjustmentInput(formValues, level.productId, warehouse.id))
      onDone()
    } catch (error) {
      applyServerErrors(error, setError, adjustStockFormFields, adjustStockServerFieldAliases)
    }
  })

  return (
    <form noValidate onSubmit={submit} className="flex flex-col gap-5">
      {errors.root?.server && <Alert>{errors.root.server.message}</Alert>}
      <SelectField label="Reason" error={errors.reason?.message} {...register('reason')}>
        {MANUAL_REASONS.map((manualReason) => (
          <option key={manualReason} value={manualReason}>
            {reasonLabels[manualReason]}
          </option>
        ))}
      </SelectField>
      {reason === 'ADJUSTMENT' && (
        <SelectField label="Direction" {...register('direction')}>
          <option value="add">Add to stock</option>
          <option value="remove">Remove from stock</option>
        </SelectField>
      )}
      <TextField
        label="Quantity"
        inputMode="numeric"
        autoFocus
        placeholder="10"
        hint={`${level.quantity} currently in ${warehouse.code}`}
        error={errors.quantity?.message}
        {...register('quantity')}
      />
      {hasValidQuantity && (
        <StockChangePreview
          currentQuantity={level.quantity}
          change={signedQuantityChange({ reason, direction, quantity: String(quantity), note: '' })}
        />
      )}
      <TextAreaField label="Note" rows={2} placeholder="Optional" error={errors.note?.message} {...register('note')} />
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          Save movement
        </Button>
      </div>
    </form>
  )
}
