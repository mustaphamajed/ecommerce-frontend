import { Button, EmptyState, PageHeader, Spinner } from '@/components/ui'
import { useAuth } from '@/features/auth'
import { DashboardContent } from '../components/DashboardContent'
import { useDashboard } from '../hooks/useDashboard'

export function DashboardPage() {
  const { user } = useAuth()
  const dashboardQuery = useDashboard()
  const state = dashboardQuery.isPending ? 'loading' : dashboardQuery.isError ? 'error' : 'ready'

  return (
    <section className="flex flex-col gap-6">
      <PageHeader title={`Welcome, ${user?.firstName ?? ''}`} description={`Signed in as ${user?.roles.join(', ')}`} />
      {
        {
          loading: (
            <div className="flex justify-center py-24 text-indigo-600">
              <Spinner className="size-8" />
            </div>
          ),
          error: (
            <EmptyState
              title="We couldn't load the dashboard"
              action={<Button onClick={() => dashboardQuery.refetch()}>Try again</Button>}
            />
          ),
          ready: dashboardQuery.data && <DashboardContent dashboard={dashboardQuery.data} />,
        }[state]
      }
    </section>
  )
}
