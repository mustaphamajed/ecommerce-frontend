import { useEffect, useRef, type ReactNode } from 'react'

type DialogProps = {
  open: boolean
  title: string
  description?: ReactNode
  onClose: () => void
  children: ReactNode
}

export function Dialog({ open, title, description, onClose, children }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (open && dialog && !dialog.open) {
      dialog.showModal()
    }
    if (!open && dialog?.open) {
      dialog.close()
    }
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      className="m-auto w-full max-w-lg rounded-2xl bg-white p-0 shadow-xl backdrop:bg-slate-900/40"
    >
      <div className="flex flex-col gap-5 p-6">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          {description && <div className="mt-1 text-sm text-slate-500">{description}</div>}
        </div>
        {open && children}
      </div>
    </dialog>
  )
}
