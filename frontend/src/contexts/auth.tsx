import React, { useState, createContext, useEffect, useContext } from 'react'
import api from '../services/Api'
import User from '../models/User'

interface ApiResponse {
  user: User
  token: string
}

interface AuthContextData {
  signed: boolean
  user?: User | null
  signIn(username?: string, password?: string): Promise<void>
  signOut(): Promise<void>
  signUp(name: string, email: string, username: string, password: string): Promise<void>
  updateUser(user: User): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storagedUser = localStorage.getItem('USER')
    const storagedToken =  localStorage.getItem('TOKEN')

    if (storagedUser && storagedToken) {
      setUser(JSON.parse(storagedUser))
      api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`
    }
  }, [])

  async function signIn(username: string, password: string) {
    try {
      const response = await api.post<ApiResponse>('login', { username, password })

      setUser(response.data.user)

      api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`

      localStorage.setItem('USER', JSON.stringify(response.data.user))
      localStorage.setItem('TOKEN', response.data.token)

    } catch (error) {
      throw new Error()
    }
  }

  function updateUser(user: User) {
    setUser(user)
    localStorage.setItem('USER', JSON.stringify(user))
  }

  async function signOut() {
    setUser(null)
    localStorage.clear()
  }

  async function signUp(name: string, email: string, username: string, password: string) {
    try {
      await api.post('user', { name, email, username, password })
      
    } catch (error) {
      throw new Error()
    }
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, signUp, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}