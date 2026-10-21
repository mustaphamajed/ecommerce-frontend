import { zodResolver } from '@hookform/resolvers/zod'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Alert, Button, ButtonLink, TextAreaField, TextField } from '@/components/ui'
import { applyServerErrors } from '@/lib/forms/applyServerErrors'
import { useUnsavedChanges } from '@/lib/forms/useUnsavedChanges'
import { useSaveShortcut } from '@/lib/hooks/useSaveShortcut'
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
    formState: { errors, isSubmitting, isDirty },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues,
  })
  const formRef = useRef<HTMLFormElement>(null)
  useUnsavedChanges(isDirty && !isSubmitting)
  useSaveShortcut(formRef)

  const submit = handleSubmit(async (values) => {
    try {
      await onSubmit(values)
    } catch (error) {
      applyServerErrors(error, setError, categoryFormFields)
    }
  })

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={submit}
      className="flex max-w-2xl flex-col gap-5 rounded-xl border border-slate-200 bg-white p-6 shadow-card"
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
