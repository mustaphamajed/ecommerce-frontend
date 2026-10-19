import { Link } from 'react-router'

export function AccessDenied() {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <p className="text-sm font-semibold text-indigo-600">403</p>
      <h1 className="mt-2 text-2xl font-semibold">Access denied</h1>
      <p className="mt-2 text-sm text-slate-500">You don't have permission to see this page.</p>
      <Link to="/admin" className="mt-6 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-500">
        Back to dashboard
      </Link>
    </div>
  )
}
