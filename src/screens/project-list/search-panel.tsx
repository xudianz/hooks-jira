export interface User {
  id: number,
  name: string
}

interface SearchPanelProps {
  users: User[],
  param: {
    name: string,
    personId: string
  },
  setParam: (param: SearchPanelProps['param']) => void
}

export const SearchPanel = ({ users, param, setParam } : SearchPanelProps) => {
  return (
    <form>
      <input type="text" value={param.name} onChange={event => setParam({
        ...param,
        name: event.target.value
      })}/>
      <select value={param.personId} onChange={event => setParam({
        ...param,
        personId: event.target.value
      })}>
        <option value="">负责人</option>
        {
          users.map((user: any) => <option value={user.id} key={user.id}>{user.name}</option>)
        }
      </select>
    </form>
  )
}