import { createColumnHelper } from '@tanstack/react-table'
import { useMemo } from 'react'
import { DataTable, SortableHeader } from '@/components/ui'
import { formatDate } from '@/lib/format'
import type { SortState } from '@/lib/hooks/useListParams'
import type { CoreTableFeatures } from '@/lib/table'
import type { StockLevel } from '../types'
import { StockLevelActions } from './StockLevelActions'
import { StockQuantityBadge } from './StockQuantityBadge'

type StockLevelsTableProps = {
  levels: StockLevel[]
  sort: SortState | null
  canAdjust: boolean
  onSort: (field: string) => void
  onShowHistory: (level: StockLevel) => void
  onAdjust: (level: StockLevel) => void
}

const columnHelper = createColumnHelper<CoreTableFeatures, StockLevel>()

export function StockLevelsTable({ levels, sort, canAdjust, onSort, onShowHistory, onAdjust }: StockLevelsTableProps) {
  const columns = useMemo(
    () =>
      columnHelper.columns([
        columnHelper.accessor('productName', {
          header: () => <SortableHeader label="Product" field="name" sort={sort} onSort={onSort} />,
          cell: ({ row }) => (
            <div>
              <p className="font-medium text-slate-900">{row.original.productName}</p>
              <p className="text-xs text-slate-400">{row.original.sku}</p>
            </div>
          ),
        }),
        columnHelper.accessor('categoryName', {
          header: 'Category',
          cell: ({ getValue }) => <span className="text-slate-500">{getValue() ?? '—'}</span>,
        }),
        columnHelper.accessor('quantity', {
          header: () => <SortableHeader label="Quantity" field="quantity" sort={sort} onSort={onSort} />,
          cell: ({ getValue }) => <StockQuantityBadge quantity={getValue()} />,
        }),
        columnHelper.accessor('updatedAt', {
          header: 'Last change',
          cell: ({ getValue }) => {
            const updatedAt = getValue()
            return <span className="whitespace-nowrap text-slate-500">{updatedAt ? formatDate(updatedAt) : '—'}</span>
          },
        }),
        columnHelper.display({
          id: 'actions',
          header: () => <span className="sr-only">Actions</span>,
          cell: ({ row }) => (
            <StockLevelActions
              level={row.original}
              canAdjust={canAdjust}
              onShowHistory={onShowHistory}
              onAdjust={onAdjust}
            />
          ),
        }),
      ]),
    [sort, canAdjust, onSort, onShowHistory, onAdjust],
  )

  return <DataTable columns={columns} data={levels} getRowId={(level) => String(level.productId)} />
}
