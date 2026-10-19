import { ApiError } from '@/lib/api'

const messagesByCode: Record<string, string> = {
  INVALID_CREDENTIALS: 'Invalid email or password.',
  ACCOUNT_DISABLED: 'Your account is disabled. Contact an administrator.',
}

export function loginErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    const knownCode = error.errors.find((item) => item.code in messagesByCode)?.code
    return knownCode ? messagesByCode[knownCode] : error.message
  }
  return "Can't reach the server. Check your connection and try again."
}
