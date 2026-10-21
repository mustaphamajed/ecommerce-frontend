import { usersApi } from '../api/usersApi'
import { useUserMutation } from './useUserMutation'

export function useDisableUser() {
  return useUserMutation((id: number) => usersApi.disable(id))
}
