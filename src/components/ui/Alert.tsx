import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type AlertVariant = 'error' | 'success' | 'info'

type AlertProps = {
  variant?: AlertVariant
  children: ReactNode
}

const variantClasses: Record<AlertVariant, string> = {
  error: 'border-red-200 bg-red-50 text-red-700',
  success: 'border-green-200 bg-green-50 text-green-700',
  info: 'border-brand-200 bg-brand-50 text-brand-700',
}

export function Alert({ variant = 'error', children }: AlertProps) {
  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className={cn('rounded-lg border px-4 py-3 text-sm', variantClasses[variant])}
    >
      {children}
    </div>
  )
}
