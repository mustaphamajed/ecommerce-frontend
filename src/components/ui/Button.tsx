import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'
import { buttonClasses, type ButtonVariant } from './buttonStyles'
import { Spinner } from './Spinner'

type ButtonProps = ComponentProps<'button'> & {
  variant?: ButtonVariant
  isLoading?: boolean
}

export function Button({
  variant = 'primary',
  isLoading = false,
  type = 'button',
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={buttonClasses(variant, cn(isLoading && '[&>svg]:hidden', className))}
      {...props}
    >
      {isLoading && <Spinner className="size-4" />}
      {children}
    </button>
  )
}
