import { Select } from '@/components/ui'
import type { CategoryOption } from '../api/productsApi'
import type { ProductStatusFilter } from '../types'

type ProductFiltersProps = {
  status: ProductStatusFilter
  categoryId: number | null
  categories: CategoryOption[]
  onStatusChange: (status: ProductStatusFilter) => void
  onCategoryChange: (categoryId: number | null) => void
}

export function ProductFilters({
  status,
  categoryId,
  categories,
  onStatusChange,
  onCategoryChange,
}: ProductFiltersProps) {
  return (
    <div className="flex gap-3">
      <Select
        label="Filter by status"
        value={status}
        onChange={(event) => onStatusChange(event.target.value as ProductStatusFilter)}
      >
        <option value="">All statuses</option>
        <option value="ACTIVE">Active</option>
        <option value="ARCHIVED">Archived</option>
      </Select>
      <Select
        label="Filter by category"
        value={categoryId === null ? '' : String(categoryId)}
        onChange={(event) => onCategoryChange(event.target.value === '' ? null : Number(event.target.value))}
      >
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category.id} value={String(category.id)}>
            {category.name}
          </option>
        ))}
      </Select>
    </div>
  )
}
