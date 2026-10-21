import { z } from 'zod'
import type { Permission } from '@/features/auth'
import type { Role, RoleInput } from '../types'

const ROLE_NAME_PATTERN = /^[A-Za-z][A-Za-z0-9 _-]*$/

export const roleSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(50, 'Name must be 50 characters or less')
    .regex(ROLE_NAME_PATTERN, 'Start with a letter, then use letters, digits, spaces, dashes or underscores'),
  description: z.string().trim().max(500, 'Description must be 500 characters or less'),
  permissions: z.array(z.custom<Permission>()).min(1, 'Select at least one permission'),
})

export type RoleFormValues = z.infer<typeof roleSchema>

export const roleFormFields = ['name', 'description', 'permissions'] as const

export const emptyRoleForm: RoleFormValues = { name: '', description: '', permissions: [] }

export function normalizeRoleName(name: string): string {
  return name.trim().replace(/[\s-]+/g, '_').toUpperCase()
}

export function toRoleFormValues(role: Role): RoleFormValues {
  return { name: role.name, description: role.description ?? '', permissions: role.permissions }
}

export function toRoleInput(values: RoleFormValues): RoleInput {
  return { name: values.name, description: values.description || null, permissions: values.permissions }
}
