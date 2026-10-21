import { LOW_STOCK_THRESHOLD } from '../api/stockApi'

type LowStockToggleProps = {
  checked: boolean
  onChange: (checked: boolean) => void
}

export function LowStockToggle({ checked, onChange }: LowStockToggleProps) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-sm whitespace-nowrap text-slate-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="size-4 accent-brand-600"
      />
      Low stock only (≤ {LOW_STOCK_THRESHOLD})
    </label>
  )
}
