import { ReactNode, useCallback } from 'react'
import * as Auth from 'auth-provider'
import { User } from 'screens/project-list/search-panel'
import { http } from 'utils/http'
import { useMount } from 'utils'
import { useAsync } from 'utils/use-async'
import { FullPageErrorFallback, FullPageLoading } from 'components/lib'
import * as authStore from 'store/auth.slice'
import { useDispatch, useSelector } from 'react-redux'

export interface AuthForm {
  username: string,
  password: string
}

export const bootstrapUser = async() => {
  let user = null
  const token = Auth.getToken()
  if (token) {
    const data = await http('me', {token})
    user = data.user
  }
  return user
}

// const AuthContext = createContext<{
//   user: User | null,
//   login: (form: AuthForm) => Promise<void>,
//   register: (form: AuthForm) => Promise<void>,
//   logout: () => Promise<void>
// } | undefined>(undefined)

// AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isLoading, error, isIdle, isError, run } = useAsync<User | null>()
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()


  // 获取本地存储token 发送请求返回用户信息
  useMount(() => {
    // run(bootstrapUser())
    // debugger
    run(dispatch(authStore.bootstrap()))
  })

  // 判断不能写在前面 会给useMount 添加判断
  if (isIdle || isLoading) {
    return <FullPageLoading />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  return <div>{children}</div>

  // return (
  //   <AuthContext.Provider value={{user, login, register, logout}}>{children}</AuthContext.Provider>
  // )
}

// export const useAuth = () => {
//   const context = useContext(AuthContext)
//   if (!context) {
//     throw new Error('useAuth必须在AuthProvider中使用')
//   }
//   return context
// }

export const useAuth = () => {
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()
  const user = useSelector(authStore.selectUser)

  const login = useCallback((form: AuthForm) => dispatch(authStore.login(form)), [dispatch])
  const register = useCallback((form: AuthForm) => dispatch(authStore.register(form)), [dispatch])
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch])

  return {
    user,
    login,
    register,
    logout
  }
}