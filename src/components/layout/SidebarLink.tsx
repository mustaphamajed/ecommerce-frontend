import type { LucideIcon } from 'lucide-react'
import { NavLink } from 'react-router'
import { cn } from '@/lib/cn'

type SidebarLinkProps = {
  to: string
  label: string
  icon: LucideIcon
  end?: boolean
}

export function SidebarLink({ to, label, icon: Icon, end }: SidebarLinkProps) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          'group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition',
          isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
        )
      }
    >
      {({ isActive }) => (
        <>
          <span
            aria-hidden="true"
            className={cn(
              'absolute inset-y-1.5 left-0 w-1 rounded-r-full transition',
              isActive ? 'bg-brand-600' : 'bg-transparent',
            )}
          />
          <Icon
            aria-hidden="true"
            className={cn('size-4.5 shrink-0', isActive ? 'text-brand-600' : 'text-slate-400 group-hover:text-slate-600')}
          />
          {label}
        </>
      )}
    </NavLink>
  )
}
