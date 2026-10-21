import { MutationCache, QueryClient } from '@tanstack/react-query'
import { ApiError } from '@/lib/api'
import '@/lib/toast/mutationToastMeta'
import { toast } from '@/lib/toast/toastStore'

const MAX_RETRIES = 2
const NETWORK_ERROR_MESSAGE = "Can't reach the server. Check your connection and try again."

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (mutation.meta?.errorToast) {
        toast.error(error instanceof ApiError ? error.message : NETWORK_ERROR_MESSAGE)
      }
    },
  }),
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
