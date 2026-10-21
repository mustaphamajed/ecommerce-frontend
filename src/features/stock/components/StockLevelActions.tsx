import { History, SlidersHorizontal } from 'lucide-react'
import { Button, ButtonLink } from '@/components/ui'
import type { StockLevel } from '../types'

type StockLevelActionsProps = {
  level: StockLevel
  warehouseId: number
  canAdjust: boolean
  onAdjust: (level: StockLevel) => void
}

export function StockLevelActions({ level, warehouseId, canAdjust, onAdjust }: StockLevelActionsProps) {
  return (
    <div className="flex justify-end gap-2">
      <ButtonLink
        to={`/admin/stock/history?warehouse=${warehouseId}&product=${level.productId}`}
        variant="ghost"
        className="px-3 py-1.5"
      >
        <History aria-hidden="true" className="size-3.5" />
        History
      </ButtonLink>
      {canAdjust && (
        <Button variant="secondary" className="px-3 py-1.5" onClick={() => onAdjust(level)}>
          <SlidersHorizontal aria-hidden="true" className="size-3.5" />
          Adjust
        </Button>
      )}
    </div>
  )
}
