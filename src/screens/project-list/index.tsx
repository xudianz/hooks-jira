import { SearchPanel } from './search-panel'
import { List } from './list'
import { useDebounce, useDocumentTitle } from "utils"
import styled from "@emotion/styled"
import { Typography } from "antd"
import { useProjects } from "utils/project"
import { useUsers } from "utils/user"
import { useUrlQueryParam } from 'utils/url'

/**
 * 
  // const obj = {name: ''} 作为依赖，更新时会陷 入死循（每次生产一个新的obj）
  // 参数为引用类型 不能作为依赖项 可以用useState定义；非引用类型可以放在依赖项里

  // 只有在调用setObj的时候 才会认为obj地址发生了变化
  // const [obj, setObj] = useState({name: ''}) obj作为依赖项，不会死循环
 * 
 */

export const ProjectListScreen = () => {
  // const [, setParam] = useState({
  //   name: '',
  //   personId: ''
  // })
  // 设置url参数
  // const keys = useState<('name' | 'personId')[]>(['name', 'personId'])
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  const debouncedParam = useDebounce(param, 500) 

  const { isLoading, error, data: list } = useProjects(debouncedParam)
  const { data: users } = useUsers()

  useDocumentTitle('项目列表', false)


  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      { error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
      <List dataSource={list || []} users={users || []} loading={isLoading}/>
    </Container>
  )
}

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
  padding: 3.2rem;
`