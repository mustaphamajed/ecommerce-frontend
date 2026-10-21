import { cn } from '@/lib/cn'

type StockChangePreviewProps = {
  currentQuantity: number
  change: number
}

export function StockChangePreview({ currentQuantity, change }: StockChangePreviewProps) {
  const newQuantity = currentQuantity + change

  return (
    <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3 text-sm">
      <span className="text-slate-500">New quantity</span>
      <span className="font-medium">
        {currentQuantity} → <span className={cn(newQuantity < 0 ? 'text-red-600' : 'text-slate-900')}>{newQuantity}</span>
      </span>
    </div>
  )
}
