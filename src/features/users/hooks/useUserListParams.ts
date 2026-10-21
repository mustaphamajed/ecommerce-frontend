import { useListParams } from '@/lib/hooks/useListParams'
import type { UserStatusFilter } from '../types'

const STATUSES: UserStatusFilter[] = ['active', 'disabled']

export function useUserListParams() {
  const params = useListParams({ field: 'createdAt', direction: 'desc' })
  const rawStatus = params.get('status')
  const status: UserStatusFilter = STATUSES.find((value) => value === rawStatus) ?? ''

  return {
    ...params,
    status,
    hasFilters: params.query !== '' || status !== '',
    setStatus: (value: UserStatusFilter) => params.update({ status: value || null }),
  }
}
