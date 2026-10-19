export type ApiErrorItem = {
  title: string
  detail: string
  code: string
  property: string | null
}

export class ApiError extends Error {
  readonly status: number
  readonly errors: ApiErrorItem[]

  constructor(status: number, errors: ApiErrorItem[]) {
    super(errors[0]?.detail ?? `Request failed with status ${status}`)
    this.name = 'ApiError'
    this.status = status
    this.errors = errors
  }

  static async fromResponse(response: Response): Promise<ApiError> {
    const body = (await response.json().catch(() => null)) as { errors?: ApiErrorItem[] } | null
    return new ApiError(response.status, body?.errors ?? [])
  }

  hasCode(code: string): boolean {
    return this.errors.some((error) => error.code === code)
  }

  fieldErrors(): Record<string, string> {
    return Object.fromEntries(
      this.errors
        .filter((error) => error.property !== null)
        .map((error) => [error.property as string, error.detail]),
    )
  }
}
