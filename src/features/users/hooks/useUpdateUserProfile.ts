import { usersApi } from '../api/usersApi'
import type { UserProfileInput } from '../types'
import { useUserMutation } from './useUserMutation'

export function useUpdateUserProfile(id: number) {
  return useUserMutation((input: UserProfileInput) => usersApi.updateProfile(id, input))
}
