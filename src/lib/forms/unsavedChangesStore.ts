type Listener = () => void

const dirtyForms = new Set<symbol>()
const listeners = new Set<Listener>()
let hasUnsavedChanges = false

function setDirty(formId: symbol, dirty: boolean) {
  if (dirty) {
    dirtyForms.add(formId)
  } else {
    dirtyForms.delete(formId)
  }
  hasUnsavedChanges = dirtyForms.size > 0
  for (const listener of listeners) {
    listener()
  }
}

export const unsavedChangesStore = {
  subscribe: (listener: Listener) => {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
  getSnapshot: () => hasUnsavedChanges,
  setDirty,
}
