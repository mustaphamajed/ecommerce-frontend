import { Badge } from '@/components/ui'
import { LOW_STOCK_THRESHOLD } from '../api/stockApi'

type StockQuantityBadgeProps = {
  quantity: number
}

export function StockQuantityBadge({ quantity }: StockQuantityBadgeProps) {
  const variant = quantity === 0 ? 'red' : quantity <= LOW_STOCK_THRESHOLD ? 'amber' : 'green'
  const label = quantity === 0 ? 'Out of stock' : quantity <= LOW_STOCK_THRESHOLD ? `Low · ${quantity}` : quantity

  return <Badge variant={variant}>{label}</Badge>
}
