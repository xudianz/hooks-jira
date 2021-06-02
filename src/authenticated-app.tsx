import { useAuth } from "context/auth-context"
import { ProjectListScreen } from "screens/project-list"
import styled from '@emotion/styled'
import { Row } from "components/lib"
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { Button, Dropdown, Menu } from "antd"
import { Route, Routes, Navigate } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { ProjectScreen } from "screens/project"
import { resetRoute } from "utils"
import { ProjectModel } from 'screens/project-list/project-model'
import { ProjectPopover } from "components/project-popover"
import { ButtonNoPadding } from 'components/lib'

export const AuthenticatedApp = () => {
  
  return (
    <Container>
      <Main>
        <PageHeader />
        <Router>
          <Routes>
            <Route path="/projects" element={<ProjectListScreen />}></Route>
            <Route path="/projects/:projectId/*" element={<ProjectScreen />}></Route>
            <Navigate to="/projects"></Navigate>
          </Routes>
        </Router>
      </Main>
      <ProjectModel />
    </Container>
  )
}

const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type="link" onClick={resetRoute}>
          <SoftwareLogo width="18rem" color="rgb(18, 132, 255)"/>
        </ButtonNoPadding>
        <ProjectPopover />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  )
}

const User = () => {
  const { user, logout } = useAuth()

  return (
    <Dropdown overlay={<Menu>
      <Menu.Item key="logout">
        <Button type="link" onClick={logout}>退出</Button>
      </Menu.Item>
    </Menu>}
    >
      <Button type="link" onClick={e => e.preventDefault()}>Hi, {user?.name}</Button>
    </Dropdown>
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

