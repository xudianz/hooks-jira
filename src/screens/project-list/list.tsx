import { Table, TableProps } from "antd"
import dayjs from "dayjs"
import { User } from "./search-panel"
import { Link } from 'react-router-dom'

export interface Project {
  id: string,
  name: string,
  personId: string, // number
  pin: boolean,
  organization: string,
  created: number
}

interface ListProps extends TableProps<Project> {
  // list: Project[],
  users: User[]
}

export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table pagination={false} columns={[
      {
        title: '名称',
        sorter: (a, b) => a.name.localeCompare(b.name),
        render(value, project) {
          return (
            <div>
              <Link to={String(project.id)}>{project.name}</Link>
            </div>
          )
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
      }
    ]} {...props} rowKey="id"></Table>
  )
}