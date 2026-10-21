import type { NavigationItem } from './navigation'
import { SidebarLink } from './SidebarLink'

type SidebarSectionProps = {
  title: string
  items: NavigationItem[]
}

export function SidebarSection({ title, items }: SidebarSectionProps) {
  return (
    items.length > 0 && (
      <div className="flex flex-col gap-0.5">
        <p className="px-3 pb-1 text-xs font-semibold tracking-wide text-slate-400 uppercase">{title}</p>
        {items.map((item) => (
          <SidebarLink key={item.to} to={item.to} label={item.label} icon={item.icon} end={item.end} />
        ))}
      </div>
    )
  )
}
