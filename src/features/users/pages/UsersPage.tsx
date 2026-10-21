import { useState } from 'react'
import { Alert, ButtonLink, PageHeader, Pagination, SearchForm } from '@/components/ui'
import { useAuth } from '@/features/auth'
import { DisableUserDialog } from '../components/DisableUserDialog'
import { UsersResults } from '../components/UsersResults'
import { UserStatusFilter } from '../components/UserStatusFilter'
import { useEnableUser } from '../hooks/useEnableUser'
import { useUserListParams } from '../hooks/useUserListParams'
import { useUsers } from '../hooks/useUsers'
import type { User } from '../types'

export function UsersPage() {
  const { user: currentUser, hasPermission } = useAuth()
  const canManage = hasPermission('user:manage')
  const listParams = useUserListParams()
  const usersQuery = useUsers({
    query: listParams.query,
    status: listParams.status,
    page: listParams.page,
    sort: listParams.sort,
  })
  const enableUser = useEnableUser()
  const [userToDisable, setUserToDisable] = useState<User | null>(null)

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Users"
        description="Manage who can access the admin panel and what they can do."
        actions={canManage && <ButtonLink to="/admin/users/new">New user</ButtonLink>}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchForm
          initialQuery={listParams.query}
          onSearch={listParams.setQuery}
          label="Search users"
          placeholder="Search by name or email"
        />
        <UserStatusFilter value={listParams.status} onChange={listParams.setStatus} />
      </div>

      {enableUser.error && <Alert>{enableUser.error.message}</Alert>}

      <UsersResults
        users={usersQuery.data?.content ?? []}
        isLoading={usersQuery.isPending}
        isError={usersQuery.isError}
        hasFilters={listParams.hasFilters}
        onClearFilters={listParams.clear}
        onRetry={() => usersQuery.refetch()}
        sort={listParams.sort}
        currentUserId={currentUser?.id}
        canManage={canManage}
        enablingUserId={enableUser.isPending ? (enableUser.variables ?? null) : null}
        onSort={listParams.toggleSort}
        onEnable={(user) => enableUser.mutate(user.id)}
        onDisable={setUserToDisable}
      />

      <Pagination
        page={listParams.page}
        totalPages={usersQuery.data?.totalPages ?? 0}
        onPageChange={listParams.setPage}
      />

      <DisableUserDialog user={userToDisable} onClose={() => setUserToDisable(null)} />
    </section>
  )
}
