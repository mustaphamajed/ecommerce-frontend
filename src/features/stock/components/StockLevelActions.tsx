import { Button } from '@/components/ui'
import type { StockLevel } from '../types'

type StockLevelActionsProps = {
  level: StockLevel
  canAdjust: boolean
  onShowHistory: (level: StockLevel) => void
  onAdjust: (level: StockLevel) => void
}

export function StockLevelActions({ level, canAdjust, onShowHistory, onAdjust }: StockLevelActionsProps) {
  return (
    <div className="flex justify-end gap-2">
      <Button variant="ghost" className="px-3 py-1.5" onClick={() => onShowHistory(level)}>
        History
      </Button>
      {canAdjust && (
        <Button variant="secondary" className="px-3 py-1.5" onClick={() => onAdjust(level)}>
          Adjust
        </Button>
      )}
    </div>
  )
}
