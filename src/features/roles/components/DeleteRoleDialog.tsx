import { ConfirmDialog } from '@/components/ui'
import { useDeleteRole } from '../hooks/useDeleteRole'
import type { Role } from '../types'

type DeleteRoleDialogProps = {
  role: Role | null
  onClose: () => void
}

export function DeleteRoleDialog({ role, onClose }: DeleteRoleDialogProps) {
  const deleteRole = useDeleteRole()

  const close = () => {
    deleteRole.reset()
    onClose()
  }

  return (
    <ConfirmDialog
      open={role !== null}
      title="Delete role"
      description={
        <>
          Delete the role <strong className="font-semibold text-slate-900">{role?.name}</strong>? This can't be undone.
        </>
      }
      confirmLabel="Delete"
      isConfirming={deleteRole.isPending}
      error={deleteRole.error?.message}
      onConfirm={() => role && deleteRole.mutate(role.id, { onSuccess: close })}
      onCancel={close}
    />
  )
}
