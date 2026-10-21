import { api } from '@/lib/api'
import type { Dashboard } from '../types'

export const dashboardKeys = {
  all: ['dashboard'] as const,
}

export const dashboardApi = {
  get: (signal?: AbortSignal) => api.get<Dashboard>('/dashboard', { signal }),
}
