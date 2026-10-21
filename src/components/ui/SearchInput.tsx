import { Search, X } from 'lucide-react'
import { useEffect, useId, useRef, useState, type ChangeEvent, type KeyboardEvent } from 'react'
import { useDebouncedCallback } from '@/lib/hooks/useDebouncedCallback'

type SearchInputProps = {
  query: string
  onSearch: (query: string) => void
  label: string
  placeholder?: string
}

const SEARCH_DELAY_MS = 300
const FOCUS_SHORTCUT = '/'

function isTypingTarget(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
  )
}

export function SearchInput({ query, onSearch, label, placeholder }: SearchInputProps) {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState(query)
  const [syncedQuery, setSyncedQuery] = useState(query)

  if (query !== syncedQuery) {
    setSyncedQuery(query)
    if (query !== value.trim()) {
      setValue(query)
    }
  }

  useEffect(() => {
    const focusOnShortcut = (event: globalThis.KeyboardEvent) => {
      const hasModifier = event.ctrlKey || event.metaKey || event.altKey
      if (event.key === FOCUS_SHORTCUT && !hasModifier && !isTypingTarget(event.target)) {
        event.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', focusOnShortcut)
    return () => window.removeEventListener('keydown', focusOnShortcut)
  }, [])

  const searchIfChanged = (next: string) => {
    if (next.trim() !== query) {
      onSearch(next)
    }
  }

  const debouncedSearch = useDebouncedCallback(searchIfChanged, SEARCH_DELAY_MS)

  const searchNow = (next: string) => {
    debouncedSearch.cancel()
    searchIfChanged(next)
  }

  const clear = () => {
    setValue('')
    searchNow('')
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    debouncedSearch.run(event.target.value)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      searchNow(value)
    }
    if (event.key === 'Escape') {
      event.preventDefault()
      if (value) {
        clear()
      } else {
        event.currentTarget.blur()
      }
    }
  }

  return (
    <div role="search" className="relative w-full sm:w-72">
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400"
      />
      <input
        ref={inputRef}
        id={inputId}
        type="search"
        value={value}
        placeholder={placeholder}
        aria-keyshortcuts={FOCUS_SHORTCUT}
        autoComplete="off"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="peer w-full rounded-lg border border-slate-300 bg-white py-2 pr-9 pl-9 text-sm shadow-xs outline-none placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 [&::-webkit-search-cancel-button]:appearance-none"
      />
      {!value && (
        <kbd
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 rounded border border-slate-200 bg-slate-50 px-1.5 font-sans text-xs text-slate-400 peer-focus:hidden"
        >
          {FOCUS_SHORTCUT}
        </kbd>
      )}
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={clear}
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}
