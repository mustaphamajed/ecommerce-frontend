import type { FieldValues, Path, UseFormSetError } from 'react-hook-form'
import { ApiError } from '@/lib/api'

const NETWORK_ERROR_MESSAGE = "Can't reach the server. Check your connection and try again."

export function applyServerErrors<TFieldValues extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<TFieldValues>,
  formFields: ReadonlyArray<Path<TFieldValues>>,
  serverFieldAliases: Readonly<Record<string, Path<TFieldValues>>> = {},
) {
  if (!(error instanceof ApiError)) {
    setError('root.server', { message: NETWORK_ERROR_MESSAGE })
    return
  }

  const toFormField = (property: string | null): string | null =>
    property === null ? null : (serverFieldAliases[property] ?? property)

  const isFormField = (property: string | null): property is Path<TFieldValues> =>
    property !== null && (formFields as ReadonlyArray<string>).includes(property)

  const generalMessages: string[] = []
  for (const item of error.errors) {
    const field = toFormField(item.property)
    if (isFormField(field)) {
      setError(field, { type: 'server', message: item.detail })
    } else {
      generalMessages.push(item.detail)
    }
  }

  if (generalMessages.length > 0 || error.errors.length === 0) {
    setError('root.server', { message: generalMessages.join(' ') || error.message })
  }
}
