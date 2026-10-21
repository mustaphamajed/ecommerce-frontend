import { usersApi } from '../api/usersApi'
import type { CreateUserInput } from '../types'
import { useUserMutation } from './useUserMutation'

export function useCreateUser() {
  return useUserMutation((input: CreateUserInput) => usersApi.create(input))
}
