import { zodResolver } from '@hookform/resolvers/zod'
import { useController, useForm, useWatch } from 'react-hook-form'
import { Alert, Button, ButtonLink, TextAreaField, TextField } from '@/components/ui'
import type { Permission } from '@/features/auth'
import { applyServerErrors } from '@/lib/forms/applyServerErrors'
import { normalizeRoleName, roleFormFields, roleSchema, type RoleFormValues } from '../schemas/roleSchema'
import { PermissionGrid } from './PermissionGrid'

type RoleFormProps = {
  defaultValues: RoleFormValues
  availablePermissions: Permission[]
  builtIn: boolean
  lockedPermissions: Permission[]
  submitLabel: string
  onSubmit: (values: RoleFormValues) => Promise<unknown>
}

export function RoleForm({
  defaultValues,
  availablePermissions,
  builtIn,
  lockedPermissions,
  submitLabel,
  onSubmit,
}: RoleFormProps) {
  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RoleFormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues,
  })
  const permissions = useController({ control, name: 'permissions' })
  const name = useWatch({ control, name: 'name' })
  const savedName = normalizeRoleName(name ?? '')

  const submit = handleSubmit(async (values) => {
    try {
      await onSubmit(values)
    } catch (error) {
      applyServerErrors(error, setError, roleFormFields)
    }
  })

  return (
    <form
      noValidate
      onSubmit={submit}
      className="flex max-w-3xl flex-col gap-5 rounded-xl border border-slate-200 bg-white p-6 shadow-xs"
    >
      {errors.root?.server && <Alert>{errors.root.server.message}</Alert>}
      <TextField
        label="Name"
        autoFocus={!builtIn}
        readOnly={builtIn}
        placeholder="Customer support"
        hint={nameHint(builtIn, name ?? '', savedName)}
        error={errors.name?.message}
        className={builtIn ? 'bg-slate-50 text-slate-500' : undefined}
        {...register('name')}
      />
      <TextAreaField label="Description" rows={2} error={errors.description?.message} {...register('description')} />
      <PermissionGrid
        available={availablePermissions}
        value={permissions.field.value}
        locked={lockedPermissions}
        onChange={permissions.field.onChange}
        error={errors.permissions?.message}
      />
      <div className="flex justify-end gap-2 border-t border-slate-100 pt-5">
        <ButtonLink to="/admin/roles" variant="secondary">
          Cancel
        </ButtonLink>
        <Button type="submit" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}

function nameHint(builtIn: boolean, typedName: string, savedName: string): string | undefined {
  if (builtIn) {
    return 'Built-in roles keep their name.'
  }
  return savedName && savedName !== typedName ? `Will be saved as ${savedName}` : undefined
}
