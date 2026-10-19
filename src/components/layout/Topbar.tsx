import { useState } from 'react'
import { Button } from '@/components/ui'
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
    <header className="flex h-16 items-center justify-end gap-4 border-b border-slate-200 bg-white px-6">
      <div className="text-right">
        <p className="text-sm font-medium">
          {user?.firstName} {user?.lastName}
        </p>
        <p className="text-xs text-slate-500">{user?.email}</p>
      </div>
      <Button variant="secondary" onClick={handleLogout} isLoading={isLoggingOut}>
        Log out
      </Button>
    </header>
  )
}
