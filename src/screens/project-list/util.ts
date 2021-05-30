import { useMemo } from "react"
import { useUrlQueryParam } from "utils/url"

// 搜索的参数
export const useProjectsSearchParams = () => {
  
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  // 把select的value转换为number类型
  const projectsParam = { ...param, personId: Number(param.personId) || undefined }

  return [
    useMemo(
      () => projectsParam,
      // 不能把 projectsParam 作为依赖项 因为是非状态的对象
      // eslint-disable-next-line react-hooks/exhaustive-deps 
      [param]
    ),
    setParam
  ] as const
}