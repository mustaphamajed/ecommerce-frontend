export type ToastVariant = 'success' | 'error' | 'info'

export type Toast = {
  id: number
  variant: ToastVariant
  title: string
  description?: string
}

type Listener = () => void

const AUTO_DISMISS_MS = { success: 4_000, info: 4_000, error: 7_000 } as const
const MAX_TOASTS = 4

let toasts: Toast[] = []
let nextId = 1
const listeners = new Set<Listener>()

function emit() {
  for (const listener of listeners) {
    listener()
  }
}

function dismiss(id: number) {
  toasts = toasts.filter((toast) => toast.id !== id)
  emit()
}

function show(variant: ToastVariant, title: string, description?: string) {
  const id = nextId++
  toasts = [...toasts, { id, variant, title, description }].slice(-MAX_TOASTS)
  emit()
  setTimeout(() => dismiss(id), AUTO_DISMISS_MS[variant])
  return id
}

export const toastStore = {
  subscribe: (listener: Listener) => {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
  getSnapshot: () => toasts,
  dismiss,
}

export const toast = {
  success: (title: string, description?: string) => show('success', title, description),
  error: (title: string, description?: string) => show('error', title, description),
  info: (title: string, description?: string) => show('info', title, description),
}
