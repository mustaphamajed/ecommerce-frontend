import { useEffect, useSyncExternalStore } from 'react'
import { useBlocker } from 'react-router'
import { unsavedChangesStore } from '@/lib/forms/unsavedChangesStore'
import { ConfirmDialog } from './ConfirmDialog'

export function UnsavedChangesGuard() {
  const hasUnsavedChanges = useSyncExternalStore(unsavedChangesStore.subscribe, unsavedChangesStore.getSnapshot)
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) => hasUnsavedChanges && currentLocation.pathname !== nextLocation.pathname,
  )

  useEffect(() => {
    if (!hasUnsavedChanges) {
      return
    }
    const warnBeforeUnload = (event: BeforeUnloadEvent) => event.preventDefault()
    window.addEventListener('beforeunload', warnBeforeUnload)
    return () => window.removeEventListener('beforeunload', warnBeforeUnload)
  }, [hasUnsavedChanges])

  return (
    <ConfirmDialog
      open={blocker.state === 'blocked'}
      title="Leave without saving?"
      description="You have unsaved changes. If you leave this page, they will be lost."
      confirmLabel="Leave page"
      onConfirm={() => blocker.proceed?.()}
      onCancel={() => blocker.reset?.()}
    />
  )
}
