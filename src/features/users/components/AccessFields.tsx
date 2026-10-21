import { CheckboxGroupField } from '@/components/ui'
import type { Role, Warehouse } from '../types'
import { toRoleOptions, toWarehouseOptions } from '../utils/accessOptions'

type AccessFieldsProps = {
  roles: Role[]
  warehouses: Warehouse[]
  roleIds: number[]
  warehouseIds: number[]
  onRoleIdsChange: (roleIds: number[]) => void
  onWarehouseIdsChange: (warehouseIds: number[]) => void
  roleError?: string
  warehouseError?: string
}

export function AccessFields({
  roles,
  warehouses,
  roleIds,
  warehouseIds,
  onRoleIdsChange,
  onWarehouseIdsChange,
  roleError,
  warehouseError,
}: AccessFieldsProps) {
  return (
    <>
      <CheckboxGroupField
        legend="Roles"
        options={toRoleOptions(roles)}
        value={roleIds}
        onChange={onRoleIdsChange}
        error={roleError}
      />
      <CheckboxGroupField
        legend="Warehouses"
        options={toWarehouseOptions(warehouses)}
        value={warehouseIds}
        onChange={onWarehouseIdsChange}
        error={warehouseError}
        hint="Stock managers can only adjust stock in these warehouses."
      />
    </>
  )
}
