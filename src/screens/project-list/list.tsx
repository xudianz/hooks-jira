import { Table, TableProps, Dropdown, Menu } from "antd"
import dayjs from "dayjs"
import { User } from "./search-panel"
import { Link } from 'react-router-dom'
import { Pin } from 'components/pin'
import { useEditProject } from "utils/project"
import { ButtonNoPadding } from 'components/lib'
import { useProjectModel } from "./util"

export interface Project {
  id: number,
  name: string,
  personId: number, // number
  pin: boolean,
  organization: string,
  created: number
}

interface ListProps extends TableProps<Project> {
  // list: Project[],
  users: User[],
  // refresh?: () => void,
  // projectButton: JSX.Element
}

export const List = ({ users, ...props }: ListProps) => {

  const { mutate } = useEditProject()
  const { startEdit } = useProjectModel()
  const pinProject = (id: number) => (pin: boolean) => mutate({id, pin})
  // .then(props.refresh)
  const editProject = (id: number) => () => startEdit(id)


  return (
    <Table pagination={false} columns={[
      {
        title: <Pin checked={true} disabled={true} />,
        render(value, project) {
          return <Pin
            checked={project.pin}
            onCheckedChange={(pin: boolean) => {
              // hook需运行在顶层
              // useEditProject(project.id, { pin: true })
              // mutate({id: project.id, pin})
              pinProject(project.id)(pin)
          }} />
        }
      },
      {
        title: '名称',
        sorter: (a, b) => a.name.localeCompare(b.name),
        render(value, project) {
          return <Link to={String(project.id)}>{project.name}</Link>
        }
      },
      {
        title: '部门',
        dataIndex: 'organization'
      },
      {
        title: '负责人',
        render: (value, project) => (
          <span>
            {users.find((user: User) => user.id === project.personId)?.name || '未知'}
          </span>
        )
      },
      {
        title: '创建时间',
        render(value, project){
          return (
            <span>{project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}</span>
          )
        }
      },
      {
        render(value, project) {
          return (
            <Dropdown overlay={<Menu>
              <Menu.Item key="edit">
                <ButtonNoPadding type="link" onClick={editProject(project.id)}>编辑</ButtonNoPadding>
              </Menu.Item>
              <Menu.Item key="delete">
                <ButtonNoPadding type="link">删除</ButtonNoPadding>
              </Menu.Item>
            </Menu>}>
              <ButtonNoPadding type="link">...</ButtonNoPadding>
            </Dropdown>
          )
        }
      }
    ]} {...props} rowKey="id"></Table>
  )
}