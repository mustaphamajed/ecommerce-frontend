import { Badge } from '@/components/ui'

type UserStatusBadgeProps = {
  enabled: boolean
}

export function UserStatusBadge({ enabled }: UserStatusBadgeProps) {
  return <Badge variant={enabled ? 'green' : 'red'}>{enabled ? 'Active' : 'Disabled'}</Badge>
}
