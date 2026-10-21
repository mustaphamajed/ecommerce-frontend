import { useEffect, useState } from 'react'
import { unsavedChangesStore } from './unsavedChangesStore'

export function useUnsavedChanges(hasChanges: boolean) {
  const [formId] = useState(() => Symbol('form'))

  useEffect(() => {
    unsavedChangesStore.setDirty(formId, hasChanges)
    return () => unsavedChangesStore.setDirty(formId, false)
  }, [formId, hasChanges])
}
