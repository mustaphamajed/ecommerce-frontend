import { createColumnHelper } from '@tanstack/react-table'
import { useMemo } from 'react'
import { DataTable, ImageThumbnail, SortableHeader } from '@/components/ui'
import { formatDate, formatPrice } from '@/lib/format'
import type { SortState } from '@/lib/hooks/useListParams'
import type { CoreTableFeatures } from '@/lib/table'
import type { Product } from '../types'
import { ProductRowActions } from './ProductRowActions'
import { ProductStatusBadge } from './ProductStatusBadge'

type ProductsTableProps = {
  products: Product[]
  sort: SortState | null
  canWrite: boolean
  restoringProductId: number | null
  onSort: (field: string) => void
  onArchive: (product: Product) => void
  onRestore: (product: Product) => void
}

const columnHelper = createColumnHelper<CoreTableFeatures, Product>()

export function ProductsTable({
  products,
  sort,
  canWrite,
  restoringProductId,
  onSort,
  onArchive,
  onRestore,
}: ProductsTableProps) {
  const columns = useMemo(
    () =>
      columnHelper.columns([
        columnHelper.accessor('name', {
          header: () => <SortableHeader label="Product" field="name" sort={sort} onSort={onSort} />,
          cell: ({ row }) => (
            <div className="flex items-center gap-3">
              <ImageThumbnail src={row.original.imageUrl} alt={row.original.name} className="size-10 rounded-lg" />
              <div>
                <p className="font-medium text-slate-900">{row.original.name}</p>
                <p className="text-xs text-slate-400">{row.original.sku}</p>
              </div>
            </div>
          ),
        }),
        columnHelper.accessor('categoryName', {
          header: 'Category',
          cell: ({ getValue }) => <span className="text-slate-500">{getValue() ?? '—'}</span>,
        }),
        columnHelper.accessor('price', {
          header: () => <SortableHeader label="Price" field="price" sort={sort} onSort={onSort} />,
          cell: ({ getValue }) => <span className="font-medium whitespace-nowrap">{formatPrice(getValue())}</span>,
        }),
        columnHelper.accessor('status', {
          header: 'Status',
          cell: ({ getValue }) => <ProductStatusBadge status={getValue()} />,
        }),
        columnHelper.accessor('updatedAt', {
          header: () => <SortableHeader label="Updated" field="updatedAt" sort={sort} onSort={onSort} />,
          cell: ({ getValue }) => <span className="whitespace-nowrap">{formatDate(getValue())}</span>,
        }),
        ...(canWrite
          ? [
              columnHelper.display({
                id: 'actions',
                header: () => <span className="sr-only">Actions</span>,
                cell: ({ row }) => (
                  <ProductRowActions
                    product={row.original}
                    isRestoring={restoringProductId === row.original.id}
                    onArchive={onArchive}
                    onRestore={onRestore}
                  />
                ),
              }),
            ]
          : []),
      ]),
    [sort, canWrite, restoringProductId, onSort, onArchive, onRestore],
  )

  return <DataTable columns={columns} data={products} getRowId={(product) => String(product.id)} />
}
