import { Badge, ImageThumbnail } from '@/components/ui'
import { cn } from '@/lib/cn'
import { formatPrice } from '@/lib/format'
import type { CatalogProduct } from '../types'

type ProductCardProps = {
  product: CatalogProduct
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative">
        <ImageThumbnail
          src={product.imageUrl}
          alt={product.name}
          className={cn('aspect-4/3 text-4xl', !product.inStock && 'opacity-60 grayscale')}
        />
        {!product.inStock && (
          <div className="absolute top-3 left-3">
            <Badge variant="red">Out of stock</Badge>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        {product.categoryName && (
          <span className="w-fit rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">
            {product.categoryName}
          </span>
        )}
        <h3 className="font-medium text-slate-900">{product.name}</h3>
        {product.description && <p className="line-clamp-2 text-sm text-slate-500">{product.description}</p>}
        <div className="mt-auto flex items-end justify-between pt-2">
          <span className="text-lg font-semibold">{formatPrice(product.price)}</span>
          <span className="text-xs text-slate-400">{product.sku}</span>
        </div>
      </div>
    </article>
  )
}
