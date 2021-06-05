import { Drawer, Button } from "antd"
import { useProjectModel } from "./util"

export const ProjectModel = () => {
  const { projectModelOpen, close } = useProjectModel()
  return (
    <Drawer
      width="100%"
      visible={projectModelOpen}
      onClose={close}
    >
      <h1>project model</h1>
      <Button onClick={close }>关闭 </Button>
    </Drawer>
  )
}
