import { useNavigate, useParams } from 'react-router'
import { Badge, ButtonLink, EmptyState, PageHeader, Spinner } from '@/components/ui'
import type { Permission } from '@/features/auth'
import { RoleForm } from '../components/RoleForm'
import { usePermissionOptions } from '../hooks/usePermissionOptions'
import { useRole } from '../hooks/useRole'
import { useUpdateRole } from '../hooks/useUpdateRole'
import { toRoleFormValues, toRoleInput, type RoleFormValues } from '../schemas/roleSchema'

const ADMIN_ROLE = 'ADMIN'
const ADMIN_LOCKED_PERMISSIONS: Permission[] = ['user:manage', 'role:manage']

export function RoleEditPage() {
  const { roleId } = useParams()
  const id = Number(roleId)
  const navigate = useNavigate()
  const roleQuery = useRole(id)
  const permissionsQuery = usePermissionOptions()
  const updateRole = useUpdateRole(id)

  const handleSubmit = async (values: RoleFormValues) => {
    await updateRole.mutateAsync(toRoleInput(values))
    navigate('/admin/roles')
  }

  const role = roleQuery.data
  const isLoading = roleQuery.isPending || permissionsQuery.isPending
  const isError = roleQuery.isError || permissionsQuery.isError
  const state = isLoading ? 'loading' : isError || !role ? 'error' : 'ready'

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title={role?.name ?? 'Edit role'}
        description={role ? `Assigned to ${role.userCount} user(s)` : undefined}
        actions={role?.builtIn && <Badge>Built-in</Badge>}
      />
      {
        {
          loading: (
            <div className="flex justify-center py-24 text-brand-600">
              <Spinner className="size-8" />
            </div>
          ),
          error: (
            <EmptyState
              title="Role not found"
              action={
                <ButtonLink to="/admin/roles" variant="secondary">
                  Back to roles
                </ButtonLink>
              }
            />
          ),
          ready: role && (
            <RoleForm
              key={role.id}
              defaultValues={toRoleFormValues(role)}
              availablePermissions={permissionsQuery.data ?? []}
              builtIn={role.builtIn}
              lockedPermissions={role.name === ADMIN_ROLE ? ADMIN_LOCKED_PERMISSIONS : []}
              submitLabel="Save changes"
              onSubmit={handleSubmit}
            />
          ),
        }[state]
      }
    </section>
  )
}
