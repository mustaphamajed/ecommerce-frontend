import { cn } from '@/lib/cn'

type MovementChangeProps = {
  change: number
}

export function MovementChange({ change }: MovementChangeProps) {
  return (
    <span className={cn('font-semibold tabular-nums', change > 0 ? 'text-green-700' : 'text-red-600')}>
      {change > 0 ? `+${change}` : change}
    </span>
  )
}
