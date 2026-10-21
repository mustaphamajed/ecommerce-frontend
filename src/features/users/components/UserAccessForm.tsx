import { zodResolver } from '@hookform/resolvers/zod'
import { useController, useForm } from 'react-hook-form'
import { Alert, Button } from '@/components/ui'
import { applyServerErrors } from '@/lib/forms/applyServerErrors'
import {
  toUserAccessFormValues,
  userAccessFormFields,
  userAccessSchema,
  type UserAccessFormValues,
} from '../schemas/userAccessSchema'
import type { Role, User, Warehouse } from '../types'
import { AccessFields } from './AccessFields'

type UserAccessFormProps = {
  user: User
  roles: Role[]
  warehouses: Warehouse[]
  onSubmit: (values: UserAccessFormValues) => Promise<unknown>
}

export function UserAccessForm({ user, roles, warehouses, onSubmit }: UserAccessFormProps) {
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<UserAccessFormValues>({
    resolver: zodResolver(userAccessSchema),
    defaultValues: toUserAccessFormValues(user),
  })
  const roleIds = useController({ control, name: 'roleIds' })
  const warehouseIds = useController({ control, name: 'warehouseIds' })

  const submit = handleSubmit(async (values) => {
    try {
      await onSubmit(values)
      reset(values)
    } catch (error) {
      applyServerErrors(error, setError, userAccessFormFields)
    }
  })

  return (
    <form noValidate onSubmit={submit} className="flex flex-col gap-5">
      {errors.root?.server && <Alert>{errors.root.server.message}</Alert>}
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
      <div className="flex justify-end">
        <Button type="submit" isLoading={isSubmitting} disabled={!isDirty}>
          Save access
        </Button>
      </div>
    </form>
  )
}
