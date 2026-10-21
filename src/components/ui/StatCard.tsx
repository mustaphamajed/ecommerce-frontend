import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { cn } from '@/lib/cn'

type StatCardTone = 'neutral' | 'warning' | 'danger'

type StatCardProps = {
  label: string
  value: number
  icon: LucideIcon
  hint?: ReactNode
  tone?: StatCardTone
  to?: string
}

const valueClasses: Record<StatCardTone, string> = {
  neutral: 'text-slate-900',
  warning: 'text-amber-600',
  danger: 'text-red-600',
}

const iconClasses: Record<StatCardTone, string> = {
  neutral: 'bg-brand-50 text-brand-600',
  warning: 'bg-amber-50 text-amber-600',
  danger: 'bg-red-50 text-red-600',
}

const numberFormatter = new Intl.NumberFormat('fr-FR')

export function StatCard({ label, value, icon: Icon, hint, tone = 'neutral', to }: StatCardProps) {
  const content = (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className={cn('mt-2 text-3xl font-semibold tracking-tight tabular-nums', valueClasses[tone])}>
          {numberFormatter.format(value)}
        </p>
        {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
      </div>
      <span className={cn('flex size-10 shrink-0 items-center justify-center rounded-lg', iconClasses[tone])}>
        <Icon aria-hidden="true" className="size-5" />
      </span>
    </div>
  )
  const cardClasses = 'block rounded-xl border border-slate-200 bg-white p-5 shadow-card'

  return to ? (
    <Link
      to={to}
      className={cn(cardClasses, 'transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md')}
    >
      {content}
    </Link>
  ) : (
    <div className={cardClasses}>{content}</div>
  )
}
