import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { cn } from '@/lib/cn'

type StatCardTone = 'neutral' | 'warning' | 'danger'

type StatCardProps = {
  label: string
  value: number
  hint?: ReactNode
  tone?: StatCardTone
  to?: string
}

const toneClasses: Record<StatCardTone, string> = {
  neutral: 'text-slate-900',
  warning: 'text-amber-600',
  danger: 'text-red-600',
}

const numberFormatter = new Intl.NumberFormat('fr-FR')

export function StatCard({ label, value, hint, tone = 'neutral', to }: StatCardProps) {
  const content = (
    <>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className={cn('mt-2 text-3xl font-semibold tracking-tight tabular-nums', toneClasses[tone])}>
        {numberFormatter.format(value)}
      </p>
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </>
  )
  const cardClasses = 'block rounded-xl border border-slate-200 bg-white p-5 shadow-xs'

  return to ? (
    <Link to={to} className={cn(cardClasses, 'transition hover:border-brand-300 hover:shadow-sm')}>
      {content}
    </Link>
  ) : (
    <div className={cardClasses}>{content}</div>
  )
}
