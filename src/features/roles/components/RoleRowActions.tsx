import { Button, ButtonLink } from '@/components/ui'
import type { Role } from '../types'

type RoleRowActionsProps = {
  role: Role
  onDelete: (role: Role) => void
}

function deleteBlockedReason(role: Role): string | undefined {
  if (role.builtIn) {
    return 'Built-in roles can’t be deleted'
  }
  return role.userCount > 0 ? `Assigned to ${role.userCount} user(s)` : undefined
}

export function RoleRowActions({ role, onDelete }: RoleRowActionsProps) {
  const blockedReason = deleteBlockedReason(role)

  return (
    <div className="flex justify-end gap-2">
      <ButtonLink to={`/admin/roles/${role.id}/edit`} variant="ghost" className="px-3 py-1.5">
        Edit
      </ButtonLink>
      <Button
        variant="ghost"
        className="px-3 py-1.5 text-red-600 hover:bg-red-50 hover:text-red-700"
        disabled={blockedReason !== undefined}
        title={blockedReason}
        onClick={() => onDelete(role)}
      >
        Delete
      </Button>
    </div>
  )
}
