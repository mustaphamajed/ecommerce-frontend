import { cn } from '@/lib/cn'

type AvatarProps = {
  firstName: string
  lastName: string
  className?: string
}

export function Avatar({ firstName, lastName, className }: AvatarProps) {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()

  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700',
        className,
      )}
    >
      {initials}
    </span>
  )
}
