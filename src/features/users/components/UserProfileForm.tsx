import { zodResolver } from '@hookform/resolvers/zod'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Alert, Button, TextField } from '@/components/ui'
import { applyServerErrors } from '@/lib/forms/applyServerErrors'
import { useUnsavedChanges } from '@/lib/forms/useUnsavedChanges'
import { useSaveShortcut } from '@/lib/hooks/useSaveShortcut'
import {
  toUserProfileFormValues,
  userProfileFormFields,
  userProfileSchema,
  type UserProfileFormValues,
} from '../schemas/userProfileSchema'
import type { User } from '../types'

type UserProfileFormProps = {
  user: User
  onSubmit: (values: UserProfileFormValues) => Promise<unknown>
}

export function UserProfileForm({ user, onSubmit }: UserProfileFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: toUserProfileFormValues(user),
  })
  const formRef = useRef<HTMLFormElement>(null)
  useUnsavedChanges(isDirty && !isSubmitting)
  useSaveShortcut(formRef)

  const submit = handleSubmit(async (values) => {
    try {
      await onSubmit(values)
      reset(values)
    } catch (error) {
      applyServerErrors(error, setError, userProfileFormFields)
    }
  })

  return (
    <form ref={formRef} noValidate onSubmit={submit} className="flex flex-col gap-5">
      {errors.root?.server && <Alert>{errors.root.server.message}</Alert>}
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="First name" error={errors.firstName?.message} {...register('firstName')} />
        <TextField label="Last name" error={errors.lastName?.message} {...register('lastName')} />
      </div>
      <TextField label="Email" type="email" autoComplete="off" error={errors.email?.message} {...register('email')} />
      <div className="flex justify-end">
        <Button type="submit" isLoading={isSubmitting} disabled={!isDirty}>
          Save profile
        </Button>
      </div>
    </form>
  )
}
