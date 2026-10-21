import { Badge } from '@/components/ui'
import type { ProductStatus } from '../types'

type ProductStatusBadgeProps = {
  status: ProductStatus
}

export function ProductStatusBadge({ status }: ProductStatusBadgeProps) {
  return <Badge variant={status === 'ACTIVE' ? 'green' : 'neutral'}>{status === 'ACTIVE' ? 'Active' : 'Archived'}</Badge>
}
