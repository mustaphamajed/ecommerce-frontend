import { ArrowLeft, Store } from 'lucide-react'
import { Link } from 'react-router'
import { useAuth } from '@/features/auth'
import { navigationSections } from './navigation'
import { SidebarSection } from './SidebarSection'

export function Sidebar() {
  const { hasPermission } = useAuth()
  const sections = navigationSections.map((section) => ({
    ...section,
    items: section.items.filter((item) => !item.permission || hasPermission(item.permission)),
  }))

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white md:flex">
      <Link to="/admin" className="flex h-16 items-center gap-2.5 border-b border-slate-200 px-5">
        <span className="flex size-8 items-center justify-center rounded-lg bg-brand-600 text-white">
          <Store aria-hidden="true" className="size-4.5" />
        </span>
        <span className="leading-tight">
          <span className="block text-sm font-semibold">Shop</span>
          <span className="block text-xs text-slate-500">Admin panel</span>
        </span>
      </Link>
      <nav aria-label="Main" className="flex flex-1 flex-col gap-6 overflow-y-auto p-3 pt-5">
        {sections.map((section) => (
          <SidebarSection key={section.title} title={section.title} items={section.items} />
        ))}
      </nav>
      <Link
        to="/"
        className="flex items-center gap-2 border-t border-slate-200 px-5 py-4 text-sm text-slate-500 transition hover:text-slate-900"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Back to store
      </Link>
    </aside>
  )
}
