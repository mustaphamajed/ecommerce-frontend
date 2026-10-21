import { createColumnHelper } from '@tanstack/react-table'
import { useMemo } from 'react'
import { Badge, DataTable } from '@/components/ui'
import type { CoreTableFeatures } from '@/lib/table'
import type { Role } from '../types'
import { RoleRowActions } from './RoleRowActions'

type RolesTableProps = {
  roles: Role[]
  canManage: boolean
  onDelete: (role: Role) => void
}

const columnHelper = createColumnHelper<CoreTableFeatures, Role>()

export function RolesTable({ roles, canManage, onDelete }: RolesTableProps) {
  const columns = useMemo(
    () =>
      columnHelper.columns([
        columnHelper.accessor('name', {
          header: 'Role',
          cell: ({ row }) => (
            <div className="max-w-xs">
              <div className="flex items-center gap-2">
                <span className="font-medium text-slate-900">{row.original.name}</span>
                {row.original.builtIn && <Badge>Built-in</Badge>}
              </div>
              {row.original.description && <p className="text-xs text-slate-500">{row.original.description}</p>}
            </div>
          ),
        }),
        columnHelper.accessor('permissions', {
          header: 'Permissions',
          cell: ({ getValue }) => (
            <div className="flex max-w-md flex-wrap gap-1">
              {getValue().map((permission) => (
                <Badge key={permission} variant="brand">
                  {permission}
                </Badge>
              ))}
            </div>
          ),
        }),
        columnHelper.accessor('userCount', {
          header: 'Users',
          cell: ({ getValue }) => <span className="tabular-nums">{getValue()}</span>,
        }),
        ...(canManage
          ? [
              columnHelper.display({
                id: 'actions',
                header: () => <span className="sr-only">Actions</span>,
                cell: ({ row }) => <RoleRowActions role={row.original} onDelete={onDelete} />,
              }),
            ]
          : []),
      ]),
    [canManage, onDelete],
  )

  return <DataTable columns={columns} data={roles} getRowId={(role) => String(role.id)} />
}
