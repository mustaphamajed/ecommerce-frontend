import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Alert, Button, ButtonLink, TextAreaField, TextField } from '@/components/ui'
import { applyServerErrors } from '@/lib/forms/applyServerErrors'
import { categoryFormFields, categorySchema, type CategoryFormValues } from '../schemas/categorySchema'

type CategoryFormProps = {
  defaultValues: CategoryFormValues
  submitLabel: string
  slugHint: string
  onSubmit: (values: CategoryFormValues) => Promise<unknown>
}

export function CategoryForm({ defaultValues, submitLabel, slugHint, onSubmit }: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues,
  })

  const submit = handleSubmit(async (values) => {
    try {
      await onSubmit(values)
    } catch (error) {
      applyServerErrors(error, setError, categoryFormFields)
    }
  })

  return (
    <form
      noValidate
      onSubmit={submit}
      className="flex max-w-2xl flex-col gap-5 rounded-xl border border-slate-200 bg-white p-6 shadow-xs"
    >
      {errors.root?.server && <Alert>{errors.root.server.message}</Alert>}
      <TextField label="Name" autoFocus error={errors.name?.message} {...register('name')} />
      <TextField
        label="Slug"
        placeholder="running-shoes"
        hint={slugHint}
        error={errors.slug?.message}
        {...register('slug')}
      />
      <TextAreaField label="Description" error={errors.description?.message} {...register('description')} />
      <div className="flex justify-end gap-2 border-t border-slate-100 pt-5">
        <ButtonLink to="/admin/categories" variant="secondary">
          Cancel
        </ButtonLink>
        <Button type="submit" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
