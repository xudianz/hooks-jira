import { SearchPanel } from './search-panel'
import { List } from './list'
import { useDebounce, useDocumentTitle } from "utils"
import styled from "@emotion/styled"
import { Row } from "antd"
import { useProjects } from "utils/project"
import { useUsers } from "utils/user"
import { useProjectModel, useProjectsSearchParams } from './util'
import { ButtonNoPadding, ErrorBox } from 'components/lib'

/**
 * 
  // const obj = {name: ''} 作为依赖，更新时会陷 入死循（每次生产一个新的obj）
  // 参数为引用类型 不能作为依赖项 可以用useState定义；非引用类型可以放在依赖项里

  // 只有在调用setObj的时候 才会认为obj地址发生了变化
  // const [obj, setObj] = useState({name: ''}) obj作为依赖项，不会死循环
 * 
 */

export const ProjectListScreen = () => {
  useDocumentTitle('项目列表', false)
  // const [, setParam] = useState({
  //   name: '',
  //   personId: ''
  // })
  // 设置url参数
  // const keys = useState<('name' | 'personId')[]>(['name', 'personId'])
  // const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  // const projectsParam = { ...param, personId: Number(param.personId) || undefined }
  const [param, setParam] = useProjectsSearchParams()
  // const debouncedParam = useDebounce(projectsParam, 500) 

  // retry
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 500))
  const { data: users } = useUsers()
  const { open } = useProjectModel()

  return (
    <Container>
      <Row justify="space-between">
        <h1>项目列表</h1>
        <ButtonNoPadding type="link" onClick={open}>创建项目</ButtonNoPadding>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <ErrorBox error={error} />
      <List
        dataSource={list || []}
        users={users || []}
        loading={isLoading}
      />
    </Container>
  )
}

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
  padding: 3.2rem;
`