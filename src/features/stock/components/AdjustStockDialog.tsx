import { Dialog } from '@/components/ui'
import type { StockLevel, Warehouse } from '../types'
import { AdjustStockForm } from './AdjustStockForm'

type AdjustStockDialogProps = {
  level: StockLevel | null
  warehouse: Warehouse | null
  onClose: () => void
}

export function AdjustStockDialog({ level, warehouse, onClose }: AdjustStockDialogProps) {
  return (
    <Dialog
      open={level !== null && warehouse !== null}
      title="Adjust stock"
      description={
        level && (
          <>
            <strong className="font-medium text-slate-900">{level.productName}</strong> ({level.sku}) in{' '}
            {warehouse?.name}
          </>
        )
      }
      onClose={onClose}
    >
      {level && warehouse && (
        <AdjustStockForm
          key={`${level.productId}-${warehouse.id}`}
          level={level}
          warehouse={warehouse}
          onDone={onClose}
          onCancel={onClose}
        />
      )}
    </Dialog>
  )
}
