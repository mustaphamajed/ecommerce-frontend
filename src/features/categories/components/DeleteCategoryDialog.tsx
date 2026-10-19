import { ConfirmDialog } from '@/components/ui'
import { useDeleteCategory } from '../hooks/useDeleteCategory'
import type { Category } from '../types'

type DeleteCategoryDialogProps = {
  category: Category | null
  onClose: () => void
}

export function DeleteCategoryDialog({ category, onClose }: DeleteCategoryDialogProps) {
  const deleteCategory = useDeleteCategory()

  const close = () => {
    deleteCategory.reset()
    onClose()
  }

  return (
    <ConfirmDialog
      open={category !== null}
      title="Delete category"
      description={
        <>
          Delete <strong className="font-semibold text-slate-900">{category?.name}</strong>? This can't be undone.
        </>
      }
      confirmLabel="Delete"
      isConfirming={deleteCategory.isPending}
      error={deleteCategory.error?.message}
      onConfirm={() => category && deleteCategory.mutate(category.id, { onSuccess: close })}
      onCancel={close}
    />
  )
}
