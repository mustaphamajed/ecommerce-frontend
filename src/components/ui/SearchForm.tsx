import { useId, type FormEvent } from 'react'
import { Button } from './Button'

type SearchFormProps = {
  initialQuery: string
  onSearch: (query: string) => void
  label: string
  placeholder?: string
}

export function SearchForm({ initialQuery, onSearch, label, placeholder }: SearchFormProps) {
  const inputId = useId()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSearch(String(new FormData(event.currentTarget).get('q') ?? ''))
  }

  return (
    <form role="search" onSubmit={handleSubmit} className="flex w-full gap-2 sm:w-auto">
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <input
        key={initialQuery}
        id={inputId}
        name="q"
        type="search"
        defaultValue={initialQuery}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-xs outline-none placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 sm:w-72"
      />
      <Button type="submit" variant="secondary">
        Search
      </Button>
    </form>
  )
}
