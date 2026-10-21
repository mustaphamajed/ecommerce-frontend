import { useId, type ComponentProps } from 'react'
import { cn } from '@/lib/cn'

type SelectFieldProps = ComponentProps<'select'> & {
  label: string
  error?: string
  hint?: string
}

export function SelectField({ label, error, hint, id, className, children, ...props }: SelectFieldProps) {
  const generatedId = useId()
  const selectId = id ?? generatedId
  const messageId = `${selectId}-message`
  const message = error ?? hint

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={selectId} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <select
        id={selectId}
        aria-invalid={error ? true : undefined}
        aria-describedby={message ? messageId : undefined}
        className={cn(
          'rounded-lg border bg-white px-3 py-2 text-sm shadow-xs outline-none transition',
          'focus:ring-2',
          error
            ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
            : 'border-slate-300 focus:border-brand-500 focus:ring-brand-500/20',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {message && (
        <p id={messageId} className={cn('text-sm', error ? 'text-red-600' : 'text-slate-500')}>
          {message}
        </p>
      )}
    </div>
  )
}
