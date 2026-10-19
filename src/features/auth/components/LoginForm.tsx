import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Alert, Button, TextField } from '@/components/ui'
import { useAuth } from '../context/useAuth'
import { loginSchema, type LoginFormValues } from '../schemas/loginSchema'
import { loginErrorMessage } from '../utils/loginErrorMessage'

export function LoginForm() {
  const { login } = useAuth()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      await login(email, password)
    } catch (error) {
      setError('root.server', { message: loginErrorMessage(error) })
    }
  })

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-5">
      {errors.root?.server && <Alert>{errors.root.server.message}</Alert>}
      <TextField
        label="Email"
        type="email"
        autoComplete="email"
        autoFocus
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register('email')}
      />
      <TextField
        label="Password"
        type="password"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register('password')}
      />
      <Button type="submit" isLoading={isSubmitting} className="w-full">
        Log in
      </Button>
    </form>
  )
}
