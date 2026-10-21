import type { Permission } from '@/features/auth'
import type { PermissionGroup } from '../utils/permissionGroups'
import { PermissionCheckbox } from './PermissionCheckbox'

type PermissionGroupRowProps = {
  group: PermissionGroup
  selected: Permission[]
  locked: Permission[]
  onToggle: (permission: Permission, checked: boolean) => void
}

export function PermissionGroupRow({ group, selected, locked, onToggle }: PermissionGroupRowProps) {
  return (
    <div className="grid gap-3 py-3 sm:grid-cols-[12rem_1fr] sm:items-start">
      <p className="pt-2 text-sm font-medium text-slate-700">{group.label}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {group.permissions.map((permission) => (
          <PermissionCheckbox
            key={permission}
            permission={permission}
            checked={selected.includes(permission)}
            locked={locked.includes(permission)}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  )
}
