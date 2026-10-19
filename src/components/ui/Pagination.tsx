import { Button } from './Button'

type PaginationProps = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  return (
    totalPages > 1 && (
      <nav aria-label="Pagination" className="flex items-center justify-between gap-4">
        <Button variant="secondary" disabled={page === 0} onClick={() => onPageChange(page - 1)}>
          Previous
        </Button>
        <p className="text-sm text-slate-500">
          Page {page + 1} of {totalPages}
        </p>
        <Button variant="secondary" disabled={page + 1 >= totalPages} onClick={() => onPageChange(page + 1)}>
          Next
        </Button>
      </nav>
    )
  )
}
