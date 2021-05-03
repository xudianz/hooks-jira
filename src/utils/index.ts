import { useEffect, useRef, useState } from 'react'

export const isFalsy = (value: unknown) => value === 0 ? false : !value

export const isVoid = (value: unknown) => value === undefined || value === null || value === ''
 
// object类型 ()=> {} | {name: 'hi'}
// [key: string]: unknown 限制键值对 {key: value}
export const cleanObject = (object: {[key: string]: unknown}) => {
  const result = {...object}
  Object.keys(result).forEach(key => {
    const value = result[key]
    if (isVoid(value)) {
      // @ts-ignore
      delete result[key]
    }
  })
  return result
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback && callback()
    // useCallback useMemo
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
     const timeout = setTimeout(() => setDebouncedValue(value), delay)
     return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
}

export const useDocumentTitle = (title: string, keepOnUnmount: boolean = true) => {
  // jira任务管理系统
  const oldTitle = useRef(document.title).current

  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle
      }
    }
  }, [keepOnUnmount, oldTitle])
}
