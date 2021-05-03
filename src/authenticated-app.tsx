import { useAuth } from "context/auth-context"
import { ProjectListScreen } from "screens/project-list"
import styled from '@emotion/styled'
import { Row } from "components/lib"
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { Button, Dropdown, Menu } from "antd"
import { Route, Switch } from 'react-router-dom'
import { ProjectScreen } from "screens/project"

export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />
      <Main>
        <Switch>
          <Route exact path="/projects" component={ProjectListScreen}></Route>
          <Route path="/projects/:projectId" component={ProjectScreen}></Route>
        </Switch>
      </Main>
    </Container>
  )
}

const PageHeader = () => {
  const { user, logout } = useAuth()
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <SoftwareLogo width="18rem" color="rgb(18, 132, 255)"/>
        <h3>项目</h3>
        <h3>用户</h3>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown overlay={<Menu>
          <Menu.Item key="logout">
            <Button type="link" onClick={logout}>退出</Button>
          </Menu.Item>
        </Menu>}
        >
          <Button type="link" onClick={e => e.preventDefault()}>Hi, {user?.name}</Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  )
}

const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 6rem 1fr;
  /* grid-template-columns: 20rem 1fr 20rem; */
  /* grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer"; */
  /* grid-gap: 10rem; */
`

const Header = styled(Row)`
  /* grid-area: header; */
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`

const HeaderLeft = styled(Row)``

const HeaderRight = styled.div``
const Main = styled.main`
  /* grid-area: main */
`


/* const Nav = styled.nav`grid-area: nav;`
const Aside = styled.aside`grid-area: aside`
const Footer = styled.footer`grid-area: footer` */

