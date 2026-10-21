import { useMutation } from '@tanstack/react-query'
import { usersApi } from '../api/usersApi'

export function useResetUserPassword(id: number) {
  return useMutation({
    mutationFn: (password: string) => usersApi.resetPassword(id, password),
  })
}
