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

export const resetRoute = () => {
  window.location.href = window.location.origin
}

// 过滤url参数
export const subset = <O extends { [key in string]: unknown }, K extends keyof O>(obj: O, keys: K[]) => {
  const filteredEntries = Object.entries(obj).filter(([key]) => keys.includes(key as K))

  return Object.fromEntries(filteredEntries) as Pick<O, K>
}

// 返回组件的卸载状态
export const useMountedRef = () => {
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true

    return () => {
      mountedRef.current = false
    }
  })

  return mountedRef
}
