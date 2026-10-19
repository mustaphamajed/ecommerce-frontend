import type { CatalogCategory } from '../types'
import { CategoryChip } from './CategoryChip'

type CategoryFilterProps = {
  categories: CatalogCategory[]
  selected: string
  onSelect: (slug: string) => void
}

export function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    categories.length > 0 && (
      <div className="flex flex-wrap gap-2" aria-label="Filter by category">
        <CategoryChip label="All" isSelected={selected === ''} onClick={() => onSelect('')} />
        {categories.map((category) => (
          <CategoryChip
            key={category.id}
            label={category.name}
            isSelected={selected === category.slug}
            onClick={() => onSelect(category.slug)}
          />
        ))}
      </div>
    )
  )
}
