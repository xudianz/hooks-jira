import { Form, Input } from "antd"
import { Project } from "./list"
import { UserSelect } from 'components/user-select'

export interface User {
  id: number, // number
  name: string,
  email: string,
  title: string,
  organization:string,
  token: string
}

interface SearchPanelProps {
  users: User[],
  // param: {
  //   name: string,
  //   personId: string
  // },
  param: Partial<Pick<Project, 'name' | 'personId'>>
  setParam: (param: SearchPanelProps['param']) => void
}

export const SearchPanel = ({ users, param, setParam } : SearchPanelProps) => {
  return (
    <Form style={{marginBottom: '2rem'}} layout="inline">
      <Form.Item>
        <Input placeholder="项目名" type="text" value={param.name} onChange={event => setParam({
          ...param,
          name: event.target.value
        })}/>
      </Form.Item>
      <Form.Item>
        {/* <Select value={param.personId} onChange={value => setParam({
          ...param,
          personId: value
        })}>
          <Select.Option value="">负责人</Select.Option>
          {
            users.map((user: any) => <Select.Option value={String(user.id)} key={user.id}>{user.name}</Select.Option>)
          }
        </Select> */}
        <UserSelect
          defaultOptionName="负责人"
          value={param.personId}
          onChange={value => setParam({
            ...param,
            personId: value
          })}>
        </UserSelect>
      </Form.Item>
    </Form>
  )
}