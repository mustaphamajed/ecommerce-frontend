import { createColumnHelper } from '@tanstack/react-table'
import { useMemo } from 'react'
import { Badge, DataTable, SortableHeader } from '@/components/ui'
import { formatDate } from '@/lib/format'
import type { SortState } from '@/lib/hooks/useListParams'
import type { CoreTableFeatures } from '@/lib/table'
import type { User } from '../types'
import { UserRowActions } from './UserRowActions'
import { UserStatusBadge } from './UserStatusBadge'

type UsersTableProps = {
  users: User[]
  sort: SortState | null
  currentUserId: number | undefined
  canManage: boolean
  enablingUserId: number | null
  onSort: (field: string) => void
  onEnable: (user: User) => void
  onDisable: (user: User) => void
}

const columnHelper = createColumnHelper<CoreTableFeatures, User>()

export function UsersTable({
  users,
  sort,
  currentUserId,
  canManage,
  enablingUserId,
  onSort,
  onEnable,
  onDisable,
}: UsersTableProps) {
  const columns = useMemo(
    () =>
      columnHelper.columns([
        columnHelper.accessor('lastName', {
          header: () => <SortableHeader label="Name" field="lastName" sort={sort} onSort={onSort} />,
          cell: ({ row }) => (
            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-900">
                {row.original.firstName} {row.original.lastName}
              </span>
              {row.original.id === currentUserId && <Badge>You</Badge>}
            </div>
          ),
        }),
        columnHelper.accessor('email', {
          header: () => <SortableHeader label="Email" field="email" sort={sort} onSort={onSort} />,
        }),
        columnHelper.accessor('roles', {
          header: 'Roles',
          cell: ({ getValue }) => (
            <div className="flex flex-wrap gap-1">
              {getValue().map((role) => (
                <Badge key={role.id} variant="indigo">
                  {role.name}
                </Badge>
              ))}
            </div>
          ),
        }),
        columnHelper.accessor('warehouses', {
          header: 'Warehouses',
          cell: ({ getValue }) => (
            <span className="text-slate-500">
              {getValue()
                .map((warehouse) => warehouse.code)
                .join(', ') || '—'}
            </span>
          ),
        }),
        columnHelper.accessor('enabled', {
          header: 'Status',
          cell: ({ getValue }) => <UserStatusBadge enabled={getValue()} />,
        }),
        columnHelper.accessor('createdAt', {
          header: () => <SortableHeader label="Created" field="createdAt" sort={sort} onSort={onSort} />,
          cell: ({ getValue }) => <span className="whitespace-nowrap">{formatDate(getValue())}</span>,
        }),
        ...(canManage
          ? [
              columnHelper.display({
                id: 'actions',
                header: () => <span className="sr-only">Actions</span>,
                cell: ({ row }) => (
                  <UserRowActions
                    user={row.original}
                    isCurrentUser={row.original.id === currentUserId}
                    isEnabling={enablingUserId === row.original.id}
                    onEnable={onEnable}
                    onDisable={onDisable}
                  />
                ),
              }),
            ]
          : []),
      ]),
    [sort, currentUserId, canManage, enablingUserId, onSort, onEnable, onDisable],
  )

  return <DataTable columns={columns} data={users} getRowId={(user) => String(user.id)} />
}
