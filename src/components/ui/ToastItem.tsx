import { CircleCheck, CircleX, Info, X } from 'lucide-react'
import type { Toast, ToastVariant } from '@/lib/toast/toastStore'
import { cn } from '@/lib/cn'

type ToastItemProps = {
  toast: Toast
  onDismiss: (id: number) => void
}

const icons = { success: CircleCheck, error: CircleX, info: Info }

const iconClasses: Record<ToastVariant, string> = {
  success: 'text-green-600',
  error: 'text-red-600',
  info: 'text-brand-600',
}

export function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const Icon = icons[toast.variant]

  return (
    <div
      role={toast.variant === 'error' ? 'alert' : 'status'}
      className="pointer-events-auto flex w-full items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-lg ring-1 ring-black/5 animate-in"
    >
      <Icon aria-hidden="true" className={cn('mt-0.5 size-5 shrink-0', iconClasses[toast.variant])} />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-900">{toast.title}</p>
        {toast.description && <p className="mt-0.5 text-sm text-slate-500">{toast.description}</p>}
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        className="-m-1 rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
      >
        <X aria-hidden="true" className="size-4" />
      </button>
    </div>
  )
}
