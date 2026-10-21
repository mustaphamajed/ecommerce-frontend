import { z } from 'zod'

export const emailField = z
  .string()
  .trim()
  .min(1, 'Email is required')
  .max(255, 'Email must be 255 characters or less')
  .pipe(z.email('Enter a valid email address'))

export const nameField = (label: string) =>
  z.string().trim().min(1, `${label} is required`).max(100, `${label} must be 100 characters or less`)

export const passwordField = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(72, 'Password must be 72 characters or less')

export const roleIdsField = z.array(z.number()).min(1, 'Select at least one role')

export const warehouseIdsField = z.array(z.number())
