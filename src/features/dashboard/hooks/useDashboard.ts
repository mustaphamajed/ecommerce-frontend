import { useQuery } from '@tanstack/react-query'
import { dashboardApi, dashboardKeys } from '../api/dashboardApi'

export function useDashboard() {
  return useQuery({
    queryKey: dashboardKeys.all,
    queryFn: ({ signal }) => dashboardApi.get(signal),
    refetchInterval: 60_000,
  })
}
