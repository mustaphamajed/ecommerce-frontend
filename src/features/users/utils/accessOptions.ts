import type { CheckboxOption } from '@/components/ui'
import type { Role, Warehouse } from '../types'

export function toRoleOptions(roles: Role[]): CheckboxOption[] {
  return roles.map((role) => ({ value: role.id, label: role.name, description: role.description ?? undefined }))
}

export function toWarehouseOptions(warehouses: Warehouse[]): CheckboxOption[] {
  return warehouses.map((warehouse) => ({ value: warehouse.id, label: warehouse.code, description: warehouse.name }))
}
