import { z } from 'zod'
import type { User } from '../types'
import { roleIdsField, warehouseIdsField } from './userFields'

export const userAccessSchema = z.object({
  roleIds: roleIdsField,
  warehouseIds: warehouseIdsField,
})

export type UserAccessFormValues = z.infer<typeof userAccessSchema>

export const userAccessFormFields = ['roleIds', 'warehouseIds'] as const

export function toUserAccessFormValues(user: User): UserAccessFormValues {
  return {
    roleIds: user.roles.map((role) => role.id),
    warehouseIds: user.warehouses.map((warehouse) => warehouse.id),
  }
}
