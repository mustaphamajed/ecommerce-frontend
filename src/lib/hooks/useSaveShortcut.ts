import { useEffect, type RefObject } from 'react'

const SHORTCUT_ATTRIBUTE = 'data-save-shortcut'

export function useSaveShortcut(formRef: RefObject<HTMLFormElement | null>) {
  useEffect(() => {
    const form = formRef.current
    if (!form) {
      return
    }
    form.setAttribute(SHORTCUT_ATTRIBUTE, '')

    const handleKeyDown = (event: KeyboardEvent) => {
      const isSaveShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's'
      if (!isSaveShortcut) {
        return
      }
      event.preventDefault()
      const focusedForm = document.activeElement?.closest('form')
      const isTarget = focusedForm
        ? focusedForm === form
        : document.querySelectorAll(`form[${SHORTCUT_ATTRIBUTE}]`).length === 1
      const submitButton = form.querySelector<HTMLButtonElement>('button[type="submit"]')
      if (isTarget && !event.repeat && !submitButton?.disabled) {
        form.requestSubmit()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      form.removeAttribute(SHORTCUT_ATTRIBUTE)
    }
  }, [formRef])
}
