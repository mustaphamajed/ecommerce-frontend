import { ConfirmDialog } from '@/components/ui'
import { useDisableUser } from '../hooks/useDisableUser'
import type { User } from '../types'

type DisableUserDialogProps = {
  user: User | null
  onClose: () => void
}

export function DisableUserDialog({ user, onClose }: DisableUserDialogProps) {
  const disableUser = useDisableUser()

  const close = () => {
    disableUser.reset()
    onClose()
  }

  return (
    <ConfirmDialog
      open={user !== null}
      title="Disable user"
      description={
        <>
          <strong className="font-semibold text-slate-900">
            {user?.firstName} {user?.lastName}
          </strong>{' '}
          won't be able to log in anymore. You can enable the account again at any time.
        </>
      }
      confirmLabel="Disable"
      isConfirming={disableUser.isPending}
      error={disableUser.error?.message}
      onConfirm={() => user && disableUser.mutate(user.id, { onSuccess: close })}
      onCancel={close}
    />
  )
}
