import { zodResolver } from '@hookform/resolvers/zod'
import { useRef } from 'react'
import { useController, useForm } from 'react-hook-form'
import { Alert, Button, ButtonLink, TextField } from '@/components/ui'
import { applyServerErrors } from '@/lib/forms/applyServerErrors'
import { useUnsavedChanges } from '@/lib/forms/useUnsavedChanges'
import { useSaveShortcut } from '@/lib/hooks/useSaveShortcut'
import {
  createUserFormFields,
  createUserSchema,
  emptyCreateUserForm,
  type CreateUserFormValues,
} from '../schemas/createUserSchema'
import type { Role, Warehouse } from '../types'
import { AccessFields } from './AccessFields'

type CreateUserFormProps = {
  roles: Role[]
  warehouses: Warehouse[]
  onSubmit: (values: CreateUserFormValues) => Promise<unknown>
}

export function CreateUserForm({ roles, warehouses, onSubmit }: CreateUserFormProps) {
  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: emptyCreateUserForm,
  })
  const formRef = useRef<HTMLFormElement>(null)
  useUnsavedChanges(isDirty && !isSubmitting)
  useSaveShortcut(formRef)
  const roleIds = useController({ control, name: 'roleIds' })
  const warehouseIds = useController({ control, name: 'warehouseIds' })

  const submit = handleSubmit(async (values) => {
    try {
      await onSubmit(values)
    } catch (error) {
      applyServerErrors(error, setError, createUserFormFields)
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
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="First name" autoFocus error={errors.firstName?.message} {...register('firstName')} />
        <TextField label="Last name" error={errors.lastName?.message} {...register('lastName')} />
      </div>
      <TextField label="Email" type="email" autoComplete="off" error={errors.email?.message} {...register('email')} />
      <TextField
        label="Password"
        type="password"
        autoComplete="new-password"
        hint="At least 8 characters. Share it with the user securely."
        error={errors.password?.message}
        {...register('password')}
      />
      <AccessFields
        roles={roles}
        warehouses={warehouses}
        roleIds={roleIds.field.value}
        warehouseIds={warehouseIds.field.value}
        onRoleIdsChange={roleIds.field.onChange}
        onWarehouseIdsChange={warehouseIds.field.onChange}
        roleError={errors.roleIds?.message}
        warehouseError={errors.warehouseIds?.message}
      />
      <div className="flex justify-end gap-2 border-t border-slate-100 pt-5">
        <ButtonLink to="/admin/users" variant="secondary">
          Cancel
        </ButtonLink>
        <Button type="submit" isLoading={isSubmitting}>
          Create user
        </Button>
      </div>
    </form>
  )
}
