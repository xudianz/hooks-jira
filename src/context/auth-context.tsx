import { createContext, ReactNode, useContext, useState } from 'react'
import * as Auth from 'auth-provider'
import { User } from 'screens/project-list/search-panel'

interface AuthForm {
  username: string,
  password: string
}

const AuthContext = createContext<{
  user: User | null,
  login: (form: AuthForm) => Promise<void>,
  register: (form: AuthForm) => Promise<void>,
  logout: () => Promise<void>
} | undefined>(undefined)

AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const login = (form: AuthForm) => Auth.login(form).then(setUser)
  const register = (form: AuthForm) => Auth.register(form).then(setUser)
  const logout = () => Auth.logout().then(() => setUser(null))

  return (
    <AuthContext.Provider value={{user, login, register, logout}}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  console.log(context)
  return context
}