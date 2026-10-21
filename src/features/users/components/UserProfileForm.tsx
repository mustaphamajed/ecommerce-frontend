import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Alert, Button, TextField } from '@/components/ui'
import { applyServerErrors } from '@/lib/forms/applyServerErrors'
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
    formState: { errors, isSubmitting, isDirty, isSubmitSuccessful },
  } = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: toUserProfileFormValues(user),
  })

  const submit = handleSubmit(async (values) => {
    try {
      await onSubmit(values)
      reset(values, { keepIsSubmitSuccessful: true })
    } catch (error) {
      applyServerErrors(error, setError, userProfileFormFields)
    }
  })

  return (
    <form noValidate onSubmit={submit} className="flex flex-col gap-5">
      {errors.root?.server && <Alert>{errors.root.server.message}</Alert>}
      {isSubmitSuccessful && !isDirty && !errors.root && <Alert variant="success">Profile saved.</Alert>}
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
