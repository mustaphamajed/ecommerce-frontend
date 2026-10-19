import { tableFeatures, type ColumnDef, type RowData } from '@tanstack/react-table'

export const coreTableFeatures = tableFeatures({})

export type CoreTableFeatures = typeof coreTableFeatures

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TableColumns<TData extends RowData> = Array<ColumnDef<CoreTableFeatures, TData, any>>
