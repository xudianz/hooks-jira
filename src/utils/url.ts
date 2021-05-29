import { useMemo } from "react"
import { useSearchParams, URLSearchParamsInit } from "react-router-dom"
import { cleanObject } from "utils"

// as const 具体类型设置
// const arr = ['100'] as const ===> readonly['100']
// const list = ['name', 100, { age: 18 }] as const

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams()

  return [
    useMemo(
      () => keys.reduce((prev, key: K) => (
        {
          ...prev,
          [key]: searchParams.get(key) || ''
        }  
      ), {} as { [key in K]: string }),
      // 可以这样const [keys] = useState<('name' | 'personId')[]>(['name', 'personId'])
      // 基本类型可以放到依赖里、组件状态可以放到依赖里、非组件状态的对象不可以放到依赖里
      // eslint-disable-next-line react-hooks/exhaustive-deps 
      [searchParams] // 不能将keys作为依赖项，会死循环
    ),
    // setSearchParams
    (params: Partial<{[key in K] : unknown}>) => {
      const o = cleanObject({...Object.fromEntries(searchParams), ...params}) as URLSearchParamsInit
      return setSearchParams(o)
    }
  ] as const
}
