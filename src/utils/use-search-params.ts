import { useMemo, useState } from "react";
import { cleanObject } from "utils";

// as const 具体类型设置
// const list = ['name', 100, { age: 18 }] as const

export const useSearchParams = <k extends string>(keys: k[]) => {
  const url = new URL(window.location.href)
  const urlSearch = new URLSearchParams(url.search)
  const [searchParams] = useState(urlSearch)
  const [, _forceUpdate] = useState(1)

  return [
    useMemo(
      () => keys.reduce((prev, key) => {
      return { ...prev, [key]: searchParams.get(key) || '' }
    }, {} as {[key in k]: string}),
    // 不能将keys作为依赖项，会死循环
    // 可以这样const [keys] = useState<('name' | 'personId')[]>(['name', 'personId'])
    // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    (params: Partial<{[key in k]: unknown}>) => {
      // const o = cleanObject({ ...Object.fromEntries(searchParams), ...params }) as any
      // return setSearchParams(o)
      for(let key in params) {
        searchParams.set(key, params[key] as string)
        _forceUpdate(2)
      }
    }
    // setSearchParams
  ] as const
}

