// import { useAsync } from "utils/use-async"
import { useHttp } from "utils/http"
import { Project } from "screens/project-list/list"
import { useMutation, useQuery, useQueryClient } from "react-query"

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()

  return useQuery<Project[]>(['projects', param], () => client('projects', {data: param}))
}

// param 搜索的参数
// export const useProjects = (param?: Partial<Project>) => {
//   const client = useHttp()
//   const { run, ...result } = useAsync<Project[]>()

//   // 非基本类型作为依赖 useMemo、useCallback
//   const fetchProjects = useCallback(
//     () => client('projects', { data: cleanObject(param || {})}),
//     [client, param]
//   )
  
//   useEffect(() => {
//     run(fetchProjects(), {
//       retry: fetchProjects
//     })
//   }, [param, run, fetchProjects])

//   return result
// }

// export const useEditProject = () => {
//   const { run, ...asyncResult } = useAsync()
//   const client = useHttp()
//   const mutate = (params: Partial<Project>) => {
//     return run(client(`projects/${params.id}`, {
//       data: params,
//       method: 'PATCH'
//     }))
//   }

//   return {
//     mutate,
//     ...asyncResult
//   }
// }

export const useEditProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()

  return useMutation((params: Partial<Project>) => client(`projects/${params.id}`, {
    method: 'PATCH',
    data: params
  }), {
    onSuccess: () => {
      // 修改成功后 刷新列表
      queryClient.invalidateQueries('projects')
    }
  })
}

// export const useAddProject = () => {
//   const { run, ...asyncResult } = useAsync()
//   const client = useHttp()
//   const mutate = (params: Partial<Project>) => {
//     return run(client(`projects/${params.id}`, {
//       data: params,
//       method: 'POST'
//     }))
//   }

//   return {
//     mutate,
//     ...asyncResult
//   }
// }

export const useAddProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()

  return useMutation((params: Partial<Project>) => client(`projects/${params.id}`, {
    method: 'POST',
    data: params
  }), {
    onSuccess: () => {
      queryClient.invalidateQueries('projects')
    }
  })
}
