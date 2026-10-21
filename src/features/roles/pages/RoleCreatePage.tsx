import { useNavigate } from 'react-router'
import { Button, EmptyState, PageHeader, Spinner } from '@/components/ui'
import { RoleForm } from '../components/RoleForm'
import { useCreateRole } from '../hooks/useCreateRole'
import { usePermissionOptions } from '../hooks/usePermissionOptions'
import { emptyRoleForm, toRoleInput, type RoleFormValues } from '../schemas/roleSchema'

export function RoleCreatePage() {
  const navigate = useNavigate()
  const permissionsQuery = usePermissionOptions()
  const createRole = useCreateRole()

  const handleSubmit = async (values: RoleFormValues) => {
    await createRole.mutateAsync(toRoleInput(values))
    navigate('/admin/roles')
  }

  const state = permissionsQuery.isPending ? 'loading' : permissionsQuery.isError ? 'error' : 'ready'

  return (
    <section className="flex flex-col gap-6">
      <PageHeader title="New role" description="Choose a name and what users with this role can do." />
      {
        {
          loading: (
            <div className="flex justify-center py-24 text-indigo-600">
              <Spinner className="size-8" />
            </div>
          ),
          error: (
            <EmptyState
              title="We couldn't load the permissions"
              action={<Button onClick={() => permissionsQuery.refetch()}>Try again</Button>}
            />
          ),
          ready: (
            <RoleForm
              defaultValues={emptyRoleForm}
              availablePermissions={permissionsQuery.data ?? []}
              builtIn={false}
              lockedPermissions={[]}
              submitLabel="Create role"
              onSubmit={handleSubmit}
            />
          ),
        }[state]
      }
    </section>
  )
}
