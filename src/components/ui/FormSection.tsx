import type { ReactNode } from 'react'

type FormSectionProps = {
  title: string
  description?: string
  children: ReactNode
}

export function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <section className="max-w-2xl rounded-xl border border-slate-200 bg-white shadow-xs">
      <div className="border-b border-slate-100 px-6 py-4">
        <h2 className="text-base font-semibold">{title}</h2>
        {description && <p className="mt-0.5 text-sm text-slate-500">{description}</p>}
      </div>
      <div className="p-6">{children}</div>
    </section>
  )
}
