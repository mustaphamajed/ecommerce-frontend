import { ConfirmDialog } from '@/components/ui'
import { useArchiveProduct } from '../hooks/useArchiveProduct'
import type { Product } from '../types'

type ArchiveProductDialogProps = {
  product: Product | null
  onClose: () => void
}

export function ArchiveProductDialog({ product, onClose }: ArchiveProductDialogProps) {
  const archiveProduct = useArchiveProduct()

  const close = () => {
    archiveProduct.reset()
    onClose()
  }

  return (
    <ConfirmDialog
      open={product !== null}
      title="Archive product"
      description={
        <>
          <strong className="font-semibold text-slate-900">{product?.name}</strong> will be hidden from the store.
          Its stock history is kept and you can restore it at any time.
        </>
      }
      confirmLabel="Archive"
      isConfirming={archiveProduct.isPending}
      error={archiveProduct.error?.message}
      onConfirm={() => product && archiveProduct.mutate(product.id, { onSuccess: close })}
      onCancel={close}
    />
  )
}
