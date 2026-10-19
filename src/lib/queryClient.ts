import { QueryClient } from '@tanstack/react-query'
import { ApiError } from '@/lib/api'

const MAX_RETRIES = 2

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        const isClientError = error instanceof ApiError && error.status < 500
        return !isClientError && failureCount < MAX_RETRIES
      },
    },
  },
})
