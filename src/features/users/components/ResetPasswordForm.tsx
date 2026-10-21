import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Alert, Button, TextField } from '@/components/ui'
import { applyServerErrors } from '@/lib/forms/applyServerErrors'
import {
  emptyResetPasswordForm,
  resetPasswordFormFields,
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from '../schemas/resetPasswordSchema'

type ResetPasswordFormProps = {
  onSubmit: (password: string) => Promise<unknown>
}

export function ResetPasswordForm({ onSubmit }: ResetPasswordFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting, isDirty, isSubmitSuccessful },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: emptyResetPasswordForm,
  })

  const submit = handleSubmit(async ({ password }) => {
    try {
      await onSubmit(password)
      reset(emptyResetPasswordForm, { keepIsSubmitSuccessful: true })
    } catch (error) {
      applyServerErrors(error, setError, resetPasswordFormFields)
    }
  })

  return (
    <form noValidate onSubmit={submit} className="flex flex-col gap-5">
      {errors.root?.server && <Alert>{errors.root.server.message}</Alert>}
      {isSubmitSuccessful && !isDirty && !errors.root && (
        <Alert variant="success">Password changed. Share the new password with the user securely.</Alert>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="New password"
          type="password"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register('password')}
        />
        <TextField
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" variant="secondary" isLoading={isSubmitting} disabled={!isDirty}>
          Reset password
        </Button>
      </div>
    </form>
  )
}
