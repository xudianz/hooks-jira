import { useMemo, useState } from "react";

export const useSearchParams = <k extends string>(keys: k[]) => {
  const url = new URL(window.location.href)
  const urlSearch = new URLSearchParams(url.search)
  const [searchParams, setSearchParams] = useState(urlSearch)

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
    setSearchParams
  ] as const
}

// as const 具体类型设置
// const list = ['name', 100, { age: 18 }] as const
