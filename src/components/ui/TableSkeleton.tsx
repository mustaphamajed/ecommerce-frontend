import { Skeleton } from './Skeleton'

type TableSkeletonProps = {
  columns: number
  rows?: number
}

const cellWidths = ['w-40', 'w-24', 'w-16', 'w-20', 'w-28', 'w-12']

export function TableSkeleton({ columns, rows = 10 }: TableSkeletonProps) {
  const columnIndexes = Array.from({ length: columns }, (_, index) => index)

  return (
    <div
      role="status"
      aria-label="Loading"
      className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card"
    >
      <div className="flex gap-6 border-b border-slate-200 bg-slate-50/80 px-4 py-3.5">
        {columnIndexes.map((column) => (
          <Skeleton key={column} className="h-3 w-16" />
        ))}
      </div>
      <div className="divide-y divide-slate-100">
        {Array.from({ length: rows }, (_, row) => (
          <div key={row} className="flex items-center gap-6 px-4 py-4">
            {columnIndexes.map((column) => (
              <Skeleton key={column} className={`h-3.5 ${cellWidths[(row + column) % cellWidths.length]}`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
