import { Link, type LinkProps } from 'react-router'
import { buttonClasses, type ButtonVariant } from './buttonStyles'

type ButtonLinkProps = LinkProps & {
  variant?: ButtonVariant
}

export function ButtonLink({ variant = 'primary', className, ...props }: ButtonLinkProps) {
  return <Link className={buttonClasses(variant, className)} {...props} />
}
