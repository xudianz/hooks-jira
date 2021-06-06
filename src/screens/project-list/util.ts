import { useMemo } from "react"
import { useProject } from "utils/project"
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

export const useProjectModel = () => {
  // 创建
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam(['projectCreate']) 
  // 编辑 
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam(['editingProjectId'])
  const {data: editingProject, isLoading} = useProject(Number(editingProjectId))

  const open = () => setProjectCreate({projectCreate: true})
  const close = () => {
    setProjectCreate({projectCreate: undefined})
    setEditingProjectId({editingProjectId: undefined})
  } 
  const startEdit = (id: number) => setEditingProjectId({editingProjectId: id})

  return {
    projectModelOpen: projectCreate === 'true' || Boolean(editingProject),
    open,
    close,
    startEdit,
    editingProject,
    isLoading
  }
}
