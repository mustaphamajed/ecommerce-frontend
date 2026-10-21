import { z } from 'zod'
import { passwordField } from './userFields'

export const resetPasswordSchema = z
  .object({
    password: passwordField,
    confirmPassword: z.string().min(1, 'Confirm the new password'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

export const resetPasswordFormFields = ['password'] as const

export const emptyResetPasswordForm: ResetPasswordFormValues = { password: '', confirmPassword: '' }
