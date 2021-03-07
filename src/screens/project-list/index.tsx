import React, { useState, useEffect } from "react"
import { SearchPanel } from './search-panel'
import { List } from './list'
import { cleanObject, useDebounce, useMount } from "utils"
import { useHttp } from "utils/http"
import styled from "@emotion/styled"

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])
  const debouncedParam = useDebounce(param, 500)
  
  const client = useHttp()

  useEffect(() => {
    client('projects', { data: cleanObject(debouncedParam)}).then(setList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParam])

  useMount(() => {
    client('users').then(setUsers)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  })

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users}/>
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`