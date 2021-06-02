import { Drawer, Button } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { projectListActions, selectProjectModelOpen } from "./project-list.slice"

export const ProjectModel = () => {
  const projectModelOpen = useSelector(selectProjectModelOpen)
  const dispatch = useDispatch()

  return (
    <Drawer
      width="100%"
      visible={projectModelOpen}
      onClose={() => dispatch(projectListActions.closeProjectModel())}
    >
      <h1>project model</h1>
      <Button onClick={() => dispatch(projectListActions.closeProjectModel())}>关闭 </Button>
    </Drawer>
  )
}
