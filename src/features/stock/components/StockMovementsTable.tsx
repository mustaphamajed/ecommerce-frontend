import { createColumnHelper } from '@tanstack/react-table'
import { DataTable } from '@/components/ui'
import { formatDateTime } from '@/lib/format'
import type { CoreTableFeatures } from '@/lib/table'
import { reasonLabels } from '../schemas/adjustStockSchema'
import type { StockMovement } from '../types'
import { MovementChange } from './MovementChange'

type StockMovementsTableProps = {
  movements: StockMovement[]
}

const columnHelper = createColumnHelper<CoreTableFeatures, StockMovement>()

const columns = columnHelper.columns([
  columnHelper.accessor('createdAt', {
    header: 'Date',
    cell: ({ getValue }) => <span className="whitespace-nowrap text-slate-500">{formatDateTime(getValue())}</span>,
  }),
  columnHelper.accessor('productName', {
    header: 'Product',
    cell: ({ row }) => (
      <div>
        <p className="font-medium text-slate-900">{row.original.productName}</p>
        <p className="text-xs text-slate-400">{row.original.sku}</p>
      </div>
    ),
  }),
  columnHelper.accessor('quantityChange', {
    header: 'Change',
    cell: ({ getValue }) => <MovementChange change={getValue()} />,
  }),
  columnHelper.accessor('reason', {
    header: 'Reason',
    cell: ({ getValue }) => reasonLabels[getValue()],
  }),
  columnHelper.accessor('note', {
    header: 'Note',
    cell: ({ getValue }) => <p className="line-clamp-2 max-w-xs text-slate-500">{getValue() ?? '—'}</p>,
  }),
  columnHelper.accessor('createdBy', {
    header: 'By',
    cell: ({ getValue }) => <span className="whitespace-nowrap">{getValue() ?? '—'}</span>,
  }),
])

export function StockMovementsTable({ movements }: StockMovementsTableProps) {
  return <DataTable columns={columns} data={movements} getRowId={(movement) => String(movement.id)} />
}
