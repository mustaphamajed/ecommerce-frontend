import type { FormEvent } from 'react'
import { Button } from '@/components/ui'

type CatalogSearchFormProps = {
  initialQuery: string
  onSearch: (query: string) => void
}

export function CatalogSearchForm({ initialQuery, onSearch }: CatalogSearchFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSearch(String(new FormData(event.currentTarget).get('q') ?? ''))
  }

  return (
    <form role="search" onSubmit={handleSubmit} className="flex w-full gap-2 sm:w-auto">
      <label htmlFor="catalog-search" className="sr-only">
        Search products
      </label>
      <input
        key={initialQuery}
        id="catalog-search"
        name="q"
        type="search"
        defaultValue={initialQuery}
        placeholder="Search by name or SKU"
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-xs outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 sm:w-72"
      />
      <Button type="submit">Search</Button>
    </form>
  )
}
