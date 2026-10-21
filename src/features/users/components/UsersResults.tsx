import { SearchX, TriangleAlert } from 'lucide-react'
import type { ComponentProps } from 'react'
import { Button, EmptyState, Spinner } from '@/components/ui'
import type { User } from '../types'
import { UsersTable } from './UsersTable'

type UsersResultsProps = Omit<ComponentProps<typeof UsersTable>, 'users'> & {
  users: User[]
  isLoading: boolean
  isError: boolean
  hasFilters: boolean
  onClearFilters: () => void
  onRetry: () => void
}

type ResultsState = 'loading' | 'error' | 'noMatch' | 'ready'

export function UsersResults({
  users,
  isLoading,
  isError,
  hasFilters,
  onClearFilters,
  onRetry,
  ...tableProps
}: UsersResultsProps) {
  const state = resultsState(users, isLoading, isError, hasFilters)

  return {
    loading: (
      <div className="flex justify-center py-24 text-brand-600">
        <Spinner className="size-8" />
      </div>
    ),
    error: (
      <EmptyState
        icon={TriangleAlert}
        title="We couldn't load the users"
        action={<Button onClick={onRetry}>Try again</Button>}
      />
    ),
    noMatch: (
      <EmptyState
        icon={SearchX}
        title="No users match your filters"
        action={
          <Button variant="secondary" onClick={onClearFilters}>
            Clear filters
          </Button>
        }
      />
    ),
    ready: <UsersTable users={users} {...tableProps} />,
  }[state]
}

function resultsState(users: User[], isLoading: boolean, isError: boolean, hasFilters: boolean): ResultsState {
  if (isLoading) {
    return 'loading'
  }
  if (isError) {
    return 'error'
  }
  return users.length === 0 && hasFilters ? 'noMatch' : 'ready'
}
