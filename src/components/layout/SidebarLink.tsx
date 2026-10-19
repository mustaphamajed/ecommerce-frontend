import { NavLink } from 'react-router'
import { cn } from '@/lib/cn'

type SidebarLinkProps = {
  to: string
  label: string
  end?: boolean
}

export function SidebarLink({ to, label, end }: SidebarLinkProps) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          'rounded-lg px-3 py-2 text-sm font-medium transition',
          isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
        )
      }
    >
      {label}
    </NavLink>
  )
}
