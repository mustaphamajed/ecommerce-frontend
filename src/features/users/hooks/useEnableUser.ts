import { usersApi } from '../api/usersApi'
import { useUserMutation } from './useUserMutation'

export function useEnableUser() {
  return useUserMutation((id: number) => usersApi.enable(id))
}
