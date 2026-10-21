import { useNavigate } from 'react-router'
import { Button, EmptyState, PageHeader, Spinner } from '@/components/ui'
import { CreateUserForm } from '../components/CreateUserForm'
import { useCreateUser } from '../hooks/useCreateUser'
import { useRoles } from '../hooks/useRoles'
import { useWarehouses } from '../hooks/useWarehouses'
import type { CreateUserFormValues } from '../schemas/createUserSchema'

export function UserCreatePage() {
  const navigate = useNavigate()
  const rolesQuery = useRoles()
  const warehousesQuery = useWarehouses()
  const createUser = useCreateUser()

  const handleSubmit = async (values: CreateUserFormValues) => {
    await createUser.mutateAsync(values)
    navigate('/admin/users')
  }

  const isLoading = rolesQuery.isPending || warehousesQuery.isPending
  const isError = rolesQuery.isError || warehousesQuery.isError
  const state = isLoading ? 'loading' : isError ? 'error' : 'ready'

  return (
    <section className="flex flex-col gap-6">
      <PageHeader title="New user" description="Give someone access to the admin panel." />
      {
        {
          loading: (
            <div className="flex justify-center py-24 text-brand-600">
              <Spinner className="size-8" />
            </div>
          ),
          error: (
            <EmptyState
              title="We couldn't load roles and warehouses"
              action={
                <Button
                  onClick={() => {
                    rolesQuery.refetch()
                    warehousesQuery.refetch()
                  }}
                >
                  Try again
                </Button>
              }
            />
          ),
          ready: (
            <CreateUserForm
              roles={rolesQuery.data ?? []}
              warehouses={warehousesQuery.data ?? []}
              onSubmit={handleSubmit}
            />
          ),
        }[state]
      }
    </section>
  )
}
