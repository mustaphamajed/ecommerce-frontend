import { useCallback, useEffect, useMemo, useRef } from 'react'

type Timeout = ReturnType<typeof setTimeout>

export function useDebouncedCallback<TArgs extends unknown[]>(callback: (...args: TArgs) => void, delayMs: number) {
  const callbackRef = useRef(callback)
  const timeoutRef = useRef<Timeout | undefined>(undefined)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const cancel = useCallback(() => clearTimeout(timeoutRef.current), [])

  useEffect(() => cancel, [cancel])

  return useMemo(
    () => ({
      run: (...args: TArgs) => {
        cancel()
        timeoutRef.current = setTimeout(() => callbackRef.current(...args), delayMs)
      },
      cancel,
    }),
    [cancel, delayMs],
  )
}
