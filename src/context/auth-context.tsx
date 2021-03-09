import { createContext, ReactNode, useContext } from 'react'
import * as Auth from 'auth-provider'
import { User } from 'screens/project-list/search-panel'
import { http } from 'utils/http'
import { useMount } from 'utils'
import { useAsync } from 'utils/use-async'
import { FullPageErrorFallback, FullPageLoading } from 'components/lib'

interface AuthForm {
  username: string,
  password: string
}

const bootstrapUser = async() => {
  let user = null
  const token = Auth.getToken()
  if (token) {
    const data = await http('me', {token})
    user = data.user
  }
  return user
}

const AuthContext = createContext<{
  user: User | null,
  login: (form: AuthForm) => Promise<void>,
  register: (form: AuthForm) => Promise<void>,
  logout: () => Promise<void>
} | undefined>(undefined)

AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: user, isLoading, error, isIdle, isError, run, setData: setUser } = useAsync<User | null>()
  const login = (form: AuthForm) => Auth.login(form).then(setUser)
  const register = (form: AuthForm) => Auth.register(form).then(setUser)
  const logout = () => Auth.logout().then(() => setUser(null))

  // 获取本地存储token 发送请求返回用户信息
  useMount(() => {
    run(bootstrapUser())
  })

  // 判断不能写在前面 会给useMount 添加判断
  if (isIdle || isLoading) {
    return <FullPageLoading />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  return (
    <AuthContext.Provider value={{user, login, register, logout}}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}