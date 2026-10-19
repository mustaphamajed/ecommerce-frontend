import { ButtonLink } from '@/components/ui'
import { useAuth } from '@/features/auth'

export function HeaderAuthAction() {
  const { status } = useAuth()

  return {
    loading: <span className="h-9 w-24 animate-pulse rounded-lg bg-slate-100" aria-hidden="true" />,
    authenticated: <ButtonLink to="/admin">Admin panel</ButtonLink>,
    anonymous: <ButtonLink to="/login">Log in</ButtonLink>,
  }[status]
}
