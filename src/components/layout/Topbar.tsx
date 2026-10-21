import { LogOut } from 'lucide-react'
import { useState } from 'react'
import { Avatar, Button } from '@/components/ui'
import { useAuth } from '@/features/auth'

export function Topbar() {
  const { user, logout } = useAuth()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-end gap-3 border-b border-slate-200 bg-white/90 px-6 backdrop-blur">
      {user && (
        <div className="flex items-center gap-3">
          <Avatar firstName={user.firstName} lastName={user.lastName} />
          <div className="hidden leading-tight sm:block">
            <p className="text-sm font-medium text-slate-900">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-slate-500">{user.roles.join(' · ')}</p>
          </div>
        </div>
      )}
      <span aria-hidden="true" className="mx-1 h-6 w-px bg-slate-200" />
      <Button
        variant="ghost"
        className="px-2.5"
        onClick={handleLogout}
        isLoading={isLoggingOut}
        title="Log out"
        aria-label="Log out"
      >
        {!isLoggingOut && <LogOut aria-hidden="true" className="size-4.5" />}
      </Button>
    </header>
  )
}
