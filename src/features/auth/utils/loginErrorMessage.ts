import { ApiError } from '@/lib/api'

export function loginErrorMessage(error: unknown): string {
  return error instanceof ApiError ? error.message : "Can't reach the server. Check your connection and try again."
}
