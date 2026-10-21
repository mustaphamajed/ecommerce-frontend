import { useSyncExternalStore } from 'react'
import { toastStore } from '@/lib/toast/toastStore'
import { ToastItem } from './ToastItem'

export function Toaster() {
  const toasts = useSyncExternalStore(toastStore.subscribe, toastStore.getSnapshot)

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex flex-col items-center gap-2 p-4 sm:items-end sm:p-6"
    >
      <div className="flex w-full max-w-sm flex-col gap-2">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={toastStore.dismiss} />
        ))}
      </div>
    </div>
  )
}
