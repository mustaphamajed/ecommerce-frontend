import { useId } from 'react'
import type { Permission } from '@/features/auth'
import { groupPermissions } from '../utils/permissionGroups'
import { PermissionGroupRow } from './PermissionGroupRow'

type PermissionGridProps = {
  available: Permission[]
  value: Permission[]
  locked: Permission[]
  onChange: (permissions: Permission[]) => void
  error?: string
}

export function PermissionGrid({ available, value, locked, onChange, error }: PermissionGridProps) {
  const errorId = useId()

  const toggle = (permission: Permission, checked: boolean) =>
    onChange(checked ? [...value, permission] : value.filter((selected) => selected !== permission))

  return (
    <fieldset aria-describedby={error ? errorId : undefined} className="flex flex-col">
      <legend className="text-sm font-medium text-slate-700">Permissions</legend>
      <p className="mt-1 text-sm text-slate-500">
        {value.length} of {available.length} selected
      </p>
      <div className="mt-2 divide-y divide-slate-100">
        {groupPermissions(available).map((group) => (
          <PermissionGroupRow
            key={group.resource}
            group={group}
            selected={value}
            locked={locked}
            onToggle={toggle}
          />
        ))}
      </div>
      {error && (
        <p id={errorId} className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </fieldset>
  )
}
