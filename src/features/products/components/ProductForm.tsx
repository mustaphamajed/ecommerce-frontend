import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Alert, Button, ButtonLink, SelectField, TextAreaField, TextField } from '@/components/ui'
import { applyServerErrors } from '@/lib/forms/applyServerErrors'
import type { CategoryOption } from '../api/productsApi'
import { productFormFields, productSchema, type ProductFormValues } from '../schemas/productSchema'

type ProductFormProps = {
  defaultValues: ProductFormValues
  categories: CategoryOption[]
  submitLabel: string
  onSubmit: (values: ProductFormValues) => Promise<unknown>
}

export function ProductForm({ defaultValues, categories, submitLabel, onSubmit }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues,
  })

  const submit = handleSubmit(async (values) => {
    try {
      await onSubmit(values)
    } catch (error) {
      applyServerErrors(error, setError, productFormFields)
    }
  })

  return (
    <form
      noValidate
      onSubmit={submit}
      className="flex max-w-2xl flex-col gap-5 rounded-xl border border-slate-200 bg-white p-6 shadow-card"
    >
      {errors.root?.server && <Alert>{errors.root.server.message}</Alert>}
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="SKU"
          autoFocus
          placeholder="SHOE-001"
          hint="Saved in uppercase."
          error={errors.sku?.message}
          {...register('sku')}
        />
        <TextField
          label="Price (€)"
          inputMode="decimal"
          placeholder="19.99"
          error={errors.price?.message}
          {...register('price')}
        />
      </div>
      <TextField label="Name" error={errors.name?.message} {...register('name')} />
      <SelectField label="Category" error={errors.categoryId?.message} {...register('categoryId')}>
        <option value="">No category</option>
        {categories.map((category) => (
          <option key={category.id} value={String(category.id)}>
            {category.name}
          </option>
        ))}
      </SelectField>
      <TextAreaField label="Description" rows={5} error={errors.description?.message} {...register('description')} />
      <div className="flex justify-end gap-2 border-t border-slate-100 pt-5">
        <ButtonLink to="/admin/products" variant="secondary">
          Cancel
        </ButtonLink>
        <Button type="submit" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
