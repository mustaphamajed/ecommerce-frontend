import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type BadgeVariant = 'neutral' | 'brand' | 'green' | 'amber' | 'red'

type BadgeProps = {
  variant?: BadgeVariant
  children: ReactNode
}

const variantClasses: Record<BadgeVariant, string> = {
  neutral: 'bg-slate-100 text-slate-700',
  brand: 'bg-brand-50 text-brand-700',
  green: 'bg-green-50 text-green-700',
  amber: 'bg-amber-50 text-amber-700',
  red: 'bg-red-50 text-red-700',
}

export function Badge({ variant = 'neutral', children }: BadgeProps) {
  return (
    <span
      className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium', variantClasses[variant])}
    >
      {children}
    </span>
  )
}
