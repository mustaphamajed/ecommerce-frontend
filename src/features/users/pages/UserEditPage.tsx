import { CircleHelp } from 'lucide-react'
import { useParams } from 'react-router'
import { ButtonLink, EmptyState, FormSection, PageHeader, Spinner } from '@/components/ui'
import { ResetPasswordForm } from '../components/ResetPasswordForm'
import { UserAccessForm } from '../components/UserAccessForm'
import { UserProfileForm } from '../components/UserProfileForm'
import { UserStatusBadge } from '../components/UserStatusBadge'
import { useResetUserPassword } from '../hooks/useResetUserPassword'
import { useRoles } from '../hooks/useRoles'
import { useUpdateUserAccess } from '../hooks/useUpdateUserAccess'
import { useUpdateUserProfile } from '../hooks/useUpdateUserProfile'
import { useUser } from '../hooks/useUser'
import { useWarehouses } from '../hooks/useWarehouses'

export function UserEditPage() {
  const { userId } = useParams()
  const id = Number(userId)
  const userQuery = useUser(id)
  const rolesQuery = useRoles()
  const warehousesQuery = useWarehouses()
  const updateProfile = useUpdateUserProfile(id)
  const updateAccess = useUpdateUserAccess(id)
  const resetPassword = useResetUserPassword(id)

  const user = userQuery.data
  const isLoading = userQuery.isPending || rolesQuery.isPending || warehousesQuery.isPending
  const isError = userQuery.isError || rolesQuery.isError || warehousesQuery.isError
  const state = isLoading ? 'loading' : isError || !user ? 'error' : 'ready'

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title={user ? `${user.firstName} ${user.lastName}` : 'Edit user'}
        description={user?.email}
        actions={user && <UserStatusBadge enabled={user.enabled} />}
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
              icon={CircleHelp}
              title="User not found"
              action={
                <ButtonLink to="/admin/users" variant="secondary">
                  Back to users
                </ButtonLink>
              }
            />
          ),
          ready: user && (
            <div key={user.id} className="flex flex-col gap-6">
              <FormSection title="Profile" description="Name and email used to log in.">
                <UserProfileForm user={user} onSubmit={updateProfile.mutateAsync} />
              </FormSection>
              <FormSection title="Access" description="Roles decide what this user can do.">
                <UserAccessForm
                  user={user}
                  roles={rolesQuery.data ?? []}
                  warehouses={warehousesQuery.data ?? []}
                  onSubmit={updateAccess.mutateAsync}
                />
              </FormSection>
              <FormSection title="Password" description="Set a new password for this user.">
                <ResetPasswordForm onSubmit={resetPassword.mutateAsync} />
              </FormSection>
            </div>
          ),
        }[state]
      }
    </section>
  )
}
