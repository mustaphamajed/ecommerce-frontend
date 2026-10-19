import { ApiError } from './ApiError'
import { tokenStore } from './tokenStore'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

type QueryValue = string | number | boolean | null | undefined

export type RequestOptions = {
  method?: HttpMethod
  body?: unknown
  query?: Record<string, QueryValue>
  signal?: AbortSignal
  skipAuthRefresh?: boolean
}

const API_BASE = '/api'

let refreshInFlight: Promise<boolean> | null = null
let sessionExpiredHandler: (() => void) | null = null

export function setSessionExpiredHandler(handler: (() => void) | null) {
  sessionExpiredHandler = handler
}

export function refreshAccessToken(): Promise<boolean> {
  refreshInFlight ??= requestNewAccessToken().finally(() => {
    refreshInFlight = null
  })
  return refreshInFlight
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  let response = await send(path, options)

  if (response.status === 401 && !options.skipAuthRefresh) {
    const refreshed = await refreshAccessToken()
    if (refreshed) {
      response = await send(path, options)
    } else {
      sessionExpiredHandler?.()
    }
  }

  if (!response.ok) {
    throw await ApiError.fromResponse(response)
  }
  if (response.status === 204) {
    return undefined as T
  }
  return (await response.json()) as T
}

export const api = {
  get: <T>(path: string, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(path, { ...options, method: 'GET' }),
  post: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(path, { ...options, method: 'POST', body }),
  put: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(path, { ...options, method: 'PUT', body }),
  delete: <T>(path: string, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(path, { ...options, method: 'DELETE' }),
}

async function requestNewAccessToken(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/auth/refresh`, { method: 'POST', credentials: 'include' })
    if (!response.ok) {
      tokenStore.clear()
      return false
    }
    const body = (await response.json()) as { accessToken: string }
    tokenStore.set(body.accessToken)
    return true
  } catch {
    tokenStore.clear()
    return false
  }
}

function send(path: string, options: RequestOptions): Promise<Response> {
  const headers = new Headers({ Accept: 'application/json' })
  const token = tokenStore.get()
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }
  const hasBody = options.body !== undefined
  if (hasBody) {
    headers.set('Content-Type', 'application/json')
  }
  return fetch(buildUrl(path, options.query), {
    method: options.method ?? 'GET',
    headers,
    body: hasBody ? JSON.stringify(options.body) : undefined,
    signal: options.signal,
    credentials: 'include',
  })
}

function buildUrl(path: string, query: Record<string, QueryValue> = {}): string {
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null && value !== '') {
      params.set(key, String(value))
    }
  }
  const queryString = params.toString()
  return `${API_BASE}${path}${queryString ? `?${queryString}` : ''}`
}
