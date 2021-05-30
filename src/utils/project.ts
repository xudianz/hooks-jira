import { useAsync } from "utils/use-async"
import { cleanObject } from "utils"
import { useHttp } from "utils/http"
import { useCallback, useEffect } from "react"
import { Project } from "screens/project-list/list"

// param 搜索的参数
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()
  const { run, ...result } = useAsync<Project[]>()

  // 非基本类型作为依赖 useMemo、useCallback
  const fetchProjects = useCallback(
    () => client('projects', { data: cleanObject(param || {})}),
    [client, param]
  )
  
  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects
    })
  }, [param, run, fetchProjects])

  return result
}

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<Project>) => {
    return run(client(`projects/${params.id}`, {
      data: params,
      method: 'PATCH'
    }))
  }

  return {
    mutate,
    ...asyncResult
  }
}

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<Project>) => {
    return run(client(`projects/${params.id}`, {
      data: params,
      method: 'POST'
    }))
  }

  return {
    mutate,
    ...asyncResult
  }
}
