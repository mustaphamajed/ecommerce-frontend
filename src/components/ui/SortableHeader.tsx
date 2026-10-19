import type { SortState } from '@/lib/hooks/useListParams'
import { cn } from '@/lib/cn'

type SortableHeaderProps = {
  label: string
  field: string
  sort: SortState | null
  onSort: (field: string) => void
}

const indicators = { asc: '↑', desc: '↓', none: '↕' }

export function SortableHeader({ label, field, sort, onSort }: SortableHeaderProps) {
  const direction = sort?.field === field ? sort.direction : 'none'

  return (
    <button
      type="button"
      onClick={() => onSort(field)}
      aria-sort={direction === 'none' ? undefined : direction === 'asc' ? 'ascending' : 'descending'}
      className="inline-flex items-center gap-1 font-medium text-slate-600 hover:text-slate-900"
    >
      {label}
      <span aria-hidden="true" className={cn('text-xs', direction === 'none' ? 'text-slate-300' : 'text-indigo-600')}>
        {indicators[direction]}
      </span>
    </button>
  )
}
