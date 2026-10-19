import { useAuth } from '@/features/auth'
import { navigationItems } from './navigation'
import { SidebarLink } from './SidebarLink'

export function Sidebar() {
  const { hasPermission } = useAuth()
  const visibleItems = navigationItems.filter((item) => !item.permission || hasPermission(item.permission))

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-slate-200 bg-white md:flex">
      <div className="flex h-16 items-center border-b border-slate-200 px-6 text-lg font-semibold">
        Admin panel
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {visibleItems.map((item) => (
          <SidebarLink key={item.to} to={item.to} label={item.label} end={item.end} />
        ))}
      </nav>
    </aside>
  )
}
