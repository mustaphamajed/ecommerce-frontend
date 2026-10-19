import { useAuth } from '@/features/auth'

export function DashboardPage() {
  const { user } = useAuth()

  return (
    <section>
      <h1 className="text-2xl font-semibold">Welcome, {user?.firstName}</h1>
      <p className="mt-1 text-sm text-slate-500">Roles: {user?.roles.join(', ')}</p>
    </section>
  )
}
