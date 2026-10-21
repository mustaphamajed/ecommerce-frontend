import { z } from 'zod'
import { emailField, nameField, passwordField, roleIdsField, warehouseIdsField } from './userFields'

export const createUserSchema = z.object({
  firstName: nameField('First name'),
  lastName: nameField('Last name'),
  email: emailField,
  password: passwordField,
  roleIds: roleIdsField,
  warehouseIds: warehouseIdsField,
})

export type CreateUserFormValues = z.infer<typeof createUserSchema>

export const createUserFormFields = ['firstName', 'lastName', 'email', 'password', 'roleIds', 'warehouseIds'] as const

export const emptyCreateUserForm: CreateUserFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  roleIds: [],
  warehouseIds: [],
}
