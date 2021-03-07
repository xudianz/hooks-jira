import { useAsync } from "utils/use-async"
import { cleanObject } from "utils"
import { useHttp } from "utils/http"
import { useEffect } from "react"
import { Project } from "screens/project-list/list"

// param 搜索的参数
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()
  const { run, ...result } = useAsync<Project[]>()


  useEffect(() => {
    run(client('projects', { data: cleanObject(param || {})}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param])

  return result
}