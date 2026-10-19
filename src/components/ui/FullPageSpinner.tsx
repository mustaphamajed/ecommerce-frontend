import { Spinner } from './Spinner'

export function FullPageSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center text-indigo-600">
      <Spinner className="size-8" />
    </div>
  )
}
