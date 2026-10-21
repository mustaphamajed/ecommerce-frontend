import { Button, ButtonLink } from '@/components/ui'
import type { User } from '../types'

type UserRowActionsProps = {
  user: User
  isCurrentUser: boolean
  isEnabling: boolean
  onEnable: (user: User) => void
  onDisable: (user: User) => void
}

export function UserRowActions({ user, isCurrentUser, isEnabling, onEnable, onDisable }: UserRowActionsProps) {
  return (
    <div className="flex justify-end gap-2">
      <ButtonLink to={`/admin/users/${user.id}/edit`} variant="ghost" className="px-3 py-1.5">
        Edit
      </ButtonLink>
      {!isCurrentUser &&
        (user.enabled ? (
          <Button
            variant="ghost"
            className="px-3 py-1.5 text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={() => onDisable(user)}
          >
            Disable
          </Button>
        ) : (
          <Button
            variant="ghost"
            className="px-3 py-1.5 text-green-700 hover:bg-green-50 hover:text-green-800"
            isLoading={isEnabling}
            onClick={() => onEnable(user)}
          >
            Enable
          </Button>
        ))}
    </div>
  )
}
