import { z } from 'zod'
import type { Product, ProductInput } from '../types'

const SKU_PATTERN = /^[A-Za-z0-9._-]+$/
const PRICE_PATTERN = /^\d{1,10}([.,]\d{1,2})?$/

function normalizePrice(value: string): string {
  return value.trim().replace(',', '.')
}

export const productSchema = z.object({
  sku: z
    .string()
    .trim()
    .min(1, 'SKU is required')
    .max(50, 'SKU must be 50 characters or less')
    .regex(SKU_PATTERN, 'Use only letters, digits, dots, dashes and underscores'),
  name: z.string().trim().min(1, 'Name is required').max(200, 'Name must be 200 characters or less'),
  description: z.string().trim().max(5000, 'Description must be 5000 characters or less'),
  price: z
    .string()
    .trim()
    .min(1, 'Price is required')
    .regex(PRICE_PATTERN, 'Enter a price like 19.99')
    .refine((value) => Number(normalizePrice(value)) >= 0.01, 'Price must be at least 0.01'),
  categoryId: z.string(),
})

export type ProductFormValues = z.infer<typeof productSchema>

export const productFormFields = ['sku', 'name', 'description', 'price', 'categoryId'] as const

export const emptyProductForm: ProductFormValues = {
  sku: '',
  name: '',
  description: '',
  price: '',
  categoryId: '',
}

export function toProductFormValues(product: Product): ProductFormValues {
  return {
    sku: product.sku,
    name: product.name,
    description: product.description ?? '',
    price: product.price.toFixed(2),
    categoryId: product.categoryId === null ? '' : String(product.categoryId),
  }
}

export function toProductInput(values: ProductFormValues): ProductInput {
  return {
    sku: values.sku,
    name: values.name,
    description: values.description || null,
    price: Number(normalizePrice(values.price)),
    categoryId: values.categoryId === '' ? null : Number(values.categoryId),
  }
}
