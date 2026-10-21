import { useId, type ComponentProps } from 'react'
import { cn } from '@/lib/cn'

type SelectProps = ComponentProps<'select'> & {
  label: string
}

export function Select({ label, id, className, children, ...props }: SelectProps) {
  const generatedId = useId()
  const selectId = id ?? generatedId

  return (
    <div>
      <label htmlFor={selectId} className="sr-only">
        {label}
      </label>
      <select
        id={selectId}
        className={cn(
          'rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-xs outline-none',
          'focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20',
          className,
        )}
        {...props}
      >
        {children}
      </select>
    </div>
  )
}
