import type { Permission } from '@/features/auth'

export type PermissionGroup = {
  resource: string
  label: string
  permissions: Permission[]
}

const resourceLabels: Record<string, string> = {
  product: 'Products & categories',
  stock: 'Stock',
  user: 'Users',
  role: 'Roles',
  audit: 'Audit log',
}

const actionLabels: Record<string, string> = {
  read: 'View',
  write: 'Create & edit',
  adjust: 'Adjust quantities',
  manage: 'Manage',
}

export function permissionLabel(permission: Permission): string {
  const action = permission.split(':')[1]
  return actionLabels[action] ?? action
}

export function groupPermissions(permissions: Permission[]): PermissionGroup[] {
  const groups = new Map<string, Permission[]>()
  for (const permission of permissions) {
    const resource = permission.split(':')[0]
    groups.set(resource, [...(groups.get(resource) ?? []), permission])
  }
  return [...groups.entries()].map(([resource, groupPermissionList]) => ({
    resource,
    label: resourceLabels[resource] ?? resource,
    permissions: groupPermissionList,
  }))
}
