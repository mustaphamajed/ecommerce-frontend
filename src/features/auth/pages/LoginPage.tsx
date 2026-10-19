import { Link, Navigate, useLocation } from 'react-router'
import { FullPageSpinner } from '@/components/ui'
import { LoginForm } from '../components/LoginForm'
import { useAuth } from '../context/useAuth'

type LoginLocationState = {
  from?: { pathname: string; search: string }
} | null

const DEFAULT_REDIRECT = '/admin'

export function LoginPage() {
  const { status } = useAuth()
  const location = useLocation()
  const from = (location.state as LoginLocationState)?.from
  const redirectTo = from ? `${from.pathname}${from.search}` : DEFAULT_REDIRECT

  return {
    loading: <FullPageSpinner />,
    authenticated: <Navigate to={redirectTo} replace />,
    anonymous: (
      <main className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <Link to="/" className="block text-center text-lg font-semibold tracking-tight">
            Shop
          </Link>
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-xl font-semibold">Sign in</h1>
            <p className="mt-1 text-sm text-slate-500">Access the admin panel with your account.</p>
            <div className="mt-6">
              <LoginForm />
            </div>
          </div>
          <Link to="/" className="mt-6 block text-center text-sm text-slate-500 hover:text-slate-900">
            ← Back to store
          </Link>
        </div>
      </main>
    ),
  }[status]
}
