import { z } from 'zod'
import type { User } from '../types'
import { emailField, nameField } from './userFields'

export const userProfileSchema = z.object({
  firstName: nameField('First name'),
  lastName: nameField('Last name'),
  email: emailField,
})

export type UserProfileFormValues = z.infer<typeof userProfileSchema>

export const userProfileFormFields = ['firstName', 'lastName', 'email'] as const

export function toUserProfileFormValues(user: User): UserProfileFormValues {
  return { firstName: user.firstName, lastName: user.lastName, email: user.email }
}
