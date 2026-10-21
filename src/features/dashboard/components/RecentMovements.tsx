import { Link } from 'react-router'
import type { StockMovement } from '@/features/stock'
import { RecentMovementRow } from './RecentMovementRow'

type RecentMovementsProps = {
  movements: StockMovement[]
}

export function RecentMovements({ movements }: RecentMovementsProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-card">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <h2 className="text-base font-semibold">Recent stock movements</h2>
        <Link to="/admin/stock/history" className="text-sm font-medium text-brand-600 hover:text-brand-500">
          View all
        </Link>
      </div>
      {movements.length > 0 ? (
        <ul className="divide-y divide-slate-100">
          {movements.map((movement) => (
            <RecentMovementRow key={movement.id} movement={movement} />
          ))}
        </ul>
      ) : (
        <p className="px-5 py-8 text-center text-sm text-slate-500">No stock movements yet.</p>
      )}
    </section>
  )
}
