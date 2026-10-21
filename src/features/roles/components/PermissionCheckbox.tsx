import type { Permission } from '@/features/auth'
import { cn } from '@/lib/cn'
import { permissionLabel } from '../utils/permissionGroups'

type PermissionCheckboxProps = {
  permission: Permission
  checked: boolean
  locked: boolean
  onToggle: (permission: Permission, checked: boolean) => void
}

export function PermissionCheckbox({ permission, checked, locked, onToggle }: PermissionCheckboxProps) {
  return (
    <label
      title={locked ? 'The ADMIN role always keeps this permission' : undefined}
      className={cn(
        'flex items-start gap-2.5 rounded-lg border px-3 py-2 transition',
        'has-checked:border-brand-500 has-checked:bg-brand-50',
        locked ? 'cursor-not-allowed opacity-70' : 'cursor-pointer border-slate-200 hover:border-slate-300',
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={locked}
        onChange={(event) => onToggle(permission, event.target.checked)}
        className="mt-0.5 size-4 accent-brand-600"
      />
      <span>
        <span className="block text-sm font-medium text-slate-900">{permissionLabel(permission)}</span>
        <span className="block font-mono text-xs text-slate-400">{permission}</span>
      </span>
    </label>
  )
}
