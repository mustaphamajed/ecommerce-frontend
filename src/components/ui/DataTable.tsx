import { useTable, type RowData } from '@tanstack/react-table'
import { coreTableFeatures, type TableColumns } from '@/lib/table'

type DataTableProps<TData extends RowData> = {
  columns: TableColumns<TData>
  data: TData[]
  getRowId: (row: TData) => string
}

export function DataTable<TData extends RowData>({ columns, data, getRowId }: DataTableProps<TData>) {
  const table = useTable({ features: coreTableFeatures, columns, data, getRowId: (row) => getRowId(row) })

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-card">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50/80">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-semibold tracking-wide whitespace-nowrap text-slate-500 uppercase"
                >
                  {!header.isPlaceholder && <table.FlexRender header={header} />}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-slate-100">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="transition-colors hover:bg-slate-50/70">
              {row.getAllCells().map((cell) => (
                <td key={cell.id} className="px-4 py-3.5 align-middle text-slate-700">
                  <table.FlexRender cell={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
