import { Archive, ArchiveRestore, Pencil } from 'lucide-react'
import { Button, ButtonLink } from '@/components/ui'
import type { Product } from '../types'

type ProductRowActionsProps = {
  product: Product
  isRestoring: boolean
  onArchive: (product: Product) => void
  onRestore: (product: Product) => void
}

export function ProductRowActions({ product, isRestoring, onArchive, onRestore }: ProductRowActionsProps) {
  return (
    <div className="flex justify-end gap-2">
      <ButtonLink to={`/admin/products/${product.id}/edit`} variant="ghost" className="px-3 py-1.5">
        <Pencil aria-hidden="true" className="size-3.5" />
        Edit
      </ButtonLink>
      {product.status === 'ACTIVE' ? (
        <Button
          variant="ghost"
          className="px-3 py-1.5 text-amber-700 hover:bg-amber-50 hover:text-amber-800"
          onClick={() => onArchive(product)}
        >
          <Archive aria-hidden="true" className="size-3.5" />
          Archive
        </Button>
      ) : (
        <Button
          variant="ghost"
          className="px-3 py-1.5 text-green-700 hover:bg-green-50 hover:text-green-800"
          isLoading={isRestoring}
          onClick={() => onRestore(product)}
        >
          <ArchiveRestore aria-hidden="true" className="size-3.5" />
          Restore
        </Button>
      )}
    </div>
  )
}
