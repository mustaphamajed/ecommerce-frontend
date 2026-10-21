import { MutationCache, QueryClient } from '@tanstack/react-query'
import { ApiError } from '@/lib/api'
import '@/lib/toast/mutationToastMeta'
import { toast } from '@/lib/toast/toastStore'

const MAX_RETRIES = 2

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _context, mutation) => {
      if (mutation.meta?.successMessage) {
        toast.success(mutation.meta.successMessage)
      }
    },
    onError: (error, _variables, _context, mutation) => {
      if (mutation.meta?.errorMessage) {
        toast.error(mutation.meta.errorMessage, error.message)
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
