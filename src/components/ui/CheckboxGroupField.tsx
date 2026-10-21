import { useId } from 'react'
import { cn } from '@/lib/cn'

export type CheckboxOption = {
  value: number
  label: string
  description?: string
}

type CheckboxGroupFieldProps = {
  legend: string
  options: CheckboxOption[]
  value: number[]
  onChange: (value: number[]) => void
  error?: string
  hint?: string
}

export function CheckboxGroupField({ legend, options, value, onChange, error, hint }: CheckboxGroupFieldProps) {
  const messageId = useId()
  const message = error ?? hint

  const toggle = (optionValue: number, checked: boolean) =>
    onChange(checked ? [...value, optionValue] : value.filter((selected) => selected !== optionValue))

  return (
    <fieldset aria-describedby={message ? messageId : undefined} className="flex flex-col gap-2">
      <legend className="text-sm font-medium text-slate-700">{legend}</legend>
      <div className="mt-1.5 grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              'flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition',
              'has-checked:border-indigo-500 has-checked:bg-indigo-50',
              error ? 'border-red-300' : 'border-slate-200 hover:border-slate-300',
            )}
          >
            <input
              type="checkbox"
              checked={value.includes(option.value)}
              onChange={(event) => toggle(option.value, event.target.checked)}
              className="mt-0.5 size-4 accent-indigo-600"
            />
            <span>
              <span className="block text-sm font-medium text-slate-900">{option.label}</span>
              {option.description && <span className="block text-xs text-slate-500">{option.description}</span>}
            </span>
          </label>
        ))}
      </div>
      {message && (
        <p id={messageId} className={cn('text-sm', error ? 'text-red-600' : 'text-slate-500')}>
          {message}
        </p>
      )}
    </fieldset>
  )
}
