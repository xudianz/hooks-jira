import { Drawer, Button } from "antd"

export const ProjectModel = (props: { projectModelOpen: boolean, onClose: () => void }) => {
  return (
    <Drawer
      width="100%"
      visible={props.projectModelOpen}
      onClose={props.onClose}
    >
      <h1>project model</h1>
      <Button onClick={props.onClose}>关闭 </Button>
    </Drawer>
  )
}
