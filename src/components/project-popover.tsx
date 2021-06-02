import styled from "@emotion/styled"
import { List, Popover, Typography, Divider } from "antd"
import { ButtonNoPadding } from 'components/lib'
import { useDispatch } from "react-redux"
import { projectListActions } from "screens/project-list/project-list.slice"
import { useProjects } from "utils/project"

export const ProjectPopover = ( ) => {
  const { data: projects } = useProjects()
  const pinnedProjects = projects?.filter(project => project.pin)
  const dispatch = useDispatch()
   
  const content = (
    <ContentContainer>
      <Typography.Text type="secondary">已收藏的项目</Typography.Text>
      <List>
        {
          pinnedProjects?.map(project => (
            <List.Item key={project.id}>
              <List.Item.Meta title={project.name}></List.Item.Meta>
            </List.Item>
          ))
        }
      </List>
      <Divider />
      <ButtonNoPadding
        type="link" 
        onClick={() => dispatch(projectListActions.openProjectModel())
      }>
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  )
  return (
    <Popover
      placement="bottom"
      content={content}
    >
      <span>项目</span>
    </Popover>
  )
}

const ContentContainer = styled.div`
  min-width: 30rem
`
