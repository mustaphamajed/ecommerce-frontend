import { z } from 'zod'
import type { Category, CategoryInput } from '../types'

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/

export const categorySchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be 100 characters or less'),
  slug: z
    .string()
    .trim()
    .max(120, 'Slug must be 120 characters or less')
    .refine((value) => value === '' || SLUG_PATTERN.test(value), {
      message: 'Use only lowercase letters, digits and single dashes',
    }),
  description: z.string().trim().max(1000, 'Description must be 1000 characters or less'),
})

export type CategoryFormValues = z.infer<typeof categorySchema>

export const categoryFormFields = ['name', 'slug', 'description'] as const

export const emptyCategoryForm: CategoryFormValues = { name: '', slug: '', description: '' }

export function toCategoryFormValues(category: Category): CategoryFormValues {
  return { name: category.name, slug: category.slug, description: category.description ?? '' }
}

export function toCategoryInput(values: CategoryFormValues): CategoryInput {
  return {
    name: values.name,
    slug: values.slug || null,
    description: values.description || null,
  }
}
