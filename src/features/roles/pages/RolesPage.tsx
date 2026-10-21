import { Plus, TriangleAlert } from 'lucide-react'
import { useState } from 'react'
import { Button, ButtonLink, EmptyState, PageHeader, TableSkeleton } from '@/components/ui'
import { useAuth } from '@/features/auth'
import { DeleteRoleDialog } from '../components/DeleteRoleDialog'
import { RolesTable } from '../components/RolesTable'
import { useRoleList } from '../hooks/useRoleList'
import type { Role } from '../types'

export function RolesPage() {
  const { hasPermission } = useAuth()
  const canManage = hasPermission('role:manage')
  const rolesQuery = useRoleList()
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null)
  const state = rolesQuery.isPending ? 'loading' : rolesQuery.isError ? 'error' : 'ready'

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Roles"
        description="Group permissions into roles, then assign roles to users."
        actions={
          canManage && (
            <ButtonLink to="/admin/roles/new">
              <Plus aria-hidden="true" className="size-4" />
              New role
            </ButtonLink>
          )
        }
      />
      {
        {
          loading: <TableSkeleton columns={4} rows={4} />,
          error: (
            <EmptyState
              icon={TriangleAlert}
              title="We couldn't load the roles"
              action={<Button onClick={() => rolesQuery.refetch()}>Try again</Button>}
            />
          ),
          ready: <RolesTable roles={rolesQuery.data ?? []} canManage={canManage} onDelete={setRoleToDelete} />,
        }[state]
      }
      <DeleteRoleDialog role={roleToDelete} onClose={() => setRoleToDelete(null)} />
    </section>
  )
}
