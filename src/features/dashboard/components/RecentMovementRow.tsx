import { MovementChange, reasonLabels, type StockMovement } from '@/features/stock'
import { formatDateTime } from '@/lib/format'

type RecentMovementRowProps = {
  movement: StockMovement
}

export function RecentMovementRow({ movement }: RecentMovementRowProps) {
  return (
    <li className="flex items-center justify-between gap-4 px-5 py-3">
      <div className="min-w-0">
        <p className="truncate font-medium text-slate-900">{movement.productName}</p>
        <p className="text-xs text-slate-400">
          {reasonLabels[movement.reason]} · {movement.warehouseCode} · {movement.createdBy ?? 'Unknown'} ·{' '}
          {formatDateTime(movement.createdAt)}
        </p>
      </div>
      <MovementChange change={movement.quantityChange} />
    </li>
  )
}
