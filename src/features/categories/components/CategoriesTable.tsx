import { createColumnHelper } from '@tanstack/react-table'
import { useMemo } from 'react'
import { DataTable, SortableHeader } from '@/components/ui'
import { formatDate } from '@/lib/format'
import type { SortState } from '@/lib/hooks/useListParams'
import type { CoreTableFeatures } from '@/lib/table'
import type { Category } from '../types'
import { CategoryRowActions } from './CategoryRowActions'

type CategoriesTableProps = {
  categories: Category[]
  sort: SortState | null
  canWrite: boolean
  onSort: (field: string) => void
  onDelete: (category: Category) => void
}

const columnHelper = createColumnHelper<CoreTableFeatures, Category>()

export function CategoriesTable({ categories, sort, canWrite, onSort, onDelete }: CategoriesTableProps) {
  const columns = useMemo(
    () =>
      columnHelper.columns([
        columnHelper.accessor('name', {
          header: () => <SortableHeader label="Name" field="name" sort={sort} onSort={onSort} />,
          cell: ({ row }) => (
            <div>
              <p className="font-medium text-slate-900">{row.original.name}</p>
              <p className="text-xs text-slate-400">/{row.original.slug}</p>
            </div>
          ),
        }),
        columnHelper.accessor('description', {
          header: 'Description',
          cell: ({ getValue }) => <p className="line-clamp-2 max-w-md text-slate-500">{getValue() ?? '—'}</p>,
        }),
        columnHelper.accessor('productCount', {
          header: 'Products',
          cell: ({ getValue }) => (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium">{getValue()}</span>
          ),
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
                cell: ({ row }) => <CategoryRowActions category={row.original} onDelete={onDelete} />,
              }),
            ]
          : []),
      ]),
    [sort, canWrite, onSort, onDelete],
  )

  return <DataTable columns={columns} data={categories} getRowId={(category) => String(category.id)} />
}
