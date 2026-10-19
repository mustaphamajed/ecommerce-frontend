import { cn } from '@/lib/cn'

type CategoryChipProps = {
  label: string
  isSelected: boolean
  onClick: () => void
}

export function CategoryChip({ label, isSelected, onClick }: CategoryChipProps) {
  return (
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={onClick}
      className={cn(
        'rounded-full border px-3 py-1 text-sm font-medium transition',
        isSelected
          ? 'border-indigo-600 bg-indigo-600 text-white'
          : 'border-slate-300 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900',
      )}
    >
      {label}
    </button>
  )
}
