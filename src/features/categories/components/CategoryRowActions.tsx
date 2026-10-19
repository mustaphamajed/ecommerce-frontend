import { Button, ButtonLink } from '@/components/ui'
import type { Category } from '../types'

type CategoryRowActionsProps = {
  category: Category
  onDelete: (category: Category) => void
}

export function CategoryRowActions({ category, onDelete }: CategoryRowActionsProps) {
  const hasProducts = category.productCount > 0

  return (
    <div className="flex justify-end gap-2">
      <ButtonLink to={`/admin/categories/${category.id}/edit`} variant="ghost" className="px-3 py-1.5">
        Edit
      </ButtonLink>
      <Button
        variant="ghost"
        className="px-3 py-1.5 text-red-600 hover:bg-red-50 hover:text-red-700"
        disabled={hasProducts}
        title={hasProducts ? 'Remove or move its products first' : undefined}
        onClick={() => onDelete(category)}
      >
        Delete
      </Button>
    </div>
  )
}
